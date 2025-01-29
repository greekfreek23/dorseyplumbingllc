// -----------------------------------------
// 1. HARDCODE THE PLACE ID (no ?site_id=)
// -----------------------------------------
const PLACE_ID = "ChIJeTIrzE1TrKMRCq-vILpE01A"; // Dorsey Plumbing LLC

// If you also want to store the Facebook link in code:
const FACEBOOK_URL = "https://www.facebook.com/people/Dorsey-Plumbing-LLC/61566606485127/";

// Optional: a function or constant that returns your API endpoint
// In your original code, this might have been something else.
function getApiUrl(placeId) {
  // Example: calling your backend or a 3rd-party service
  // that returns data about the place
  // Adjust the URL to your actual data source
  return `https://your-backend.com/get-data-by-placeid?place_id=${encodeURIComponent(placeId)}`;
}

// -----------------------------------------
// 2. FETCH THE PLACE DATA FROM YOUR BACKEND
//    (OR ANY API THAT PROVIDES GMB DETAILS)
// -----------------------------------------

/*
  This is just an example approach:
  - You have a backend that, given a place ID,
    returns all relevant info (phone, rating, reviews, images, etc.).
  - If your original code used a different approach (like direct from Google),
    then adapt this fetch call accordingly.
*/

fetch(getApiUrl(PLACE_ID))
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then(placeData => {
    // placeData is presumably the JSON with phone, email, rating, etc.
    // Example structure:
    // {
    //   "businessName": "Dorsey Plumbing LLC",
    //   "phone": "+1 470-489-8841",
    //   "email": "example@dorseyplumbing.com",
    //   "street": "123 Plumbing St",
    //   "city": "Opelika",
    //   "state": "AL",
    //   "zip": "36801",
    //   "rating": 5,
    //   "reviews": 2,
    //   "aboutContent": "...",
    //   "heroCta": ["...", "...", "..."],
    //   "reviewLink": "...",
    //   "logoUrl": "...",
    //   "photos": [...],
    //   ...
    // }

    // -----------------------------------------
    // 3. POPULATE THE PAGE USING placeData
    // -----------------------------------------

    // Helper to set text content for [data-*] attributes
    function setTextContent(attribute, value) {
      document.querySelectorAll(`[data-${attribute}]`).forEach(el => {
        el.textContent = value;
      });
    }

    // Update DOM on page load
    setTextContent("business-name", placeData.businessName);
    setTextContent("phone", placeData.phone);
    setTextContent("email", placeData.email);
    setTextContent("city", placeData.city);
    setTextContent("street", placeData.street);
    setTextContent("state", placeData.state);
    setTextContent("zip", placeData.zip);
    setTextContent("rating", placeData.rating);
    setTextContent("reviews", placeData.reviews);

    // If you have separate [data-review-count] placeholders
    document.querySelectorAll("[data-review-count]").forEach(el => {
      el.textContent = placeData.reviews;
    });

    // About
    const aboutEl = document.querySelector("[data-about-content]");
    if (aboutEl) {
      aboutEl.textContent = placeData.aboutContent || "";
    }

    // Hero CTA texts
    if (Array.isArray(placeData.heroCta)) {
      placeData.heroCta.forEach((text, index) => {
        const heroDesc = document.querySelector(`[data-hero-cta="${index}"]`);
        if (heroDesc) {
          heroDesc.textContent = text;
        }
      });
    }

    // Set review button link
    const reviewBtn = document.querySelector("[data-reviewlink]");
    if (reviewBtn && placeData.reviewLink) {
      reviewBtn.href = placeData.reviewLink;
    }

    // Logo
    if (placeData.logoUrl) {
      document.querySelectorAll("[data-logo]").forEach(img => {
        img.src = placeData.logoUrl;
        img.alt = `${placeData.businessName} Logo`;
      });
    }

    // Make sure all phone links get the phone number
    document.querySelectorAll('a[href^="tel:"][data-phone]').forEach(a => {
      a.setAttribute("href", `tel:${placeData.phone}`);
    });

    // Page title
    const titleElem = document.getElementById("dynamic-title");
    if (titleElem) {
      titleElem.textContent = `${placeData.businessName} - ${placeData.city}, ${placeData.state}`;
    }

    // If you have a place for the Facebook link in the DOM, set it
    const facebookLinkEl = document.querySelector("[data-facebook-link]");
    if (facebookLinkEl) {
      facebookLinkEl.href = FACEBOOK_URL;
    }

    // -----------------------------------------
    // 4. HANDLE PHOTOS / SLIDERS / REVIEWS
    // -----------------------------------------

    // Example: if you want to show photos in an "about slider"
    if (Array.isArray(placeData.photos)) {
      const aboutSlider = document.querySelector("[data-about-slider]");
      if (aboutSlider) {
        placeData.photos.forEach((photoUrl, idx) => {
          const slide = document.createElement("div");
          slide.classList.add("slide");
          // Maybe the first slide is "active"
          if (idx === 0) slide.classList.add("active");
          slide.innerHTML = `<img src="${photoUrl}" alt="About Image ${idx}" />`;
          aboutSlider.appendChild(slide);
        });
      }
    }

    // Example: populating the #reviewsTrack slider
    const reviewsTrack = document.getElementById("reviewsTrack");
    if (reviewsTrack && Array.isArray(placeData.customerReviews)) {
      placeData.customerReviews.forEach(review => {
        // Expect review = { author: '', rating: 5, comment: '' }
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review-item");
        reviewElement.innerHTML = `
          <p class="review-comment">"${review.comment}"</p>
          <p class="review-author">- ${review.author}</p>
          <p class="review-rating">Rating: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
        `;
        reviewsTrack.appendChild(reviewElement);
      });
    }

    // Any additional logic for slideshows, animations, etc.
    // ...
  })
  .catch(err => {
    console.error("Error fetching place data:", err);
    // Optionally show a fallback or error message in the UI
  });





