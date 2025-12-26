// fetching sidebar start
document.addEventListener("DOMContentLoaded", () => {
  fetch("sidebar.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("sidebar").innerHTML = html;
      console.log("Sidebar loaded successfully");
    })
    .catch((err) => console.error("Error loading sidebar:", err));
});

// header fetcting
fetch ("header.html")
.then(response => response.text())
.then(data => {
  document.getElementById("header").innerHTML = data;
})
.catch(error => console.error('error loading header:', error));

// fetching Footer start
fetch("footer.html")
.then(res => res.text())
.then((data) => {
   document.getElementById("footer").innerHTML = data;
})
.catch((err) => console.error("error loading footer:", err));

// Testimonial Carousel Functionality
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel-btn.right");
const prevButton = document.querySelector(".carousel-btn.left");

let index = 1;
let slideWidth;
let autoSlide;

// Clone first & last slide
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = Array.from(track.children);

// Set width & position
function setPosition() {
  slideWidth = allSlides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

setPosition();

// Smooth transition
function moveToSlide() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

// Next
function nextSlide() {
  if (index >= allSlides.length - 1) return;
  index++;
  moveToSlide();
}

// Prev
function prevSlide() {
  if (index <= 0) return;
  index--;
  moveToSlide();
}

// Fix infinite jump
track.addEventListener("transitionend", () => {
  if (allSlides[index].classList.contains("clone")) {
    track.style.transition = "none";
    index = index === allSlides.length - 1 ? 1 : allSlides.length - 2;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

// Buttons
nextButton.addEventListener("click", () => {
  nextSlide();
  restartAuto();
});

prevButton.addEventListener("click", () => {
  prevSlide();
  restartAuto();
});

// Auto slide
function startAuto() {
  autoSlide = setInterval(nextSlide, 3000);
}

function stopAuto() {
  clearInterval(autoSlide);
}

function restartAuto() {
  stopAuto();
  startAuto();
}

// Pause on hover
track.addEventListener("mouseenter", stopAuto);
track.addEventListener("mouseleave", startAuto);

// Resize fix
window.addEventListener("resize", () => {
  setPosition();
});

// Init
startAuto();















// const track = document.querySelector(".carousel-track");
// const testimonials = Array.from(track.children);
// const nextButton = document.querySelector(".carousel-btn.right");
// const prevButton = document.querySelector(".carousel-btn.left");

// let currentIndex = 0;
// let autoSlideInterval;

// function updateCarousel() {
//   const width = testimonials[0].getBoundingClientRect().width;
//   track.style.transform = `translateX(-${currentIndex * width}px)`;
// }
// // Next slide
// function moveNext() {
//   currentIndex = (currentIndex + 1) % testimonials.length;
//   updateCarousel();
// }
// // Previous slide
// function movePrev() {
//   currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
//   updateCarousel();
// }
// // Button controls
// nextButton.addEventListener("click", () => {
//   moveNext();
//   restartAutoSlide();
// });
// prevButton.addEventListener("click", () => {
//   movePrev();
//   restartAutoSlide();
// });

// // Auto slide
// function startAutoSlide() {
//   autoSlideInterval = setInterval(moveNext, 3000); // 3 seconds
// }

// function stopAutoSlide() {
//   clearInterval(autoSlideInterval);
// }

// function restartAutoSlide() {
//   stopAutoSlide();
//   startAutoSlide();
// }
// // Pause on hover
// track.addEventListener("mouseenter", stopAutoSlide);
// track.addEventListener("mouseleave", startAutoSlide);
// // Responsive fix
// window.addEventListener("resize", updateCarousel);

// updateCarousel();
// startAutoSlide();


// const track = document.querySelector(".carousel-track");
// const testimonials = Array.from(track.children);
// const nextButton = document.querySelector(".carousel-btn.right");
// const prevButton = document.querySelector(".carousel-btn.left");
// let currentIndex = 0;

// function updateCarousel() {
//   const width = testimonials[0].getBoundingClientRect().width;
//   track.style.transform = `translateX(-${currentIndex * width}px)`;
// }

// nextButton.addEventListener("click", () => {
//   currentIndex = (currentIndex + 1) % testimonials.length;
//   updateCarousel();
// });

// prevButton.addEventListener("click", () => {
//   currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
//   updateCarousel();
// });

// window.addEventListener("resize", updateCarousel);
