'use strict'

const apiKey = 'cvCaXmfpPbCjALxrbgHeDegav6m7GGVaODtv7Ng0';

const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQuery(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
};

function displayResults(responseJson) {
    console.log(responseJson);

    $('#results_list').empty();

    for(let i = 0; i < responseJson.data.length; i++) {
        $('#results_list').append(
            `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <br>
            <h5><a href="${responseJson.data[i].url}">Veiw Official Site</a></h5>
            <br>
            <p>${responseJson.data[i].description}</p>
            </li>`)
    };


};

function getParks(searchTerm, maxResults) {
    const params = {
        api_key: apiKey,
        q: searchTerm,
        limit: maxResults
    };

    const queryString = formatQuery(params);
    
    const url = searchUrl + '?' + queryString;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        $('#error_container').text(`Oops, something went wrong: ${error.message}`);
    });
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    let searchTerm = $('#state_search').val();
    let maxResults = $('#max_results').val();

    console.log(searchTerm);
    console.log(maxResults);

    getParks(searchTerm, maxResults);
  });
};

$(watchForm());