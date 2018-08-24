import request from 'superagent'
import 'shoelace-css/dist/shoelace.css'
import './styles.css'

document.getElementById('search-button').addEventListener('click', event => {
  event.preventDefault()

  let searchTerm = document.getElementById('artist-search').value.replace(' ', '+').trim()

  request.get(`https://itunes.apple.com/search?term=${searchTerm}`)
    .then(response => JSON.parse(response.text))
    .then(body => {
      let results = body.results
      addSongToPage(results)
      console.log('success!')
    })
})

document.getElementById('results-div').addEventListener('click', function (e) {
  console.log('you clicked a song!')
  let dataPreview = document.getElementById('dataUrl')
  console.log(dataPreview)
  if (e.target && e.target.classList.contains('music-link')) {
    console.log('inside if statement')
    document.getElementById('audio-player').src = e.target.dataPreview
    document.getElementById('audio-player').play()
  }
})

function addSongToPage (results) {
  let resultsDiv = document.getElementById('results-div')
  resultsDiv.innerHTML = ''
  console.log(resultsDiv)
  for (let result of results) {
    makeSongDiv(result)
  }
}

function makeSongDiv (result) {
  let resultsDiv = document.getElementById('results-div')
  let songDiv = document.createElement('div')
  songDiv.classList.add('songDiv')
  let outputDiv = `
            <div class="artwork"><img dataUrl="${result.previewUrl}" src=${result.artworkUrl100}></div>
            <div class="trackName">${result.trackName}</div>
            <div class="artistName">${result.artistName}</div>
            <p class="direction">Click album cover to preview song!</p>
    `
  songDiv.innerHTML = outputDiv
  resultsDiv.appendChild(songDiv)
}

// instead of send there - play on page instead

// have event listener -
// find source element in audio player
// change source attribute to relevant url
