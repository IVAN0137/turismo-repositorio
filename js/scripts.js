document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const cardsContainer = document.getElementById('cards-container');

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = cardsContainer.getElementsByClassName('card');

        Array.from(cards).forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const details = Array.from(card.querySelectorAll('p')).map(p => p.textContent.toLowerCase());

            if (name.includes(searchTerm) || details.some(detail => detail.includes(searchTerm))) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
