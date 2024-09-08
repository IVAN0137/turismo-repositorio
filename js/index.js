document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const inner = carousel.querySelector('.carousel-inner');
        let currentIndex = 0;
        const intervalTime = parseInt(carousel.getAttribute('data-interval'), 10) || 3000;

        function showItem(index) {
            if (items.length === 0) return;
            inner.style.transform = `translateX(-${index * 100}%)`;
        }

        function showNextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }

        function startCarousel() {
            return setInterval(showNextItem, intervalTime);
        }

        let intervalId = startCarousel();
    });
});
