import type { Component, Rules } from '../types'
import {
  createElementIfNotExist,
  applyStyles,
  applyEventListeners,
  getQueryAll,
} from '../utils/helpersElement'

const elementCache = new Map<string, HTMLElement>()

export const useWithoutRootElement = async (data: Rules) => {
  const elements = getQueryAll('[v-ai]')

  elements.forEach((root) => {
    if (!(root instanceof HTMLElement)) return

    const id = root.getAttribute('v-ai')
    if (!id) return

    if (!elementCache.has(id)) {
      elementCache.set(id, root)
    }

    mutationElement(root, data)
  })
}

const mutationElement = (root: HTMLElement, data: Rules) => {
  data.components?.forEach((component: Component) => {
    if (!component.name) return
    const el = createElementIfNotExist(root, component.name)

    if (component?.posBefore) {
      root.insertBefore(el, root.firstChild)
    } else if (component?.posAfter) {
      root.appendChild(el)
    }

    if (component?.style) applyStyles(el, component.style)
    if (component?.className)
      el.classList.add(...component.className.split(' '))
    if (component?.event) applyEventListeners(el, component.event)
  })

  // Apply root styles/events
  if (data?.style) applyStyles(root, data.style)
  if (data?.className) root.classList.add(...data.className.split(' '))
  if (data?.event) applyEventListeners(root, data.event)
}
