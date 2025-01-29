/*******************************************************
 * script.js
 * (Hardcoded place_id for Dorsey Plumbing LLC)
 *******************************************************/

const PLACE_ID = 'ChIJeTIrzE1TrKMRCq-vILpE01A';

// Helper function to set text content for elements with [data-ATTRIBUTE]
function setTextContent(attribute, value) {
  document.querySelectorAll(`[data-${attribute}]`).forEach(el => {
    el.textContent = value;
  });
}

// Fetch and populate data
async function fetchAndPopulateData() {
  try {
    const response = await fetch(`/data/${PLACE_ID}.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const plumberData = await response.json();

    // 1. Basic info
    setTextContent("business-name", plumberData.businessName);
    setTextContent("phone", plumberData.phone);
    setTextContent("email", plumberData.email);
    setTextContent("city", plumberData.city);
    setTextContent("street", plumberData.street);
    setTextContent("state", plumberData.state);
    setTextContent("zip", plumberData.zip);
    setTextContent("rating", plumberData.rating);
    setTextContent("reviews", plumberData.reviews);

    // 2. Review count
    document.querySelectorAll("[data-review-count]").forEach(el => {
      el.textContent = plumberData.reviews;
    });

    // 3. About content
    const aboutParagraph = document.querySelector("[data-about-content]");
    if (aboutParagraph) {
      aboutParagraph.textContent = plumberData.aboutContent;
    }

    // 4. Hero CTA
    plumberData.heroCta.forEach((text, index) => {
      const heroDesc = document.querySelector(`[data-hero-cta="${index}"]`);
      if (heroDesc) {
        heroDesc.textContent = text;
      }
    });

    // 5. Review link
    const reviewBtn = document.querySelector("[data-reviewlink]");
    if (reviewBtn) {
      reviewBtn.href = plumberData.reviewLink;
    }

    // 6. Logo
    const logoElems = document.querySelectorAll("[data-logo]");
    logoElems.forEach(img => {
      img.src = plumberData.logoUrl;
      img.alt = plumberData.businessName + " Logo";
    });

    // 7. Page title
    const titleElem = document.getElementById("dynamic-title");
    if (titleElem) {
      titleElem.textContent = `${plumberData.businessName} - ${plumberData.city}, ${plumberData.state}`;
    }

    // 8. "Call Now" links
    document.querySelectorAll('a[href^="tel:"][data-phone]').forEach(el => {
      el.setAttribute("href", `tel:${plumberData.phone}`);
    });

    // 9. Facebook link
    const fbLinkEl = document.querySelector("[data-facebook-link]");
    if (fbLinkEl && plumberData.facebookUrl) {
      fbLinkEl.href = plumberData.facebookUrl;
    }

    // 10. Reviews
    const reviewsTrack = document.getElementById("reviewsTrack");
    if (reviewsTrack && plumberData.sampleReviews) {
      plumberData.sampleReviews.forEach(review => {
        const reviewEl = document.createElement("div");
        reviewEl.classList.add("review-item");
        reviewEl.innerHTML = `
          <p class="review-comment">"${review.comment}"</p>
          <p class="review-author">- ${review.author}</p>
          <p class="review-rating">Rating: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
        `;
        reviewsTrack.appendChild(reviewEl);
      });
    }

    // 11. About slider
    const aboutSlider = document.querySelector("[data-about-slider]");
    if (aboutSlider && plumberData.sliderImages) {
      plumberData.sliderImages.forEach((imgUrl, i) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (i === 0) slide.classList.add("active");
        slide.innerHTML = `<img src="${imgUrl}" alt="Slider image ${i + 1}" />`;
        aboutSlider.appendChild(slide);
      });
    }

  } catch (error) {
    console.error('Error fetching or populating data:', error);
  }
}

// When the DOM is loaded, fetch and populate data
document.addEventListener("DOMContentLoaded", fetchAndPopulateData);




