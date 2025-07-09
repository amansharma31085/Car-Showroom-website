AOS.init({
    duration: 1000, // global duration for AOS animations
    once: true // animations only happen once
});

document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

// Close nav links if a link is clicked (for mobile)
document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("show");
    });
});

document.getElementById("searchInput").addEventListener("input", filterCars);
document.getElementById("typeFilter").addEventListener("change", filterCars);
document.getElementById("fuelFilter").addEventListener("change", filterCars); // New fuel filter

function filterCars() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;
  const fuel = document.getElementById("fuelFilter").value; // Get fuel type
  const cards = document.querySelectorAll("#carList .car-card");

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const carType = card.getAttribute("data-type");
    const carFuel = card.getAttribute("data-fuel"); // Get car's fuel type

    const matchesSearch = name.includes(search);
    const matchesType = (type === "" || type === carType);
    const matchesFuel = (fuel === "" || fuel === carFuel); // Check fuel match

    const matches = matchesSearch && matchesType && matchesFuel; // Combine all conditions
    card.style.display = matches ? "flex" : "none";
  });
}

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDesc = document.getElementById("modalDesc");

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".car-card");
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalImage.src = card.querySelector("img").src;
    // InnerHTML is used to preserve the <p> tags and strong formatting
    modalDesc.innerHTML = card.querySelector(".car-details").innerHTML;
    modal.style.display = "flex";
  });
});

document.querySelector(".close-modal").addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

document.querySelectorAll(".book-now-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".car-card");
        const carName = card.querySelector("h3").textContent;
        alert(`Thank you for your interest in the ${carName}! A representative will contact you shortly to confirm your booking.`);
    });
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for contacting us! We will get back to you shortly.");
  this.reset();
});

// Basic Hero Carousel Logic
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-nav .prev');
const nextBtn = document.querySelector('.carousel-nav .next');
let currentItem = 0;

function showItem(index) {
    carouselItems.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
}

function nextItem() {
    currentItem = (currentItem + 1) % carouselItems.length;
    showItem(currentItem);
}

function prevItem() {
    currentItem = (currentItem - 1 + carouselItems.length) % carouselItems.length;
    showItem(currentItem);
}

prevBtn.addEventListener('click', prevItem);
nextBtn.addEventListener('click', nextItem);

// Auto-advance carousel
let autoAdvanceInterval = setInterval(nextItem, 5000); // Change image every 5 seconds

// Pause auto-advance on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
    clearInterval(autoAdvanceInterval);
});
heroSection.addEventListener('mouseleave', () => {
    autoAdvanceInterval = setInterval(nextItem, 5000);
});

// Sticky Header (Optional, CSS sticky is often sufficient)
// window.addEventListener('scroll', () => {
//     const header = document.getElementById('mainHeader');
//     if (window.scrollY > header.offsetHeight) {
//         header.classList.add('sticky'); // Add a 'sticky' class for specific sticky styles
//     } else {
//         header.classList.remove('sticky');
//     }
// });