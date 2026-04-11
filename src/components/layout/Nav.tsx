'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

const NAV_LINKS = [
  { href: '/spas', label: 'Spas' },
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  // icon is suppressed until mounted — prevents moon/sun flash when localStorage differs from SSR default
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    setDark(isDark)
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = !dark
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }, [dark])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  // hamburger is hidden above 768px — close the menu if the viewport crosses that threshold
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu()
    }
    mq.addEventListener('change', onBreakpoint)
    return () => mq.removeEventListener('change', onBreakpoint)
  }, [closeMenu])

  return (
    <>
      {/* Tailwind can't express: 1fr auto 1fr grid columns, rgba() bg values, or max-height+opacity transition on .mobile-dropdown */}
      <style>{`
        #site-nav { background: rgba(247,249,251,0.96); }
        [data-theme="dark"] #site-nav { background: rgba(10,24,32,0.96); }
        .nav-inner { display: grid; grid-template-columns: 1fr auto 1fr; }
        .mobile-dropdown { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s ease; }
        .mobile-dropdown.open { max-height: 180px; opacity: 1; }
      `}</style>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-xs focus:rounded-b focus:bg-[var(--color-teal)] focus:text-white"
      >
        Skip to main content
      </a>

      <nav
        id="site-nav"
        className="fixed top-0 left-0 right-0 z-[200] backdrop-blur-[16px] border-b border-[var(--color-border)] transition-colors duration-[250ms] ease"
      >
        {/* 3-col grid: logo | links | actions */}
        <div className="nav-inner items-center h-[57px] px-10 max-md:px-5 max-w-[1200px] mx-auto w-full">

          {/* Col 1 — Logo */}
          <Link
            href="/"
            aria-label="Le Spa Edit home"
            className="col-start-1 font-display text-[20px] font-normal tracking-[0.1em] uppercase no-underline text-[var(--color-ink)]"
          >
            Le <em className="italic text-[var(--color-teal)]">Spa</em> Edit
          </Link>

          {/* Col 2 — Desktop links */}
          <ul className="col-start-2 justify-self-center hidden md:flex gap-8 list-none m-0 p-0">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'no-underline text-[12px] tracking-[0.18em] uppercase',
                      'transition-[opacity,color] duration-[250ms] ease',
                      'hover:opacity-100 hover:text-[var(--color-teal)]',
                      active
                        ? 'opacity-100 text-[var(--color-teal)]'
                        : 'opacity-75 text-[var(--color-ink2)]',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Col 3 — Theme toggle + hamburger */}
          <div className="col-start-3 justify-self-end flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-8 h-8 rounded-full border border-[var(--color-border)] bg-transparent text-[var(--color-ink2)] cursor-pointer flex items-center justify-center transition-colors duration-[250ms] ease hover:bg-[var(--color-teal-pale)] hover:border-[var(--color-teal-lt)]"
            >
              {mounted && (dark ? <Sun size={14} /> : <Moon size={14} />)}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex md:hidden flex-col items-center justify-center gap-[5px] w-9 h-9 border border-[var(--color-border)] bg-transparent cursor-pointer rounded-[var(--radius)]"
            >
              <span
                className="block w-4 h-[1.5px] bg-[var(--color-ink2)] origin-center transition-[transform,opacity] duration-300 ease"
                style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block w-4 h-[1.5px] bg-[var(--color-ink2)] origin-center transition-[transform,opacity] duration-300 ease"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-4 h-[1.5px] bg-[var(--color-ink2)] origin-center transition-[transform,opacity] duration-300 ease"
                style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`mobile-dropdown text-center${menuOpen ? ' open' : ''}`}>
          <div className="flex flex-col items-center pt-3 pb-[18px] border-t border-[var(--color-border)]">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={[
                  'inline-block px-8 py-[7px]',
                  'font-display text-[14px] font-normal italic tracking-[0.04em]',
                  'no-underline transition-colors duration-[250ms] ease',
                  'hover:text-[var(--color-teal)]',
                  pathname === href
                    ? 'text-[var(--color-teal)]'
                    : 'text-[var(--color-ink2)]',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
