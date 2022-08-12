import './css/styles.css';
import NewCountriesApi from './fetchCountries';

const limit = 10;
const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const refs = {
    inputE: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`),
    countryInfo: document.querySelector(`.country-info`),
};

const newCountriesApi = new NewCountriesApi();

refs.inputE.addEventListener(`input`, debounce(onInpt, DEBOUNCE_DELAY))

function onInpt(e) {

    newCountriesApi.query = e.target.value;
    newCountriesApi.fetchCountries().then(i => {
        if (i.length > limit) {return}
        if (i.length === 1) {
            console.log(infoCreator(i))
            clearMarkup()
            refs.countryInfo.innerHTML = infoCreator(i);
            // refs.countryInfo.insertAdjacentHTML(`afterbegin`, infoCreator(i))
            
        } else {
            clearMarkup()
            refs.countryList.innerHTML = listCreator(i);
            console.log(listCreator(i))
            // refs.countryList.insertAdjacentHTML(`afterbegin`, listCreator(i))
        }
    })
};

function listCreator(arr) {
    return arr.map((i) => {
        return `<li class="list">
      <img src="${i.flags.svg}" width="40px" height="40px">${i.name.official}</li>`   
    }).join(``)
};

function infoCreator(arr) { 
    return `<h1><img src="${arr[0].flags.svg}" width="40px" height="40px">${arr[0].name.official}</h1>
    <ul>
    <li>Capital: <span>${arr[0].capital}</span></>
    <li>Population: <span>${arr[0].population}</span></li>
    <li>Languages: <span>${Object.values(arr[0].languages)}</span></li>
    </ul>`
};

function clearMarkup() {
refs.countryInfo.innerHTML = ``;
refs.countryList.innerHTML = ``;
}