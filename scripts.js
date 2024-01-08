document.addEventListener('DOMContentLoaded', function() {
    loadQuotes();
    setInterval(removeOldQuotes, 1000 * 60 * 60 * 24); // Check and remove quotes every 24 hours
});

function postQuote() {
    const usernameInput = document.getElementById('usernameInput');
    const quoteInput = document.getElementById('quoteInput');

    const username = usernameInput.value.trim();
    const quote = quoteInput.value.trim();

    if (username !== '' && quote !== '') {
        saveQuote(username, quote);
        usernameInput.value = '';
        quoteInput.value = '';
        loadQuotes();
    }
}

function saveQuote(username, quote) {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const quoteId = generateUniqueId();
    quotes.push({ id: quoteId, username: username, text: quote, timestamp: new Date().getTime(), likes: 0 });
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
    const quoteContainer = document.getElementById('quote-container');
    quoteContainer.innerHTML = '';

    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote');
        quoteElement.innerHTML = `
            <p><strong>${quote.username}</strong>: ${quote.text}</p>
            <div class="like-section">
                <button class="like-button" onclick="likeQuote('${quote.id}')"><i class="fas fa-heart"></i> Like</button>
                <span class="like-count" id="likeCount_${quote.id}">${quote.likes || 0}</span>
            </div>
        `;
        quoteContainer.appendChild(quoteElement);
    });
}

function likeQuote(quoteId) {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const quoteIndex = quotes.findIndex(quote => quote.id === quoteId);

    if (quoteIndex !== -1) {
        // Increase the likes count for the quote
        quotes[quoteIndex].likes = (quotes[quoteIndex].likes || 0) + 1;

        // Update the localStorage
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Reload the quotes
        loadQuotes();
    }
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function removeOldQuotes() {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const currentTime = new Date().getTime();

    const updatedQuotes = quotes.filter(quote => {
        return currentTime - quote.timestamp <= 1000 * 60 * 60 * 24; // Keep quotes within the last 24 hours
    });

    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    loadQuotes();
}
