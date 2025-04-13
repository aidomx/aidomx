import { useEventMapping } from '../hooks/useEvents'
import type { Rules } from '../types'

/**
 * Menerapkan aturan AIDOMX ke elemen DOM berdasarkan atribut `v-ai`.
 *
 * - Menambahkan class Tailwind jika tersedia.
 * - Menetapkan gaya langsung jika tidak ada class.
 * - Menambahkan event listener sesuai pemetaan yang ditentukan.
 *
 * @param {Rules} rules - Objek aturan AIDOMX yang berisi definisi komponen dan perilakunya.
 */
export const AidomxDOM = async (rules: Rules) => {
  if (!rules || !rules.component) return

  const eventHandlers = await useEventMapping()

  rules.component.forEach((comp: any) => {
    const elements = document.querySelectorAll<HTMLElement>(
      `[v-ai="${comp.name}"]`
    )

    elements.forEach((el) => {
      el.setAttribute('data-aidomx', 'applied')
      el.setAttribute('v-ai', 'applied')

      if (comp.className) {
        el.classList.add(...comp.className.split(' '))
      } else {
        Object.assign(el.style, comp.styles)
      }

      Object.entries(eventHandlers).forEach(([prop, eventName]) => {
        if (comp[prop]) {
          el.removeEventListener(eventName, comp[prop])
          el.addEventListener(eventName, comp[prop])
        }
      })
    })
  })
}
