export const navHrefs = [
  { href: '#work', key: 'work' },
  { href: '#services', key: 'services' },
  { href: '#pricing', key: 'pricing' },
  { href: '#about', key: 'about' },
  { href: '#contact', key: 'contact' },
] as const

export const heroImage = {
  src: '/work/crystal-glow.jpg',
} as const

export const serviceImages = [
  '/work/classic-french.jpg',
  '/work/spring-florals.jpg',
  '/work/blue-french.jpg',
  '/work/glitter-ombre.jpg',
] as const

export const galleryFilters = [
  { id: 'all' },
  { id: 'french' },
  { id: 'art' },
  { id: 'glam' },
] as const

export type GalleryCategory = (typeof galleryFilters)[number]['id']

export const gallery = [
  {
    id: 'soft-french',
    src: '/work/soft-french.jpg',
    category: 'french' as const,
    featured: true,
  },
  {
    id: 'classic-french',
    src: '/work/classic-french.jpg',
    category: 'french' as const,
  },
  {
    id: 'blue-french',
    src: '/work/blue-french.jpg',
    category: 'french' as const,
    featured: true,
  },
  {
    id: 'spring-florals',
    src: '/work/spring-florals.jpg',
    category: 'art' as const,
    featured: true,
  },
  {
    id: 'crystal-glow',
    src: '/work/crystal-glow.jpg',
    category: 'glam' as const,
  },
  {
    id: 'glitter-ombre',
    src: '/work/glitter-ombre.jpg',
    category: 'glam' as const,
    featured: true,
  },
  {
    id: 'wine-stiletto',
    src: '/work/wine-stiletto.jpg',
    category: 'glam' as const,
  },
] as const

export type GalleryId = (typeof gallery)[number]['id']

export const clientSpotlight = {
  image: '/work/paris-client.jpg',
} as const

export const pricing = [
  { id: 'nails' as const, price: '600 MKD' },
  { id: 'manicure' as const, price: '500 MKD' },
  { id: 'removal' as const, price: '300 MKD' },
]

export const social = {
  instagram: 'https://www.instagram.com/glownails.skopje',
  whatsapp: 'https://wa.me/38972650034',
  phoneDisplay: '072 650 034',
  phoneHref: 'tel:+38972650034',
} as const

export const studio = {
  name: 'Glow Nails',
  artist: 'Dilara',
  logo: '/logo.jpg',
  mapsUrl: 'https://maps.app.goo.gl/zCzkwSNR64fxTzKk9',
  address: 'Metodija Mitevski 2, Skopje 1000',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Metodija+Mitevski+2,+Skopje+1000&hl=en&z=17&output=embed',
} as const
