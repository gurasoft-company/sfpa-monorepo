'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2, Check, Share2 } from 'lucide-react';
import type { Post } from '@/lib/types';

export function PostShareBar({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://sfpa.org/actualites/${post.slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1877F2]',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
      color: 'hover:bg-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#0A66C2]',
    },
  ];

  return (
    <div className="mt-14 pt-10 border-t border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-5">
        {/* Label */}
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sfpa-olive">
          <Share2 className="w-3.5 h-3.5" />
          Partager cet article
        </div>

        {/* Boutons */}
        <div className="flex items-center gap-2">
          {shareButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <a
                key={btn.name}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Partager sur ${btn.name}`}
                className={`w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-200 ${btn.color}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}

          {/* Copier le lien */}
          <button
            onClick={copyLink}
            aria-label="Copier le lien"
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
              copied
                ? 'bg-sfpa-olive border-sfpa-olive text-white'
                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-sfpa-olive hover:text-white hover:border-sfpa-olive'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}