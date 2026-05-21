import { getTranslations } from 'next-intl/server';

export default async function ClientLogos() {
  const t = await getTranslations('ServicesPage');

  // Placeholder logos - replace with actual client logos
  const logos = [
    { name: 'MediTech AI', url: 'https://via.placeholder.com/120x40?text=MediTech' },
    { name: 'DataFlow Systems', url: 'https://via.placeholder.com/120x40?text=DataFlow' },
    { name: 'HealthFirst', url: 'https://via.placeholder.com/120x40?text=HealthFirst' },
    { name: 'Neural Labs', url: 'https://via.placeholder.com/120x40?text=Neural' },
    { name: 'Quantum Corp', url: 'https://via.placeholder.com/120x40?text=Quantum' },
    { name: 'Vision AI', url: 'https://via.placeholder.com/120x40?text=Vision' },
  ];

  return (
    <section className="py-16 border-b border-hairline">
      <div className="max-w-[960px] mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-8 text-center">
          [ Trusted by industry leaders ]
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-8 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
