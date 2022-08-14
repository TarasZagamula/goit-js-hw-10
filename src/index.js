import './css/styles.css';
import "notiflix/dist/notiflix-aio-3.2.5.min.js";
import NewCountriesApi from './fetchCountries';
import Notiflix from 'notiflix';

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
    if (e.target.value === ``) {return clearMarkup()}
    newCountriesApi.fetchCountries().then(res => {
        if (res.length > limit) {
            clearMarkup()
            return Notiflix.Notify.success(`Too many matches found. Please enter a more specific name.`)
        } else if (res.length < limit && res.length > 2) {
            clearMarkup()
            refs.countryList.innerHTML = listCreator(res)
        } else if (res.length === 1) {
            clearMarkup()
            return refs.countryInfo.innerHTML = infoCreator(res)
        } 
    }).catch(err => {
        Notiflix.Notify.failure(`Oops, there is no country with that name`)
    }
    )
};

function listCreator(arr) {
    return arr.map((i) => {
        return `<li class="list_item">
      <img src="${i.flags.svg}" width="70px" height="40px" class="flag_img">${i.name.official}</li>`   
    }).join(``)
};

function infoCreator(arr) { 
    return `<h1 class="title_country"><img src="${arr[0].flags.svg}" width="80px" height="50px" class="flag_img">${arr[0].name.official}</h1>
    <ul class="list_properties">
    <li class="list_item">Capital: <span class="list_value">${arr[0].capital}</span></>
    <li class="list_item">Population: <span class="list_value">${arr[0].population}</span></li>
    <li class="list_item">Languages: <span class="list_value">${Object.values(arr[0].languages)}</span></li>
    </ul>`
};

function clearMarkup() {
refs.countryInfo.innerHTML = ``;
refs.countryList.innerHTML = ``;
};