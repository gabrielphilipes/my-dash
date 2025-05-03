import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinksHeader = ref<NavigationMenuItem[]>([
  {
    label: 'Sistema',
    type: 'label'
  },
  {
    label: 'Início',
    icon: 'i-lucide-home',
    to: '/'
  }
])

export const navLinksFooter = ref<NavigationMenuItem[]>([
  {
    label: 'GitHub',
    icon: 'i-lucide-github',
    to: 'https://github.com/gabrielphilipes/my-dash',
    target: '_blank'
  }
])

export const complianceLinks = ref<NavigationMenuItem[]>([
  {
    label: 'Termos de Uso',
    icon: 'i-lucide-book-open',
    to: '/compliance/terms'
  },
  {
    label: 'Política de Privacidade',
    icon: 'i-lucide-book-open',
    to: '/compliance/privacy'
  },
  {
    label: 'Política Anti-Spam',
    icon: 'i-lucide-book-open',
    to: '/compliance/anti-spam'
  }
])
