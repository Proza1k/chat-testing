declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined
  }>

  const src: string
  export default src
}

declare module '*.json' {
  const value: Record<string, string>
  export default value
}

declare type Nullable<T> = T | null
