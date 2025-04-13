import { getGlobalConfig } from '../core/loader'

type EventHandlers = { [key: string]: string }

const defaultHandlers = {
  onClick: 'click',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onFocus: 'focus',
  onBlur: 'blur',
  onKeyDown: 'keydown',
  onKeyUp: 'keyup',
}

let eventHandlers: EventHandlers = { ...defaultHandlers }

export const useEventMapping = async () => {
  const globalConfig = await getGlobalConfig()

  // Gabungkan event default dengan event custom dari user
  eventHandlers = {
    ...defaultHandlers,
    ...(globalConfig.eventMap || {}),
  }

  return eventHandlers
}
