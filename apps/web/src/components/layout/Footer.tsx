import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-sfpa-anthracite text-sfpa-sable mt-14">
      <Container className="py-10 lg:py-14 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">

        {/* Colonne 1 — Logo + baseline + réseaux */}
        <div>
          <div className="relative w-20 h-20 mb-4 bg-white rounded-xl p-1.5">
            <Image
              src="/logo-sfpa.png"
              alt="SFPA — Solidarité Fraternelle Provence Afrique"
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          </div>
          <p className="text-[12px] lg:text-[13px] opacity-75 italic mb-5 leading-relaxed">
            La Terre entre nos mains,<br />la fraternité dans nos cœurs.
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-sfpa-olive flex items-center justify-center transition">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-sfpa-olive flex items-center justify-center transition">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white/10 hover:bg-sfpa-olive flex items-center justify-center transition">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white/10 hover:bg-sfpa-olive flex items-center justify-center transition">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Colonne 2 — Navigation */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-ocre mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-[12px] lg:text-[13px]">
            <li><Link href="/a-propos" className="opacity-75 hover:opacity-100 hover:text-white transition">À propos</Link></li>
            <li><Link href="/actions" className="opacity-75 hover:opacity-100 hover:text-white transition">Nos actions</Link></li>
            <li><Link href="/formations" className="opacity-75 hover:opacity-100 hover:text-white transition">Formations</Link></li>
            <li><Link href="/actualites" className="opacity-75 hover:opacity-100 hover:text-white transition">Actualités</Link></li>
            <li><Link href="/temoignages" className="opacity-75 hover:opacity-100 hover:text-white transition">Témoignages</Link></li>
            <li><Link href="/partenaires" className="opacity-75 hover:opacity-100 hover:text-white transition">Partenaires</Link></li>
          </ul>
        </div>

        {/* Colonne 3 — Agir */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-ocre mb-4">
            Agir
          </h4>
          <ul className="space-y-2 text-[12px] lg:text-[13px]">
            <li><Link href="/faire-un-don" className="opacity-75 hover:opacity-100 hover:text-white transition">Faire un don</Link></li>
            <li><Link href="/devenir-benevole" className="opacity-75 hover:opacity-100 hover:text-white transition">Devenir bénévole</Link></li>
            <li><Link href="/adherer" className="opacity-75 hover:opacity-100 hover:text-white transition">Adhérer</Link></li>
            <li><Link href="/contact" className="opacity-75 hover:opacity-100 hover:text-white transition">Devenir partenaire</Link></li>
          </ul>
        </div>

        {/* Colonne 4 — Contact */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sfpa-ocre mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-[12px] lg:text-[13px]">
            <li className="flex gap-2.5 items-start">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-sfpa-ocre" />
              <span className="opacity-75 leading-relaxed">
                47 rue de Lisbonne<br />13300 Salon-de-Provence
              </span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="w-3.5 h-3.5 flex-shrink-0 text-sfpa-ocre" />
              <a href="tel:+33749912543" className="opacity-75 hover:opacity-100 hover:text-white transition">
                +33 7 49 91 25 43
              </a>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail className="w-3.5 h-3.5 flex-shrink-0 text-sfpa-ocre" />
              <a href="mailto:sofpra22@gmail.com" className="opacity-75 hover:opacity-100 hover:text-white transition break-all">
                sofpra22@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </Container>

      {/* Bas de footer */}
      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] lg:text-[11px]">
          <div className="opacity-60 text-center md:text-left">
            © {new Date().getFullYear()} SFPA — Tous droits réservés.
          </div>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="opacity-60 hover:opacity-100 hover:text-white transition">Mentions légales</Link>
            <Link href="/mentions-legales#confidentialite" className="opacity-60 hover:opacity-100 hover:text-white transition">Confidentialité</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}