import { isArr, RulesApi } from '@aidomx/core'

type Component = RulesApi.component

export const body = (id: string, components?: Component[]) => {
  if (!isArr(components)) return

  const lists = [...components, ...components?.flatMap((c) => c.scope ?? [])]
  let contents = lists.map(renderComponent).join('')

  return `<div id="${id}">${contents}</div>`
}

const renderComponent = (comp: Component): string => {
  const tag = comp.design?.type ?? 'div'
  const className = comp.design?.className ?? ''
  const content = comp.content ?? ''
  return `<${tag} class="${className}">${content}</${tag}>`
}
