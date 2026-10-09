import type { Post } from '@/lib/types';

export function PostContent({ post }: { post: Post }) {
  if (!post.content) {
    return (
      <p className="text-[17px] text-gray-700 leading-[1.8]">
        {post.excerpt || 'Contenu à venir.'}
      </p>
    );
  }

  return (
    <div
      className="
        text-[17px] text-gray-700 leading-[1.85] tracking-[0.005em]
        [&_p]:mb-6
        [&_p:first-of-type]:text-[19px] [&_p:first-of-type]:text-sfpa-anthracite [&_p:first-of-type]:leading-[1.7]
        [&_p:first-of-type]:first-letter:text-[64px] [&_p:first-of-type]:first-letter:font-serif [&_p:first-of-type]:first-letter:font-bold
        [&_p:first-of-type]:first-letter:text-sfpa-olive [&_p:first-of-type]:first-letter:leading-[0.85] [&_p:first-of-type]:first-letter:mr-2 [&_p:first-of-type]:first-letter:float-left

        [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-sfpa-anthracite [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-tight
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-sfpa-anthracite [&_h3]:mt-10 [&_h3]:mb-3

        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:marker:text-sfpa-olive
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:marker:text-sfpa-olive

        [&_a]:text-sfpa-olive [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-sfpa-olive/80

        [&_strong]:text-sfpa-anthracite [&_strong]:font-bold
        [&_em]:italic [&_em]:text-sfpa-anthracite

        [&_blockquote]:relative [&_blockquote]:my-10 [&_blockquote]:py-2 [&_blockquote]:pl-6 [&_blockquote]:pr-4
        [&_blockquote]:border-l-[3px] [&_blockquote]:border-sfpa-olive
        [&_blockquote]:text-xl [&_blockquote]:md:text-2xl [&_blockquote]:italic [&_blockquote]:font-medium
        [&_blockquote]:text-sfpa-anthracite [&_blockquote]:leading-snug

        [&_img]:rounded-2xl [&_img]:my-10 [&_img]:shadow-md
        [&_figure]:my-10 [&_figcaption]:text-center [&_figcaption]:text-[12px] [&_figcaption]:text-gray-500 [&_figcaption]:mt-3 [&_figcaption]:italic

        [&_hr]:my-12 [&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-gray-200
      "
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  );
}