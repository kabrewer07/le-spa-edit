import Link from 'next/link'

// TODO: 2026-04 — add Offers (Discover), Guides, For Spa Owners, Suggest a Spa, Contact when pages are built
const DISCOVER_LINKS = [
  { href: '/spas', label: 'All Spas' },
  { href: '/spas?access=day-pass', label: 'Day Passes' },
  { href: '/spas?browse=experience', label: 'By Experience' },
]

const EDIT_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/about#curation', label: 'How We Curate' },
]

const INFO_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

const linkClass = 'text-[13px] text-white/60 no-underline motion-safe:transition-colors duration-[250ms] ease hover:text-white/80'

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark-bg)] pt-14">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">

        {/* Main grid: 1-col → 2-col → 4-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-7 sm:gap-8 lg:gap-12 pb-10 border-b border-white/[0.07]">

          {/* Brand */}
          <div>
            <div
              className="font-display text-[18px] tracking-[0.1em] uppercase text-white mb-[10px]"
            >
              Le <em className="italic text-[var(--color-teal-mid)]">Spa</em> Edit
            </div>
            <p className="text-[13px] text-white/60 font-light leading-[1.7] max-w-[220px] sm:max-w-full lg:max-w-[220px]">
              The definitive guide to luxury spa experiences in Sonoma County and beyond.
            </p>
          </div>

          {/* Discover */}
          <FooterCol title="Discover" links={DISCOVER_LINKS} />

          {/* The Edit */}
          <FooterCol title="The Edit" links={EDIT_LINKS} />

          {/* Info */}
          <FooterCol title="Info" links={INFO_LINKS} />
        </div>

        {/* Bottom bar */}
        <div className="py-5 text-[10px] text-white/35 tracking-[0.08em]">
          © {new Date().getFullYear()} Le Spa Edit LLC
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.28em] uppercase text-[var(--color-teal-mid)] mb-[14px]">
        {title}
      </p>
      <ul className="flex flex-col gap-[10px] list-none m-0 p-0">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={linkClass}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
