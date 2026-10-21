'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { compare } from 'bcryptjs';

function clean(value: string | undefined): string {
  return (value || '').trim().replace(/^["']|["']$/g, '');
}

// bcrypt hashes contain "$", which Next.js dotenv expansion (and Docker Compose
// interpolation) will happily eat. ADMIN_PASSWORD_B64 is the safe transport.
function resolvePasswordHash(): string {
  const b64 = clean(process.env.ADMIN_PASSWORD_B64);
  if (b64) {
    try {
      const decoded = Buffer.from(b64, 'base64').toString('utf8').trim();
      if (decoded.startsWith('$2')) return decoded;
    } catch {
      // fall through to plain value
    }
  }
  return clean(process.env.ADMIN_PASSWORD);
}

export async function login(formData: FormData) {
  const username = clean(
    (formData.get('username') || formData.get('email')) as string
  );
  const password = formData.get('password') as string;

  const adminUser = clean(
    process.env.ADMIN_USERNAME || process.env.ADMIN_EMAIL
  ) || 'admin@example.com';
  const adminPassword = resolvePasswordHash();

  if (username !== adminUser) {
    return { success: false, error: 'Invalid credentials' };
  }

  const isPasswordValid = await compare(password, adminPassword);

  if (!isPasswordValid) {
    return { success: false, error: 'Invalid credentials' };
  }

  const cookieStore = await cookies();
  const headerList = await headers();
  const isHttps =
    headerList.get('x-forwarded-proto') === 'https' ||
    headerList.get('x-forwarded-ssl') === 'on';

  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

export async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === 'authenticated';
}
