'use strict';

const fecAPI = 'uXkCebDReSWI3hEUDb7vgd08sNjNktwhLylH0MD9';
const candidateURL = 'https://api.open.fec.gov/v1/candidates/';
const newsAPI = 'b9e9c385246849c0b943c3902f635af9';
const newsURL = 'https://newsapi.org/v2/top-headlines';


/*=====================================*/
/* Candidate Form Functions ======= */
/*=====================================*/

//convert candidate objects
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


//fetches candidate information from the FEC API (GET request)
function fetchCandidateInfo(candidateName, yearInput, officeInput) {
  const params = {
      api_key: fecAPI,
      q: candidateName,
      year: yearInput, 
      office_full: officeInput
  };

    const queryString = formatQueryParams(params);
    const firstURL = candidateURL + '?' + queryString;

  fetch(firstURL)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => console.log(responseJson))
    .catch(error => {
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}


//form submission for the candidate form 
function candidateForm() {
    $('.candidate-form').submit(e => {
        e.preventDefault();
        let candidateName = $('.candidate-name').val();
        let yearInput = $('.year-input').val();
        let officeInput = $('.office-input').val();
        fetchCandidateInfo(candidateName, yearInput, officeInput);
    });
}

//submit button for the candidate form 
function watchCandidateSubmit() {
    $('.candidate-submit').submit(e => {
        e.preventDefault();
        fetchCandidateInfo();
    });
}

//Display candidate results to the dom 
function candidateResults(responseJson) {
    console.log(responseJson);
   $('.candidate-results').empty();
    //iterate through items array 
    let html = '';
    for(let i = 0; i < responseJson.results.length; i += 1) {

        
    }


}


/*=====================================*/
/* News Form Functions ======= */
/*=====================================*/

//Convert object
function formatNewsParams(newsParams) {
    const queryContent = Object.keys(newsParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(newsParams[key])}`);
    return queryContent.join('&');
}

//GET request from news API
function fetchNewsInfo(newsInput) {
    const newsParams = {
        apiKey: newsAPI,
        q: newsInput
    };

    const queryStringTwo = formatNewsParams(newsParams);
    const secondURL = newsURL + '?' + queryStringTwo;

    fetch(secondURL) 
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => console.log(responseJson))
    .catch(error => {
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

//form submission for news form 
function newsForm() {
    $('.news-form').submit(e => {
        e.preventDefault();
        let newsInput = $('.news-input').val();
        fetchNewsInfo(newsInput);
    })
}

//submit button for news form 
function watchNewsSubmit() {
    $('.news-submit').submit(e => {
        e.preventDefault();
        fetchNewsInfo();
    })
}

candidateForm();
newsForm();
