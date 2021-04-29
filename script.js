const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// New Quote

// Show loading

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading

const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

const newQuote = () => {
  loading();
  // Pick a random quote from quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author field is blank and replace with 'unknown'

  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine styling

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // set quote, hide loader

  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API

const getQuotes = async () => {
  loading();
  const apiURL = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    console.log("error", err.message);
  }
}

// Tweet Quote

const tweetQuote = () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, '_blank');
}

// event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
