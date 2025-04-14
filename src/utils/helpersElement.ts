const elementCache = new Map<string, HTMLElement>()

export const getRootElement = async (
  root: string,
  cb?: (el: HTMLElement | null) => void
) => {
  if (!root) return cb?.(null)

  if (elementCache.has(root)) {
    return cb?.(elementCache.get(root)!)
  }

  const selector = `[v-ai="${root}"]`
  try {
    const el = await waitForElement(selector)
    elementCache.set(root, el)
    cb?.(el)
  } catch {
    cb?.(null)
  }
}

export const createElementIfNotExist = (root: HTMLElement, name: string) => {
  const existing = root.querySelector<HTMLElement>(`[v-ai="${name}"]`)
  if (existing) return existing

  const el = document.createElement('div')
  el.setAttribute('v-ai', name)
  return el
}

export const applyStyles = (
  el: HTMLElement,
  styles: Record<string, string>
) => {
  Object.entries(styles).forEach(([key, value]) => {
    el.style.setProperty(key, value)
  })
}

export const applyEventListeners = (
  el: HTMLElement,
  events: Record<string, (e: Event) => void>
) => {
  Object.entries(events).forEach(([event, handler]) => {
    el.addEventListener(event, handler)
  })
}

export const waitForElement = (
  selector: string,
  timeout = 3000
): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    const el = document.querySelector<HTMLElement>(selector)
    if (el) return resolve(el)

    const observer = new MutationObserver(() => {
      const el = document.querySelector<HTMLElement>(selector)
      if (el) {
        observer.disconnect()
        resolve(el)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element ${selector} not found in time`))
    }, timeout)
  })
}

export const getQueryAll = (selector: string) =>
  document.querySelectorAll(selector)
