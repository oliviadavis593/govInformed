'use strict';

const apiKey = 'uXkCebDReSWI3hEUDb7vgd08sNjNktwhLylH0MD9';

//Fetches information for the first endpoint (FEC API)
function fetchCandidateInfo() {
    fetch('https://api.open.fec.gov/v1/candidates/')
        .then(response => response.json())
        .then(responseJson => console.log(responseJson))
}

//Form submission for candidate form 
function userCandidateSearch() {
    $('.candidate-form').submit(e => {
        e.preventDefault();
        let candidateName = $('.candidate-name').val();
        let yearInput = $('.year-input').val();
        let officeInput = $('.office-input').val();
        fetchCandidateInfo(candidateName, yearInput, officeInput);
    })
}

//Submit button for candidate form 
function watchCandidateSubmit() {
    $('.candidate-submit').submit(e => {
        e.preventDefault();
        fetchCandidateInfo();
    });
}