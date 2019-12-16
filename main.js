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
    .then(responseJson => candidateResults(responseJson))
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

        $('#header-container p').remove();
        $('#header-container h1').text('Candidate Results');
        $('#news-container').remove();
        $('#candidate-container').remove();
        $('.candidate-results').show();
        
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
   $('.candidate-results').empty();
    //iterate through items array 
    let html = '';
    for(let i = 0; i < responseJson.results.length; i += 1) {
        const results = responseJson.results[i];
        const activeDate = results.active_through;
        const inactiveCandidate = results.candidate_inactive;
        const electionYears = results.election_years;
        const officeFull = results.office_full;
        const partyFull = results.party_full; 
        const state = results.state; 
        const fileDate = results.first_file_date;


        html += `
        <ul>
        <h2>${partyFull}</h2>
            <li>Active Date: ${activeDate}</li>
            <li>Date they applied to run: ${fileDate}</li>
            <li>Are they inactive: ${inactiveCandidate}</li>
            <li>Election Years: 
            ${electionYears}
            </li>
            <li>Office they were or are running for: ${officeFull}</li>
            <li>State they were or are running for: ${state}</li>
        </ul>
        `;
        //display the results section 
        $('.candidate-results').html(html);
        $('#js-candidate').removeClass('hidden');


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
    .then(responseJson => newsResults(responseJson))
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

        $('#header-container p').remove();
        $('#header-container h1').text('News Results');
        $('#candidate-container').remove();
        $('#news-container').remove();
        $('.news-results').show();
    });
}

//submit button for news form 
function watchNewsSubmit() {
    $('.news-submit').submit(e => {
        e.preventDefault();
        fetchNewsInfo();
    });
}

function newsResults(responseJson) {
    $('.news-results').empty();

    let html = '';
    for(let i = 0; i < responseJson.articles.length; i += 1) {
        const articles = responseJson.articles[i];
        const author = articles.author;
        const title = articles.title;
        const description = articles.description;
        const url = articles.url;

        html += `
        <h3>${title}</h3>
        <h4>${author}</h4>
        <p>${description}</p>
        <a href="${url}" target="_blank">Click here to view the full article</a>
        `;
    }
    //display results section
    $('.news-results').html(html);
    $('#js-news').removeClass('hidden');
}



candidateForm();
newsForm();



