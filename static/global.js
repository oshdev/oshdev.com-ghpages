function bakeCookie(name, value, options = {}) {
  const defaultOptions = {
    Path: '/',
    'Max-age': 60 * 60 * 24 * 365,
    Secure: undefined,
    SameSite: 'strict',
  }
  document.cookie = Object.entries({...defaultOptions, ...options}).reduce((a, [k, v]) => {
    a += `;${k}`
    if (typeof v !== 'undefined') a += `=${v}`
    return a
  }, `${name}=${encodeURIComponent(value)}`)
  console.log(document.cookie)
}

function burnCookie(name) {
  bakeCookie(name, '', {'Max-age': 0})
}

function eatCookie(name) {
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith(name));
  return cookie && decodeURIComponent(cookie.split('=', 2)[1].trim())
}

function enableAnalytics() {
  bakeCookie('analyticsEnabled', '1')

  if (document.getElementById('gTagSrc')) return

  const gTagId = 'UA-60548914-1'

  const gTagSrc = document.createElement('script')
  gTagSrc.setAttribute('id', 'gTagSrc')
  gTagSrc.setAttribute('async', 'async')
  gTagSrc.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${gTagId}`)
  document.head.appendChild(gTagSrc)

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'UA-60548914-1');
}

function disableAnalytics() {
  burnCookie('analyticsEnabled')

  const gTagSrc = document.getElementById('gTagSrc')
  if (gTagSrc) gTagSrc.remove()

  window.dataLayer = undefined
}

function setTheme(theme) {
  document.documentElement.setAttribute('theme', theme)
  bakeCookie('theme', theme)
}


;(function () {
  if (eatCookie('analyticsEnabled')) enableAnalytics()
}())

;(function () {
  const checkTheme = maybeTheme => ['light', 'dark'].includes(maybeTheme) ? maybeTheme : undefined

  const cookieTheme = checkTheme(eatCookie('theme'))
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const theme = cookieTheme ? cookieTheme : systemTheme ? systemTheme : 'dark'
  document.documentElement.setAttribute('theme', theme)
}())
