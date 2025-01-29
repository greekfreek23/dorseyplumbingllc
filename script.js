/*******************************************************
 * script.js
 * (No ?site_id=; Hardcoded Dorsey Plumbing LLC info)
 *******************************************************/

// Hardcoded data for Dorsey Plumbing LLC
const plumberData = {
  businessName: "Dorsey Plumbing LLC",
  phone: "+1 470-489-8841",
  email: "example@dorseyplumbing.com",  // Replace if needed
  street: "N/A",                       // Replace if you have an actual street
  city: "Opelika",
  state: "AL",
  zip: "36801",
  rating: 5,                           // star rating
  reviews: 2,                          // number of reviews

  aboutContent: `Dorsey Plumbing LLC is your trusted, reliable plumber in Opelika, AL. Whether it’s emergency service or routine maintenance, we have you covered.`,

  heroCta: [
    "Emergency? Call us now for immediate help!",
    "Need a plumber? We’re here 24/7 for you!",
    "Got leaks? Let our experts fix it fast!"
  ],

  reviewLink: "https://search.google.com/local/reviews?placeid=ChIJeTIrzE1TrKMRCq-vILpE01A",
  logoUrl: "https://lh6.googleusercontent.com/-25pYWHqDxsk/...", // Replace with your logo URL if you want
  facebookUrl: "https://www.facebook.com/people/Dorsey-Plumbing-LLC/61566606485127/"
};

// Helper function to set text content for elements with [data-ATTRIBUTE]
function setTextContent(attribute, value) {
  document.querySelectorAll(`[data-${attribute}]`).forEach(el => {
    el.textContent = value;
  });
}

// When the DOM is loaded, populate placeholders
document.addEventListener("DOMContentLoaded", function() {
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

  // 2. If you have a separate [data-review-count]
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
    titleElem.textContent = "Dorsey Plumbing LLC - Opelika, AL";
  }

  // 8. "Call Now" links
  //    Any <a href="tel:" data-phone> gets the phone
  document.querySelectorAll('a[href^="tel:"][data-phone]').forEach(el => {
    el.setAttribute("href", `tel:${plumberData.phone}`);
  });

  // 9. If you want to dynamically set the Facebook link:
  //    In your HTML, you could do:
  //      <a data-facebook-link>
  //         <i class="fab fa-facebook-f"></i>
  //      </a>
  const fbLinkEl = document.querySelector("[data-facebook-link]");
  if (fbLinkEl) {
    fbLinkEl.href = plumberData.facebookUrl;
  }

  // 10. If you want to populate reviews in #reviewsTrack
  //     (Example placeholder data)
  const reviewsTrack = document.getElementById("reviewsTrack");
  if (reviewsTrack) {
    const sampleReviews = [
      {
        author: "John Doe",
        rating: 5,
        comment: "Quick, professional, and fair-priced!"
      },
      {
        author: "Jane Smith",
        rating: 5,
        comment: "Fixed my leak in minutes. Highly recommend!"
      }
    ];
    sampleReviews.forEach(review => {
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

  // 11. If you have an [data-about-slider] to populate with images
  //     you can do it here. For example:
  /*
  const aboutSlider = document.querySelector("[data-about-slider]");
  if (aboutSlider) {
    const sliderImages = [
      "https://via.placeholder.com/600x400?text=Dorsey+Plumbing+LLC+1",
      "https://via.placeholder.com/600x400?text=Dorsey+Plumbing+LLC+2"
    ];
    sliderImages.forEach((imgUrl, i) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      if (i === 0) slide.classList.add("active");
      slide.innerHTML = `<img src="${imgUrl}" alt="Slider image ${i}" />`;
      aboutSlider.appendChild(slide);
    });
  }
  */

});




