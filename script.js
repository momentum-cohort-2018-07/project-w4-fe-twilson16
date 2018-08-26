import request from 'superagent'
import 'shoelace-css/dist/shoelace.css'
import './styles.css'

document.getElementById('search-button').addEventListener('click', event => {
  event.preventDefault()

  let searchTerm = document.getElementById('search').value.replace(' ', '+').trim()
  let audioForm = document.getElementById('audio-search')
  request.get(`https://itunes.apple.com/search?term=${searchTerm}&media=music`)
    .then(response => JSON.parse(response.text))
    .then(body => {
      let results = body.results
      addSongToPage(results)
      console.log('success!')
    })
  audioForm.reset()
})

function addSongToPage (results) {
  let resultsDiv = document.getElementById('results-div')
  resultsDiv.innerHTML = ''
  for (let result of results) {
    makeSongDiv(result)
  }
}

function makeSongDiv (result) {
  let resultsDiv = document.getElementById('results-div')
  let songDiv = document.createElement('div')
  songDiv.classList.add('songDiv')
  let outputDiv = `
            <div class="artwork"><img class="album-image" data-url="${result.previewUrl}" src=${result.artworkUrl100}></div>
            <div class="artistName">Artist: <strong>${result.artistName}</strong></div>
            <div class="trackName">Track: <strong>${result.trackName}</strong></div>
          
    `
  songDiv.innerHTML = outputDiv
  resultsDiv.appendChild(songDiv)
}

document.getElementById('results-div').addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('album-image')) {
    document.getElementById('audio-player').src = e.target.dataset.url
    document.getElementById('audio-player').play()
  }
})
