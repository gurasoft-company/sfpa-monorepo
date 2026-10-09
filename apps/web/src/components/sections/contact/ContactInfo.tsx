import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const INFO = [
  {
    icon: MapPin,
    title: 'Adresse',
    lines: ['47 rue de Lisbonne', '13300 Salon-de-Provence', 'France'],
  },
  {
    icon: Phone,
    title: 'Téléphone',
    lines: ['+33 7 49 91 25 43'],
    href: 'tel:+33749912543',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['sofpra22@gmail.com'],
    href: 'mailto:sofpra22@gmail.com',
  },
  {
    icon: Clock,
    title: 'Permanence',
    lines: ['Mercredi 13h30 – 16h30', 'Maison de la Vie Associative', '95 rue André-Marie Ampère'],
  },
];

const SOCIALS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function ContactInfo() {
  return (
    <section className="relative py-14 lg:py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-3">
            Nos coordonnées
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sfpa-anthracite mb-3 leading-tight">
            Nous <span className="text-sfpa-olive">joindre</span>
          </h2>
          <div className="w-10 h-0.5 bg-sfpa-ocre mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {INFO.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="w-12 h-12 rounded-full bg-sfpa-olive text-white flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-bold text-sfpa-olive mb-2">
                  {item.title}
                </h3>
                <div className="text-[13px] text-gray-600 leading-relaxed">
                  {item.lines.map((line, j) => (
                    <div key={j}>{line}</div>
                  ))}
                </div>
              </>
            );

            return item.href ? (
              <a
                key={i}
                href={item.href}
                className="bg-white rounded-2xl border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300 p-6 flex flex-col text-center"
              >
                {content}
              </a>
            ) : (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 hover:border-sfpa-olive/30 hover:shadow-md transition-all duration-300 p-6 flex flex-col text-center"
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* Réseaux sociaux */}
        <div className="mt-10 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-olive mb-4">
            Suivez-nous
          </div>
          <div className="flex justify-center gap-3">
            {SOCIALS.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-sfpa-olive/10 text-sfpa-olive flex items-center justify-center hover:bg-sfpa-olive hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}