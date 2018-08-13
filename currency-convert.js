//Input: USD, CAD, 20
//Return: 20 USD is worth 26 CAD. You can spend these in the following countries: Canada


//
const axios = require('axios');

const getExchangeRate = async (from, to) => {
    try{
        var resp = await axios.get('http://data.fixer.io/api/latest?access_key=0b002012f2346e381f7a959dd73be718&format=1');

        var rates = resp.data.rates;
        var base = resp.data.base;
        var rate = rates[base] / rates[from] * rates[to];
        if (isNaN(rate)) {
            throw new Error();
        }
        return rate;
    }catch(e) {
        throw new Error(`Unabe to get exchange rate from ${from} to ${to}`);
    }
}

const getExchangeRatePromises = (from, to) => {
    return axios
        .get('http://data.fixer.io/api/latest?access_key=0b002012f2346e381f7a959dd73be718&format=1')
        .then(resp => {
            var rates = resp.data.rates;
            var base = resp.data.base;
            return rates[base] / rates[from] * rates[to];
        });
};

const getCountriesPromises = (currency) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`)
        .then(resp => {
            return resp.data.map(country => country.name);
        });

};

const getCountries = async (currency) => {
    try {
        var resp = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
        return resp.data.map(country => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currency}`);
    }
};

const convertCurrencyPromises = (from, to, value) => {
    let convertedValue = 0;
    return getExchangeRatePromises(from, to)
        .then(rate => {
           reconvertedValue = value * rate;
           return getCountriesPromises(to)
        })
        .then(countries => {
            return `${value} ${from} is worth ${convertedValue} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
        });
        
}

const convertCurrency = async (from, to, value) => {
    const exchangeRate = await getExchangeRate(from, to);
    const convertedValue = exchangeRate * value;
    const countries = await getCountries(to);
    return `${value} ${from} is worth ${convertedValue} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
};

const convertCurrencyParallel = (from, to, value) => {
    return Promise.all([getExchangeRate(from, to), getCountries(to)])
        .then(values => {
            const convertedValue = values[0] * value;
            const countries = values[1];
            return `${value} ${from} is worth ${convertedValue} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
        });
    ;
};


// getExchangeRate('EUR', 'BRL')
//     .then(rate => console.log(rate))
//     .catch(e => console.log(e));

convertCurrency('EUR', 'BRL', 1)
    .then(message => console.log(message))
    .catch(e => console.log(e));
