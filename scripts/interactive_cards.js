const cards = document.querySelectorAll(".card");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const dotsContainer = document.getElementById("carouselDots");

let activeIndex = Math.floor(cards.length / 2);

cards.forEach((cards, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");

    dot.setAttribute("aria-label", `Go to card ${index + 1}`);

    dot.addEventListener("click", function() {
        activeIndex = index;
        updateCarousel()
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    cards. forEach((card, index) => {
        card.classList.remove(
            "active",
            "left-one",
            "right-one",
            "left-two",
            "right-two",
            "hidden"
        );

        let difference = index - activeIndex;

        if (difference > cards.length / 2) {
            difference -=cards.length;
        } if (difference < -cards.length / 2) {
            difference += cards.length;
        } if (difference === 0) {
            card.classList.add("active");
        } else if (difference === -1) {
            card.classList.add("left-one");
        } else if (difference === 1) {
            card.classList.add("right-one");
        } else if (difference === -2) {
            card.classList.add("left-two");
        } else if (difference === 2) {
            card.classList.add("right-two");
        } else {
            card.classList.add("hidden");
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
    });
}

function nextCard() {
    activeIndex++;
    if (activeIndex >= cards.length) {
        activeIndex = 0;
    } updateCarousel();
}

function previousCard() {
    activeIndex--;
    if (activeIndex < 0) { 
        activeIndex = cards.length - 1 
    } updateCarousel();
}

nextButton.addEventListener("click", nextCard);

previousButton.addEventListener("click", previousCard);

cards.forEach((card, index) => {
    card.addEventListener("click", function() {
        activeIndex = index;
        updateCarousel();
    });
});

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        nextCard();
    } if (event.key === "ArrowLeft") {
        previousCard();
    }
});

// Mobile Swipe

let touchStartX = 0;
let touchEndX = 0;

const carouselTrack = document.getElementById("carouselTrack");

carouselTrack.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

carouselTrack.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
})

function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    if (swipeDistance > 0) {
        nextCard();
    } else {
        previousCard();
    }
}

updateCarousel();