/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const fields = [
    { id: "firstName",  errorId: "firstNameError",  check: v => v.trim().length > 0 },
    { id: "lastName",   errorId: "lastNameError",   check: v => v.trim().length > 0 },
    { id: "email",      errorId: "emailError",      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: "subject",    errorId: "subjectError",    check: v => v !== "" },
    { id: "message",    errorId: "messageError",    check: v => v.trim().length >= 10 },
  ];

  fields.forEach(({ id, errorId, check }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    const value = input.value;

    if (!check(value)) {
      input.classList.add("input-error");
      error.classList.add("visible");
      valid = false;
    } else {
      input.classList.remove("input-error");
      error.classList.remove("visible");
    }
  });

  if (!valid) return;

  // Show success
  contactForm.style.display = "none";
  document.getElementById("contactSuccess").style.display = "flex";
});

/* =========================================
   STAR RATING
========================================= */

const starBtns   = document.querySelectorAll(".star-btn");
const ratingInput = document.getElementById("fbRating");
let currentRating = 0;

starBtns.forEach(btn => {
  // Hover: light up up to hovered star
  btn.addEventListener("mouseenter", () => {
    const val = parseInt(btn.dataset.value);
    highlightStars(val);
  });

  // Mouse leave: go back to selected rating
  btn.addEventListener("mouseleave", () => {
    highlightStars(currentRating);
  });

  // Click: lock in the rating
  btn.addEventListener("click", () => {
    currentRating = parseInt(btn.dataset.value);
    ratingInput.value = currentRating;
    highlightStars(currentRating);

    // Clear error if present
    document.getElementById("fbRatingError").classList.remove("visible");
  });
});

function highlightStars(count) {
  starBtns.forEach(btn => {
    const val = parseInt(btn.dataset.value);
    btn.classList.toggle("active", val <= count);
  });
}

/* =========================================
   FEEDBACK FORM
========================================= */

const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const fields = [
    { id: "fbName",    errorId: "fbNameError",    check: v => v.trim().length > 0 },
    { id: "fbEvent",   errorId: "fbEventError",   check: v => v !== "" },
    { id: "fbMessage", errorId: "fbMessageError", check: v => v.trim().length >= 15 },
  ];

  fields.forEach(({ id, errorId, check }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);

    if (!check(input.value)) {
      input.classList.add("input-error");
      error.classList.add("visible");
      valid = false;
    } else {
      input.classList.remove("input-error");
      error.classList.remove("visible");
    }
  });

  // Validate star rating separately
  const ratingError = document.getElementById("fbRatingError");
  if (!ratingInput.value) {
    ratingError.classList.add("visible");
    valid = false;
  } else {
    ratingError.classList.remove("visible");
  }

  if (!valid) return;

  // Show success
  feedbackForm.style.display = "none";
  document.getElementById("feedbackSuccess").style.display = "flex";
});

/* =========================================
   FAQ SEARCH + TOGGLE
========================================= */

const faqSearch = document.getElementById("faqSearch");

if (faqSearch) {
  faqSearch.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    const items = document.querySelectorAll(".faq-item[data-question]");
    let visible = 0;

    items.forEach(item => {
      const keywords = item.dataset.question || "";
      const text     = item.querySelector(".faq-question-text")?.textContent.toLowerCase() || "";
      const match    = keywords.includes(query) || text.includes(query);

      item.style.display = (match || query === "") ? "" : "none";
      if (match || query === "") visible++;
    });

    const noResults = document.getElementById("noResults");
    if (noResults) noResults.style.display = visible === 0 ? "block" : "none";
  });
}

function toggleFaq(btn) {
  const item   = btn.closest(".faq-item");
  const answer = item.querySelector(".faq-answer");
  const isOpen = item.classList.contains("open");

  // Close all
  document.querySelectorAll(".faq-item.open").forEach(el => {
    el.classList.remove("open");
    el.querySelector(".faq-answer").style.maxHeight = null;
  });

  // Open clicked (if it wasn't already open)
  if (!isOpen) {
    item.classList.add("open");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
}