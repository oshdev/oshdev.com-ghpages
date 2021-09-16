function enableAnalytics() {
  bakeCookie('analyticsEnabled', '1')

  if (document.getElementById('gTagSrc')) return

  const gTagId = 'UA-60548914-1'

  const gTagSrc = document.createElement('script')
  gTagSrc.setAttribute('id', 'gTagSrc')
  gTagSrc.setAttribute('async', 'async')
  gTagSrc.setAttribute(
    'src',
    `https://www.googletagmanager.com/gtag/js?id=${gTagId}`
  )
  document.head.appendChild(gTagSrc)

  window.dataLayer = window.dataLayer || []

  function gtag() {
    dataLayer.push(arguments)
  }

  gtag('js', new Date())
  gtag('config', 'UA-60548914-1')
}

function disableAnalytics() {
  burnCookie('analyticsEnabled')

  const gTagSrc = document.getElementById('gTagSrc')
  if (gTagSrc) gTagSrc.remove()

  window.dataLayer = undefined
}

;(function () {
  if (eatCookie('analyticsEnabled')) enableAnalytics()
})()
