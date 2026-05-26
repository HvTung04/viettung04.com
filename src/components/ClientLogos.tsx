import prisma from '@/lib/db';

export default async function ClientLogos() {
  const clients = await prisma.client.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { order: 'asc' },
  });

  return (
    <section className="py-16 border-b border-hairline">
      <div className="max-w-[960px] mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-8 text-center">
          [ Trusted by industry leaders ]
        </p>
        {clients.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center justify-center">
                {client.logoUrl ? (
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="h-8 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  />
                ) : (
                  <span className="text-xs text-mute font-mono">{client.name}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-mute text-sm py-4">
            No clients configured yet.
          </div>
        )}
      </div>
    </section>
  );
}
