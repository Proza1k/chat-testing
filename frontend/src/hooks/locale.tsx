import { IntlShape, useIntl } from 'react-intl'

export const useTranslate = (): ((name: string) => string) => {
  const intl: IntlShape = useIntl()
  return (name: string): string => intl.formatMessage({ id: name })
}
