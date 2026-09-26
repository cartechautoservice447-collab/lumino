import { marked, Tokens } from 'marked';
import hljs from 'highlight.js';

// Configure marked with GitHub Dark syntax highlighting & safe links
const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: Tokens.Code): string {
  const cleanLang = (lang || '').trim().toLowerCase();
  const validLang = cleanLang && hljs.getLanguage(cleanLang) ? cleanLang : '';

  let highlighted = text;
  if (validLang) {
    try {
      highlighted = hljs.highlight(text, { language: validLang }).value;
    } catch {
      highlighted = text;
    }
  } else {
    try {
      highlighted = hljs.highlightAuto(text).value;
    } catch {
      highlighted = text;
    }
  }

  return `<div class="gh-code my-4 overflow-hidden rounded-xl border border-white/5 bg-[#0d1117] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]">
    <div class="flex items-center justify-between border-b border-white/5 px-4 py-2 bg-[#0d1117]">
      <span class="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#8b949e]">${cleanLang || 'code'}</span>
    </div>
    <pre class="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono bg-[#0d1117] m-0 text-[#c9d1d9]"><code class="hljs language-${validLang || 'plaintext'}">${highlighted}</code></pre>
  </div>`;
};

renderer.link = function ({ href, title, text }: Tokens.Link): string {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-[#79c0ff] underline underline-offset-4 hover:opacity-80 transition-opacity"${titleAttr}>${text}</a>`;
};

marked.use({
  gfm: true,
  breaks: true,
  renderer,
});

export function renderMarkdown(markdown: string): string {
  if (!markdown || !markdown.trim()) return '';
  return marked.parse(markdown) as string;
}
