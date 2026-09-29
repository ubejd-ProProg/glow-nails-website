import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  clientSpotlight,
  gallery,
  galleryFilters,
  heroImage,
  navHrefs,
  pricing,
  serviceImages,
  social,
  studio,
  type GalleryCategory,
  type GalleryId,
} from './data'
import {
  getInitialLang,
  htmlLang,
  LANG_STORAGE_KEY,
  translations,
  type Lang,
} from './i18n'
import './App.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

function BrandLink({
  className = '',
  label,
}: {
  className?: string
  label: string
}) {
  return (
    <a className={`brand ${className}`.trim()} href="#top" aria-label={label}>
      <img className="brand__logo" src={studio.logo} alt="" />
    </a>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all')
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    setLang(getInitialLang())
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang)
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
  }, [lang])

  const t = translations[lang]

  const filteredGallery = useMemo(
    () =>
      activeFilter === 'all'
        ? gallery
        : gallery.filter((item) => item.category === activeFilter),
    [activeFilter],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const motionProps = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        variants: fadeUp,
      }

  const switchLang = (next: Lang) => {
    setLang(next)
    setMenuOpen(false)
  }

  const LangSwitch = ({ className = '' }: { className?: string }) => (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t.langLabel}>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        aria-pressed={lang === 'en'}
        onClick={() => switchLang('en')}
      >
        {t.langEn}
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={lang === 'sq' ? 'is-active' : ''}
        aria-pressed={lang === 'sq'}
        onClick={() => switchLang('sq')}
      >
        {t.langSq}
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={lang === 'mk' ? 'is-active' : ''}
        aria-pressed={lang === 'mk'}
        onClick={() => switchLang('mk')}
      >
        {t.langMk}
      </button>
    </div>
  )

  return (
    <div className="page">
      <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <BrandLink label={t.brandHome} />

        <nav className="nav__desktop" aria-label={t.navAria}>
          {navHrefs.map((link) => (
            <a key={link.href} href={link.href}>
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="nav__aside">
          <LangSwitch />
          <a className="nav__cta" href={social.instagram} target="_blank" rel="noreferrer">
            {t.bookViaIg}
          </a>
          <button
            className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`nav__drawer ${menuOpen ? 'is-open' : ''}`}>
        {navHrefs.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {t.nav[link.key]}
          </a>
        ))}
        <a
          className="btn btn--solid"
          href={social.instagram}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          {t.bookViaInstagram}
        </a>
        <a className="btn btn--ghost" href={social.phoneHref} onClick={() => setMenuOpen(false)}>
          {t.call} {social.phoneDisplay}
        </a>
      </div>

      <main id="top">
        <section className="hero">
          <div className="hero__media" aria-hidden="true">
            <img src={heroImage.src} alt="" />
            <div className="hero__veil" />
          </div>

          <div className="hero__content">
            <motion.p
              className="hero__place"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t.heroPlace}
            </motion.p>
            <motion.h1
              className="hero__brand"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Glow Nails
            </motion.h1>
            <motion.p
              className="hero__line"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              {t.heroLine}
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48 }}
            >
              <a className="btn btn--solid" href={social.instagram} target="_blank" rel="noreferrer">
                {t.bookASet}
              </a>
              <a className="btn btn--ghost" href="#work">
                {t.seeMyWork}
              </a>
            </motion.div>
          </div>
        </section>

        <section className="section services" id="services">
          <motion.div className="section__intro" {...motionProps}>
            <p className="eyebrow">{t.servicesEyebrow}</p>
            <h2>{t.servicesTitle}</h2>
            <p className="lede">{t.servicesLede}</p>
          </motion.div>

          <div className="services__grid">
            {t.services.map((item, i) => (
              <motion.article
                key={item.title}
                className="service-card"
                {...(reduceMotion
                  ? {}
                  : {
                      ...motionProps,
                      transition: {
                        duration: 0.7,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1] as const,
                      },
                    })}
              >
                <a className="service-card__media" href="#work">
                  <img src={serviceImages[i]} alt="" loading="lazy" />
                  <span className="service-card__tag">{item.tag}</span>
                </a>
                <div className="service-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section work" id="work">
          <motion.div className="section__intro" {...motionProps}>
            <p className="eyebrow">{t.workEyebrow}</p>
            <h2>{t.workTitle}</h2>
            <p className="lede">{t.workLede}</p>
          </motion.div>

          <div className="gallery-filters" role="tablist" aria-label={t.filterAria}>
            {galleryFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={`gallery-filters__btn ${activeFilter === filter.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {t.filters[filter.id]}
              </button>
            ))}
          </div>

          <div className="gallery-scroller">
            <div className="gallery" key={`${activeFilter}-${lang}`}>
              {filteredGallery.map((shot, i) => {
                const id = shot.id as GalleryId
                return (
                  <motion.figure
                    key={shot.src}
                    className="gallery__item"
                    {...(reduceMotion
                      ? {}
                      : {
                          initial: { opacity: 0, y: 20 },
                          animate: { opacity: 1, y: 0 },
                          transition: {
                            duration: 0.55,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1] as const,
                          },
                        })}
                  >
                    <img src={shot.src} alt={t.galleryAlts[id]} loading="lazy" />
                    <figcaption>
                      <span>{t.galleryLabels[id]}</span>
                      <span className="gallery__cat">{t.filters[shot.category]}</span>
                    </figcaption>
                  </motion.figure>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section spotlight" aria-labelledby="spotlight-heading">
          <motion.div className="spotlight__inner" {...motionProps}>
            <div className="spotlight__visual">
              <img src={clientSpotlight.image} alt={t.spotlightQuote} loading="lazy" />
            </div>
            <div className="spotlight__copy">
              <p className="eyebrow">{t.spotlightKicker}</p>
              <h2 id="spotlight-heading">{t.spotlightTitle}</h2>
              <blockquote className="spotlight__quote">
                <p>&ldquo;{t.spotlightQuote}&rdquo;</p>
              </blockquote>
              <p className="spotlight__note">{t.spotlightNote}</p>
              <a className="btn btn--solid" href={social.instagram} target="_blank" rel="noreferrer">
                {t.bookYourSet}
              </a>
            </div>
          </motion.div>
        </section>

        <section className="section pricing" id="pricing">
          <motion.div className="section__intro" {...motionProps}>
            <p className="eyebrow">{t.pricingEyebrow}</p>
            <h2>{t.pricingTitle}</h2>
            <p className="lede">{t.pricingLede}</p>
          </motion.div>

          <motion.ul className="price-list" {...motionProps}>
            {pricing.map((row) => (
              <li key={row.id}>
                <span>{t.pricing[row.id]}</span>
                <span className="price-list__dots" aria-hidden="true" />
                <span>{row.price}</span>
              </li>
            ))}
          </motion.ul>
        </section>

        <section className="section about" id="about">
          <motion.div className="about__copy" {...motionProps}>
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
          </motion.div>
          <motion.div
            className="about__visual"
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 1.02 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                })}
          >
            <img src="/dilara.jpg" alt={t.aboutTitle} loading="lazy" />
          </motion.div>
        </section>

        <section className="section location" id="location" aria-labelledby="location-heading">
          <motion.div className="location__layout" {...motionProps}>
            <div className="location__info">
              <h2 id="location-heading">{t.locationTitle}</h2>
              <p className="location__region">{t.locationRegion}</p>
              <h3 className="location__city">{t.locationCity}</h3>
              <a className="location__address" href={studio.mapsUrl} target="_blank" rel="noreferrer">
                {studio.address}
              </a>
              <p className="location__hours">{t.hours}</p>
              <div className="location__links">
                <a href={social.phoneHref}>{social.phoneDisplay}</a>
                <a href={social.instagram} target="_blank" rel="noreferrer">
                  @glownails.skopje
                </a>
              </div>
            </div>
            <div className="location__map">
              <a
                className="location__open"
                href={studio.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t.openInMaps}
                <span aria-hidden="true">↗</span>
              </a>
              <iframe
                title={t.mapsTitle}
                src={studio.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </section>

        <section className="section contact" id="contact">
          <motion.div className="contact__panel" {...motionProps}>
            <p className="eyebrow">{t.locationCity}</p>
            <h2>{t.contactTitle}</h2>
            <p className="lede">{t.contactLede}</p>
            <div className="contact__actions">
              <a className="btn btn--solid" href={social.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="btn btn--ghost" href={social.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="btn btn--ghost" href={social.phoneHref}>
                {social.phoneDisplay}
              </a>
              <a className="btn btn--ghost" href="#location">
                {t.locationBtn}
              </a>
            </div>
            <dl className="contact__meta">
              <div>
                <dt>{t.metaPhone}</dt>
                <dd>
                  <a href={social.phoneHref}>{social.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>{t.metaInstagram}</dt>
                <dd>
                  <a href={social.instagram} target="_blank" rel="noreferrer">
                    @glownails.skopje
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t.metaLocation}</dt>
                <dd>
                  <a href={studio.mapsUrl} target="_blank" rel="noreferrer">
                    {studio.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t.metaHours}</dt>
                <dd>{t.hours}</dd>
              </div>
            </dl>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <BrandLink className="brand--footer" label={t.brandHome} />
        <p>{t.footerTagline}</p>
        <p className="footer__copy">© {new Date().getFullYear()} Glow Nails</p>
      </footer>
    </div>
  )
}

export default App
