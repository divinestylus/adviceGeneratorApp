/** Global constants */
const CARD_HEADING_NUMBER = document.querySelector('.card-heading-number'),
CARD_TEXT_QUOTE = document.querySelector('.card-text'),
CARD_BUTTON = document.querySelector('.card-button'),
API_URL = "https://api.adviceslip.com/advice";


/** Functions section */

/**
 * This function generates a random number between 1 -200
 */
function generateRandomNumber(){
    let random = Math.floor(Math.random() * 200);
    if (random === 0) {
        random = 1;
    }
    return random;
}
generateRandomNumber();

/**
 * This asynchronous function gets data from the server
 * @param {string} API_URL - The API key
      */
async function getData(API_URL){
    try {
        disableButton();
        let response = await fetch(API_URL);
        let data = await response.json();
        enableButton();
        populateQuote(data);
        populateNumber(data);
    } catch {
        enableButton();
    }
}

getData(`${API_URL}/${generateRandomNumber()}`);

/**
 * Function to get ID
 * @param {string} data - Object returned from API 
*/
function populateNumber(data){
    CARD_HEADING_NUMBER.innerText = `${data.slip.id}`;
}

/**
 * Function to get quote
 * @param {string} data - Object returned from API 
*/
function populateQuote(data){
    CARD_TEXT_QUOTE.innerText = `"${data.slip.advice}"`;
}

/**
 * Disable next button
 */
function disableButton() {
    CARD_BUTTON.disabled = true;
    CARD_BUTTON.classList.add('card-button-disabled');
}

/**
 * Enable next button
 */
function enableButton(){
    CARD_BUTTON.disabled = false;
    CARD_BUTTON.classList.remove('card-button-disabled');
}


/** Listeners section */
CARD_BUTTON.addEventListener('click', ()=>{
    CARD_HEADING_NUMBER.innerText = "Loading...";
    CARD_TEXT_QUOTE.innerText = "Loading...";
    getData(`${API_URL}/${generateRandomNumber()}`);
});