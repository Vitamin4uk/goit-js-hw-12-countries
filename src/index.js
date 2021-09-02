import './css/style.css';
import fetchCountries from './js/fetchCountries';
import getRefs from './js/getRefs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, Stack } from '@pnotify/core';
import countriesTpl from './templates/countries.hbs';
import singleCountryTpl from './templates/singleCountry.hbs';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  refs.outputContainer.innerHTML = '';
  const query = e.target.value;
  if (query) {
    fetchCountries(query)
      .then(countries => {
        if (countries.length > 10) {
          showNotification();
          return;
        }

        if (countries.length === 1) {
          renderSingleCountry(countries);
        } else if (countries.length > 1) {
          renderCountriesList(countries);
        }
      })
      .catch(error => console.log(`There is an error: ${error}`));
  }
}

function showNotification() {
  const myStack = new Stack({
    dir1: 'down',
    dir2: 'right',
    firstpos1: 60,
    firstpos2: 60,
  });
  error({
    text: 'Too many matches found. Please enter more specific query!',
    delay: 2000,
    sticker: false,
    stack: myStack,
  });
}

function renderCountriesList(countries) {
  const countriesMarkup = countriesTpl(countries);
  refs.outputContainer.innerHTML = countriesMarkup;
}

function renderSingleCountry(countries) {
  const countryMarkup = singleCountryTpl(countries);
  refs.outputContainer.innerHTML = countryMarkup;
}
