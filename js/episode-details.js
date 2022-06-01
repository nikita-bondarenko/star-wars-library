export function render(data) {

  const container = document.createElement('div'),
    title = document.createElement('h1'),
    id = document.createElement('span'),
    returnBtn = document.createElement('button'),
    href = 'index.html',
    planets = {
      list: data.planets,
      title: 'Planets'
    },
    species = {
      list: data.species,
      title: 'Species'
    },
    renderList = async (obj) => {
      const body = document.createElement('div'),
        title = document.createElement('h2'),
        list = document.createElement('ol')

     await import('./episode-details-api.js').then(api => api.getList(obj.list, list))

      title.textContent = obj.title
      body.append(title, list)
      return body
    }

  Promise.all([planets, species].map(obj => renderList(obj))).then(([planetsList, speciesList]) => container.append(planetsList, speciesList))

  container.classList.add('container', 'py-4')
  returnBtn.classList.add('btn', 'btn-secondary', 'my-3')

  title.textContent = data.title;
  id.textContent = `  id: '${data.episode_id}'`;
  returnBtn.textContent = 'Back to episodes';

  id.classList.add('text-info')
  title.append(id)
  container.append(title, returnBtn);

  returnBtn.addEventListener('click', () => history.pushState(null, '', href))

  return container
}
