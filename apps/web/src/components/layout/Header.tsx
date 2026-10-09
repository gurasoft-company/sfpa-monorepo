'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';
import { Container } from './Container';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/actions', label: 'Actions' },
  { href: '/formations', label: 'Formations' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/temoignages', label: 'Témoignages' },
  { href: '/partenaires', label: 'Partenaires' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container className="flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group h-full py-3">
          <div className="relative h-full aspect-square">
            <Image
              src="/logo-sfpa.png"
              alt="SFPA — La Terre entre nos mains"
              fill
              priority
              className="object-contain"
              sizes="80px"
            />
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 ${
                  active
                    ? 'text-sfpa-olive bg-sfpa-olive/10'
                    : 'text-sfpa-anthracite hover:text-sfpa-olive'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTAs desktop */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/devenir-benevole"
            className="text-[12px] font-semibold text-sfpa-olive px-4 py-2 rounded-full border border-sfpa-olive hover:bg-sfpa-olive hover:text-white transition-colors duration-200"
          >
            Devenir bénévole
          </Link>
          <Link
            href="/faire-un-don"
            className="text-[12px] font-semibold text-white bg-sfpa-terra px-5 py-2.5 rounded-full hover:bg-sfpa-terra/90 transition-colors duration-200 inline-flex items-center gap-1.5 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5" /> Faire un don
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-sfpa-anthracite"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {/* Menu mobile */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <Container className="py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 text-[13px] font-medium rounded-full transition ${
                    active
                      ? 'text-sfpa-olive bg-sfpa-olive/10'
                      : 'text-sfpa-anthracite hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
              <Link
                href="/devenir-benevole"
                onClick={() => setIsOpen(false)}
                className="text-center text-[12px] font-semibold text-sfpa-olive px-4 py-2.5 rounded-full border border-sfpa-olive"
              >
                Devenir bénévole
              </Link>
              <Link
                href="/faire-un-don"
                onClick={() => setIsOpen(false)}
                className="text-center text-[12px] font-semibold text-white bg-sfpa-terra px-4 py-2.5 rounded-full inline-flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5" /> Faire un don
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}