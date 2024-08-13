// countries data in data.js file
const inputLang = document.querySelector('#inputLang')
const outputLang = document.querySelector('#outputLang')
const inputText = document.querySelector('#inputText')
const outputText = document.querySelector('#outputText')
const btn = document.querySelector('#btn')

// adding countries
Object.values(countries).map(country => {
  country != 'English' &&
    (inputLang.innerHTML += `<option value=${country}>${country}</option>`)
  country != 'Arabic' &&
    (outputLang.innerHTML += `<option value=${country}>${country}</option>`)
})

// language event listeners
let text = ''
let from = 'en-GB'
let to = 'ar-SA'
let textCleared = false
inputText.addEventListener('input', e => {
  if (textCleared) {
    inputText.value = e.data
    textCleared = false
  }
  text = e.target.value
})

inputLang.addEventListener('change', e => {
  from =
    Object.keys(countries).find(key => countries[key] === e.target.value) ||
    'en-GB'
})
outputLang.addEventListener('change', e => {
  to =
    Object.keys(countries).find(key => countries[key] === e.target.value) ||
    'ar-SA'
})
//fetch data
const fetchData = () => {
  fetch(
    `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`
  )
    .then(res => res.json())
    .then(data => {
      data.matches.length > 0
        ? (outputText.value = data.matches[0].translation)
        : (outputText.value = 'No Translation found')
    })
    .catch(err => console.log(err))
}

const translationHandler = () => {
  if (text.length > 0) {
    fetchData()
    textCleared = true
    text = ''
    inputText.focus()
  }
}

btn.addEventListener('click', translationHandler)
// enter key event
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && text.length > 0) {
    translationHandler()
    e.preventDefault()
  }
})
