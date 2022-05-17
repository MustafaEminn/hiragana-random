const hiraganasLocalStorageKeyword = "hiraganas";

let currentHiragana = {};

// ELEMENTS
const answerInputEl = document.querySelector(".hrContainer__answerInput");
const hiraganaContainerEl = document.getElementsByClassName(
  "hrContainer__hiragana"
)[0];

function getOldHiraganas() {
  let oldHiraganas = localStorage.getItem(hiraganasLocalStorageKeyword);
  return oldHiraganas === null ? null : JSON.parse(oldHiraganas);
}

function setOldHiraganas(newOldHiraganas = []) {
  return localStorage.setItem(
    hiraganasLocalStorageKeyword,
    JSON.stringify(newOldHiraganas)
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomHiragana() {
  return hiraganas[getRandomInt(hiraganas.length)];
}

function setRandomHiraganaToHTML() {
  const hiragana = getRandomHiragana();

  let oldHiraganas = getOldHiraganas();
  if (oldHiraganas === null) {
    oldHiraganas = [];
    setOldHiraganas(oldHiraganas);
  } else {
    for (let i = 0; i < oldHiraganas.length; i++) {
      if (oldHiraganas[i].character === hiragana.character) {
        return setRandomHiraganaToHTML();
      }
    }
    if (oldHiraganas.length >= 50) {
      oldHiraganas.shift();
    }

    oldHiraganas.push(hiragana);
    setOldHiraganas(oldHiraganas);
  }
  currentHiragana = hiragana;
  hiraganaContainerEl.innerHTML = hiragana["character"];
}
setRandomHiraganaToHTML();

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

function onSubmit() {
  const answer = answerInputEl.value;
  if (answer === currentHiragana["romanization"]) {
    hiraganaContainerEl.classList.add("success");

    setTimeout(() => {
      hiraganaContainerEl.classList.remove("success");
      setRandomHiraganaToHTML();
      answerInputEl.value = "";
    }, 500);
  } else {
    hiraganaContainerEl.classList.add("tryAgain");

    setTimeout(() => {
      hiraganaContainerEl.classList.remove("tryAgain");
    }, 500);
  }
}

function alertCurrentAnswer() {
  alert(currentHiragana["romanization"]);
}
