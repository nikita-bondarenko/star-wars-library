const createPage = () => {
  const appContainer = document.getElementById('app'),
    searchParams = new URLSearchParams(location.search),
    episodeNumber = searchParams.get('episodeNumber'),
    cssPromises = {},
    loadResource = (src) => {
      if (src.endsWith('.js')) {
        return import(src)
      } else if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = src
          cssPromises[src] = new Promise(resolve => {
            link.addEventListener('load', () => resolve())
          })
          document.head.append(link)
        }
        return cssPromises[src]
      } else {
        return fetch(src).then(res => res.json())
      }
    },
    renderPage = (moduleName, apiUrl, css) => {
      Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
        .then(([pageModule, data]) => {
          appContainer.innerHTML = '';
          appContainer.append(pageModule.render(data))
        })
    }
  if (episodeNumber) {
    renderPage(
      './episode-details.js',
      `https://swapi.dev/api/films/${episodeNumber}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
    )
  } else {
    renderPage(
      './episode-list.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
    )
  }
}

window.addEventListener('DOMContentLoaded', () => {
  createPage()
  let url = location.href
  function changePage() {
    const newUrl = location.href
    url === newUrl ? 1 : (url = newUrl, createPage())
  }
  setInterval(changePage, 1)
})



