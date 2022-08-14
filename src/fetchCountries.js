export default class NewCountriesApi {
    constructor() {
        this.searchCountry = ``;
        this.page = 1;
    }

    fetchCountries(name) {
        const options = {
            nameOfficial: `name`,
            capital: `capital`, 
            population: `population`, 
            languages: `languages`,
            flagsSvg: `flags`,   
        }
        const url = `https://restcountries.com/v3.1/name/`

        return fetch(`${url}${this.searchCountry}?fields=${Object.values(options).join(`,`)}`)
            .then(res => {
                if (res.status === 404) {
                    console.log(res.status)
                    throw new Error(response.status)
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                return data
            }).catch(error => {
               return console.log(error)
            })
    }

    get query() {
        return this.searchCountry;
    }
    set query(newCountry) {
        this.searchCountry = newCountry;
    }
};

