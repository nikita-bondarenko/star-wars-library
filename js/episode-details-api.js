export  function getList(urlList, element)  {
  Promise.all(urlList.map(url => fetch(url).then(res => res.json())))
    .then(data => data.forEach(item => {
      const name = document.createElement('li');
      name.textContent = item.name
      element.append(name)
    }));
};
