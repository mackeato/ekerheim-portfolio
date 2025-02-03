window.addEventListener("load", () => {
  document.querySelector("#home-div-1 h1").classList.add("fade-in");
  document.querySelector("#home-div-1 h2").classList.add("fade-in");
});

// Select modal elements
const modalOverlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalDescription = document.getElementById("modal-description");

const portfolioThumbs = document.querySelectorAll(".portfolio-thumb");

// Open modal and display the appropriate content
portfolioThumbs.forEach((thumb) => {
  thumb.addEventListener("click", (event) => {
    const title = event.currentTarget.dataset.title;
    const description = event.currentTarget.dataset.description;
    const type = event.currentTarget.dataset.type;
    const url = event.currentTarget.dataset.url;
    const modalClass = event.currentTarget.dataset.class;

    // Update modal title and description
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Clear previous content
    modalContent.innerHTML = "";

    // Add content based on type
    if (type === "image") {
      const img = document.createElement("img");
      img.src = url;
      img.alt = title;
      modalContent.appendChild(img);
    } else if (type === "video") {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      modalContent.appendChild(video);
    }

    // Position modal based on scroll position
    const scrollY = window.scrollY;
    modal.style.top = `${scrollY + 20}px`;

    // Apply the unique class to the modal
    modal.className = `modal ${modalClass}`;

    // Display the modal overlay
    modalOverlay.style.display = "flex";
  });
});

// Close modal when clicking outside
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none"; // Hide modal overlay
  }
});
