export type Config = {
  path?:
    | {
        public?: string
        query?: string[]
      }
    | string
  eventMap?: Record<string, string>
}

export type Component = {
  name?: string
  tagName?: string
  className?: string
  text?: string
  style?: Record<string, string>
  posBefore?: boolean
  posAfter?: boolean
  [key: string]: any
}

export type Rules = {
  root?: string
  style?: Record<string, string>
  components?: Component[]
  [key: string]: any
}

export type Data = Rules | Record<string, string>
