'use strict';

const fecAPI = 'uXkCebDReSWI3hEUDb7vgd08sNjNktwhLylH0MD9';

//convert object 
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

//fetches candidate information from the FEC API (GET request)
function fetchCandidateInfo() {
  const params = {
      api_key: fecAPI,
      year: query, 
      q: query,
      office: array
  };


  fetch('https://api.open.fec.gov/v1/candidates/search')
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
        const candidateName = $('.candidate-name').val();
        const yearInput = $('.year-input').val();
        const officeInput = $('.office-input').val();
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


