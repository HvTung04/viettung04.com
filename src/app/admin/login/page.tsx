import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-surface-dark text-on-dark flex items-center justify-center font-mono">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="text-xs text-on-dark-muted mb-2">[+] AUTH REQUIRED</div>
          <h1 className="text-lg font-bold text-on-dark uppercase tracking-widest">
            Neural Cobalt Admin
          </h1>
          <p className="text-sm text-on-dark-muted mt-2">
            Enter credentials to access the system
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
