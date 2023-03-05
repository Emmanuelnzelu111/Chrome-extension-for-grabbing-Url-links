/* eslint-disable prefer-arrow-callback */
let myData = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('inputBtn');
const delBtn = document.getElementById('delBtn');
const undoBtn = document.getElementById('undoBtn');
const grabBtn = document.getElementById('grabBtn');
const list = document.getElementById('ul-el');
// fetching stored inputted data
const dataFromLocaleStorage = localStorage.getItem('data');

// if stored data exists it should be retrieved and displayed
if (dataFromLocaleStorage) {
  myData = JSON.parse(dataFromLocaleStorage);
  render(myData);
}

// Displays the data as links
function render(data) {
  let listItems = '';
  for (const lead of data) {
    listItems += `<li>
      <a target="_blank" href="${lead}">${lead} </a>
    </li>`;
  }
  list.innerHTML = listItems;
}

// Adds and save the inputted values to var myData, renders and reset the input element
inputBtn.addEventListener('click', () => {
  myData.push(inputEl.value);
  render(myData);
  localStorage.setItem('data', JSON.stringify(myData));
  inputEl.value = '';
});

// grabs url of the current tab
grabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    inputEl.value = tabs[0].url;
  });
});
// removes last entries
undoBtn.addEventListener('click', () => {
  myData.pop();
  localStorage.setItem('data', JSON.stringify(myData));
  // localStorage.removeItem('data','removedItem');
  render(myData);
});

// resets saved data
delBtn.addEventListener('click', () => {
  localStorage.clear();
  myData = [];
  render(myData);
});

function greeting() {
  const cTime = new Date();
  const hour = cTime.getHours();

  const timeOfTheDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';

  document.querySelector('header p span').innerHTML = `Good${timeOfTheDay} Chief! &#128511`;
}
window.addEventListener('load', greeting());
