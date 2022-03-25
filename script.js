const textArea = document.getElementById('words')
const fakeTextArea = document.querySelector('.fake-textarea')
const arrAbjad = ['a', 'i', 'u', 'e', 'o']

function $(name) {
  return document.querySelector(name)
}

function getTotalPerAbjad(arr, abj) {
  const regex = new RegExp(`${abj}`, 'gi')
  return Number(arr.filter((a) => a.match(regex)).length)
}

const limit = 285
$('#limit-char').textContent = `0 / ${limit}`
textArea.setAttribute('maxlength', limit)

function submit(el) {
  let textValue = el.value
  const textRegex = /[aiueo]/ig
  const Match = textValue.toString().match(textRegex)
  const letterCount = textValue.replace(/\s+/g, '').length
  const characterCount = textValue.length

  $('#limit-char').textContent = `${characterCount} / ${limit}`

  if (characterCount == limit) {
    $('#limit-char').style.color = "green"
  } else {
    $('#limit-char').style.color = "black"
    fakeTextArea.innerHTML = textValue.replace(textRegex, match => `<mark>${match}</mark>`)
    $('#letters').textContent = letterCount
    $('.letter-count > span').textContent = (letterCount > 1) ? "letters" : "letter"
  
    $('#btn-reset').style.opacity = (letterCount > 0) ? "1" : "0"
  
    if (Match != null && Match.length > 0) {
      $('.total-vowels-container > span').textContent = (Match.length > 1) ? "Vowels" : "Vowel"
      $('#total').textContent = Match.length
      
      let abjadNum = []
      arrAbjad.forEach(abj => {
        const abjTotal = getTotalPerAbjad(Match, abj)
        $(`#v-${abj}`).textContent = abjTotal

        abjadNum.push(abjTotal)
        const max = abjadNum.indexOf(Math.max(...abjadNum))
        for (i of arrAbjad) {
          $(`#vowel-box-${i}`).style.backgroundColor = (i == arrAbjad[max]) ? "#8b7eff" : "#4c39ff"
        }
      });
    } else {
      $('.total-vowels-container > span').textContent = "Vowel"
      $('#total').textContent = "0"
      arrAbjad.forEach(abj => {
        $(`#v-${abj}`).textContent = "0"
        $(`#vowel-box-${abj}`).style.backgroundColor = "#4c39ff"
      });
    }
  }
}

function reset(el) {
  $('#limit-char').textContent = `0 / ${limit}`
  $('#limit-char').style.color = "black"
  textArea.value = ""
  fakeTextArea.innerHTML = ""
  $('#total').textContent = "0"
  $('#letters').textContent = "0"
  $('.total-vowels-container > span').textContent = "Vowel"
  $('.letter-count > span').textContent = "letter"
  arrAbjad.forEach(abj => {
    $(`#v-${abj}`).textContent = "0"
    $(`#vowel-box-${abj}`).style.backgroundColor = "#4c39ff"
  });

  el.style.opacity = "0"
}

textArea.addEventListener('input', (e) => {
  submit(e.target)
})

textArea.addEventListener('keypress', function (e) {
  if (e.key === 13 || e.keyCode === 13) {
    e.preventDefault();
    return false;
  }
});
