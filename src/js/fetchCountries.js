const BASE_URL = 'https://restcountries.eu/rest/v2/';

export default function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}name/${searchQuery}?fields=name;capital;population;languages;flag
`).then(response => response.json());
}
