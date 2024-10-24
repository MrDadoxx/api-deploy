import './style.css'

const getMovieElement = movie => `
                <article class="movie" data-id="${movie.id}">
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster}" />
                </article>
                `

fetch('http://localhost:1234/movies')
  .then(response => response.json())
  .then(movies => {
    const html = movies.map(movie => getMovieElement(movie)).join('')
    document.querySelector('#app').innerHTML = html
  })
