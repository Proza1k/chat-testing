import { LocalesType } from 'src/types/locale'
import EnglishLocale from 'src/locales/en.json'
import RussianLocale from 'src/locales/ru.json'

export const LOCALES: LocalesType = {
  ENGLISH: 'en-US',
  RUSSIAN: 'ru-RU'
}

export const DEFAULT_LANGUAGE = LOCALES.RUSSIAN

export const MESSAGES: {
  [key: string]: Record<string, string>
} = {
  [LOCALES.RUSSIAN]: RussianLocale,
  [LOCALES.ENGLISH]: EnglishLocale
}
