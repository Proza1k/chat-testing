import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import { Router } from 'src/router/Router'
import { DEFAULT_LANGUAGE, MESSAGES } from './constants/locale'
import { getLocale } from './helpers/locale'
import './App.module.scss'
import { useAppStartHooks } from './hooks/start'

export const App = () => {
  const locale = getLocale()
  useAppStartHooks()

  return (
    <IntlProvider messages={MESSAGES[locale]} locale={locale} defaultLocale={DEFAULT_LANGUAGE}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </IntlProvider>
  )
}
