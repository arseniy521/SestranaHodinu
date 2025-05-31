// --- Existing JavaScript from your site (Testimonials, Dynamic Text, Hamburger) ---
const existingSliderDots = document.querySelectorAll('.dot');
const existingTestimonialCard = document.querySelector('.testimonial-card');
const existingPrevButton = document.querySelector('.prev-button');
const existingNextButton = document.querySelector('.next-button');
const translations = {
    en: [
        "Prescribed Medication",
        "Prescribed IV Drips",
        "Prescribed Injections",
        "Antibiotic Therapy",
        "Vitamin Injections"
    ],
    cs: [
        "Předepsané léky",
        "Předepsané infuze",
        "Předepsané injekce",
        "Antibiotická terapie",
        "Vitamínové injekce"
    ],
    ru: [
        "Назначенные лекарства",
        "Капельницы",
        "Инъекции",
        "Антибиотики",
        "Витаминные уколы"

    ],
    uk: [
        "Призначені ліки",
        "Крапельниці",
        "Ін'єкції",
        "Антибіотикотерапія",
        "Вітамінні Ін'єкції"
    ]
};
let lang = document.documentElement.lang || 'en';

if (!translations[lang]) {
    // Fallback: try to determine language from URL path
    const path = window.location.pathname;
    if (path.includes('/ru/')) lang = 'ru';
    else if (path.includes('/uk/')) lang = 'uk';
    else if (path.includes('/en/')) lang = 'en';
    else lang = 'cs'; // Default to Czech if no language found
}

const phrases = translations[lang] || translations.en;
// const phrases = ["Prescribed Medication", "Prescribed IV Drips", "Prescribed Injections", "Antibiotic Therapy", "Vitamin Injections"];
const dynamicText = document.getElementById("dynamic-text");
let currentPhraseIndex = 0;

function updateDynamicText() {
    if (dynamicText) { // Check if element exists
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        dynamicText.textContent = phrases[currentPhraseIndex];
    }
}
if (dynamicText) { // Check if element exists before setting interval
    setInterval(updateDynamicText, 3000);
}

const testimonials = [
    {
        text: "“I needed a nurse for my elderly mother after surgery. The service was fast, professional, and kind. We didn’t expect such comfort and care at home.”",
        author: "Petra M.",
    },
    {
        text: "“Great communication and quick response. The nurse was on time, explained everything clearly, and handled the injection smoothly. Highly recommended!”",
        author: "Martin K.",
    },
    {
        text: "“I booked an IV therapy after a flu. The process was simple, and the nurse was fantastic — kind, clean, and professional. I’ll use the service again.”",
        author: "Anna Š.",
    },
    {
        text: "“We had a nurse come for my son’s vaccine. It was so much easier than going to the clinic. Efficient, stress-free, and reliable.”",
        author: "Vladislav D.",
    }
];

let currentIndex = 0;

function updateTestimonial() {
    if (existingTestimonialCard && existingSliderDots && existingSliderDots.length > 0) { // Check if elements exist
        existingTestimonialCard.innerHTML = `
            <p class="testimonial-text">${testimonials[currentIndex].text}</p>
            <p class="testimonial-author">${testimonials[currentIndex].author}</p>
        `;

        existingSliderDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
}

function nextTestimonial() {
    if (existingTestimonialCard) { // Check if element exists
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial();
    }
}

function prevTestimonial() {
    if (existingTestimonialCard) { // Check if element exists
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }
}
if (existingPrevButton && existingNextButton && existingSliderDots) { // Check if elements exist
    existingPrevButton.addEventListener('click', prevTestimonial);
    existingNextButton.addEventListener('click', nextTestimonial);

    existingSliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateTestimonial();
        });
    });
    updateTestimonial(); // Initial update
    setInterval(nextTestimonial, 5000); // Automatic sliding
}

const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

function switchLanguage(langFile) {
    window.location.href = langFile;
}

if (hamburger && mobileNav) { // Check if elements exist
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}

