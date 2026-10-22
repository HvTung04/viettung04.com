import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  const isSupported = (value: string): value is (typeof routing.locales)[number] =>
    (routing.locales as readonly string[]).includes(value);

  if (!locale || !isSupported(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
