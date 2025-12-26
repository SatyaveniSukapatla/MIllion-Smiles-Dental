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
const testimonials = Array.from(track.children);
const nextButton = document.querySelector(".carousel-btn.right");
const prevButton = document.querySelector(".carousel-btn.left");
let currentIndex = 0;

function updateCarousel() {
  const width = testimonials[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateCarousel();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);