// --- JavaScript for Order Nurse Modal ---
const orderNurseModal = document.getElementById('orderNurseModal');
const openModalBtn = document.getElementById('openOrderNurseModalBtn');
const closeModalBtn = document.getElementById('closeOrderNurseModalBtn');
const promoEmailForm = document.getElementById('promoEmailForm');
const modalEmailInput = document.getElementById('modalEmailInput');
const modalFormMessage = document.getElementById('modalFormMessage');


// Function to open the modal
function openModal() {
    if (orderNurseModal) {
        orderNurseModal.classList.add('active');
    }
}

// Function to close the modal
function closeModal() {
    if (orderNurseModal) {
        orderNurseModal.classList.remove('active');
        if(modalFormMessage) { // Check if modalFormMessage exists
            modalFormMessage.style.display = 'none'; // Hide any previous messages
            modalFormMessage.textContent = '';
        }
        if(promoEmailForm) { // Check if promoEmailForm exists
            promoEmailForm.reset(); // Reset form
        }
    }
}

// Event listener for the open button
if (openModalBtn) {
    openModalBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        openModal();
    });
}

// Event listener for the close button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Event listener to close modal if user clicks outside the modal content
if (orderNurseModal) {
    orderNurseModal.addEventListener('click', function(event) {
        if (event.target === orderNurseModal) { // Check if the click is on the overlay itself
            closeModal();
        }
    });
}

// Event listener for Esc key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && orderNurseModal && orderNurseModal.classList.contains('active')) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form       = document.getElementById('promoEmailForm');
    const spinner    = document.getElementById('loadingSpinner');
    const hiddenIframe = document.getElementById('hidden_iframe');

    form.addEventListener('submit', () => {
        // show spinner, disable button so they can’t double-click
        spinner.style.display = 'inline-block';
        form.querySelector('button').disabled = true;
    });

    hiddenIframe.addEventListener('load', () => {
        // hide spinner, re-enable button
        spinner.style.display = 'none';
        form.querySelector('button').disabled = false;

        // your existing “on success” logic:
        form.reset();
        closeModal();
        const msg = document.getElementById('modalFormMessage');
        msg.textContent = "Thanks! Your code is on its way.";
        msg.style.display = 'block';
    });
});
// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all questions
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });

            // Toggle current question
            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
// Handle form submission
// if (promoEmailForm) {
//     promoEmailForm.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent default form submission
        //
        // const email = modalEmailInput.value.trim();
        // if (!email) {
        //     if(modalFormMessage) {
        //         modalFormMessage.textContent = 'Please enter a valid email address.';
        //         modalFormMessage.className = 'modal-message error';
        //         modalFormMessage.style.display = 'block';
        //     }
        //     return;
        // }
        //
        // const googleScriptURL = 'https://script.google.com/macros/s/AKfycby9PnmtMgu38txcGJd2BWHjDF2AA_yDjwIePGUVpny54B08Sg9VtDNffk0czMgBwhqjKw/exec';
        //
        //
        // if(modalFormMessage) {
        //     modalFormMessage.textContent = 'Submitting...';
        //     modalFormMessage.className = 'modal-message'; // Reset to default class
        //     modalFormMessage.style.display = 'block';
        // }
        //
        // fetch(googleScriptURL, {
//             method: 'POST',
//             mode: 'no-cors', // Required for cross-origin requests to Google Apps Script
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email: email }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if(modalFormMessage){
//                     if (data.result === 'success') {
//                         modalFormMessage.textContent = 'Thank you! We will notify you and send your promo code soon.';
//                         modalFormMessage.className = 'modal-message success';
//                         if(promoEmailForm) promoEmailForm.reset();
//                         // Optionally close modal after a delay
//                         // setTimeout(closeModal, 3000);
//                     } else {
//                         modalFormMessage.textContent = 'Submission failed. Please try again. ' + (data.message || '');
//                         modalFormMessage.className = 'modal-message error';
//                         console.error('Google Apps Script Error:', data.message);
//                     }
//                 }
//             })
//             .catch(error => {
//                 if(modalFormMessage) {
//                     modalFormMessage.textContent = 'An error occurred. Please try again later.';
//                     modalFormMessage.className = 'modal-message error';
//                 }
//                 console.error('Fetch Error:', error);
//             });
//     });
// }
