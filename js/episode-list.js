export function render(data) {

  const container = document.createElement('div')
  container.classList.add(
    'container',
    'd-flex',
    "justify-content-between",
    "flex-wrap",
    'py-4'
  )
  data.results.forEach((episode, index) => {
    const episodeCard = document.createElement('div'),
      cardBody = document.createElement('div'),
      number = document.createElement('p'),
      title = document.createElement('h5'),
      detailsBtn = document.createElement('button'),
      href = `?episodeNumber=${index + 1}`

    episodeCard.style.width = '30%'
    episodeCard.classList.add('card', 'my-2')
    cardBody.classList.add('card-body')
    title.classList.add('card-title')
    number.classList.add('card-text')

    detailsBtn.classList.add('btn', 'btn-primary')
    episodeCard.append(cardBody, detailsBtn)
    cardBody.append(number, title)
    number.textContent = `${index + 1}`;
    title.textContent = episode.title;

    detailsBtn.textContent = 'Подробнее'

    container.append(episodeCard)

    detailsBtn.addEventListener('click', () => history.pushState(null, '', href))

  })

  return container
}
