(function () {
  const checkTheme = maybeTheme => ['light', 'dark'].includes(maybeTheme) ? maybeTheme : undefined

  const userCookieThemeString = document.cookie.split(';').find(c => c.startsWith('theme='))
  const userCookieTheme = userCookieThemeString && userCookieThemeString.split('=')[1]
  const cookieTheme = checkTheme(userCookieTheme)
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const theme = cookieTheme ? cookieTheme : systemTheme ? systemTheme : 'dark'
  document.documentElement.setAttribute('theme', theme)
}())
