/**
 * Marco Heimeshoff Website - Main JavaScript
 * Handles navigation, mobile menu, and form validation
 */

(function() {
  'use strict';

  // ===================================
  // Mobile Navigation Toggle
  // ===================================
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = navList.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav') && navList.classList.contains('active')) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
      }
    });
  }

  // ===================================
  // Header scroll effect
  // ===================================
  const header = document.querySelector('.header');

  if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
      }

      lastScroll = currentScroll;
    });
  }

  // ===================================
  // Contact Form Validation & Handling
  // ===================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    // Validation functions
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function showError(input, errorElement, message) {
      input.classList.add('error');
      if (errorElement) {
        errorElement.textContent = message;
      }
    }

    function clearError(input, errorElement) {
      input.classList.remove('error');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }

    function validateField(input, errorElementId, validationFn, errorMessage) {
      const errorElement = document.getElementById(errorElementId);
      const value = input.value.trim();

      if (!value) {
        showError(input, errorElement, 'This field is required');
        return false;
      }

      if (validationFn && !validationFn(value)) {
        showError(input, errorElement, errorMessage);
        return false;
      }

      clearError(input, errorElement);
      return true;
    }

    // Real-time validation on blur
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        validateField(nameInput, 'name-error');
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        validateField(emailInput, 'email-error', validateEmail, 'Please enter a valid email address');
      });
    }

    if (messageInput) {
      messageInput.addEventListener('blur', function() {
        validateField(messageInput, 'message-error');
      });
    }

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(function(input) {
      if (input) {
        input.addEventListener('input', function() {
          const errorElement = document.getElementById(input.id + '-error');
          clearError(input, errorElement);
        });
      }
    });

    // Form submission
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Validate all fields
      const isNameValid = validateField(nameInput, 'name-error');
      const isEmailValid = validateField(emailInput, 'email-error', validateEmail, 'Please enter a valid email address');
      const isMessageValid = validateField(messageInput, 'message-error');

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        formStatus.textContent = 'Please fix the errors above.';
        formStatus.style.color = '#eb68a0';
        return;
      }

      // Collect form data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        company: document.getElementById('company').value.trim(),
        interest: document.getElementById('interest').value,
        message: messageInput.value.trim()
      };

      // Since this is a static site, we'll show a success message
      // In production, you would send this to a backend or service like Formspree
      console.log('Form submitted:', formData);

      // Show success message
      formStatus.textContent = 'Thank you for your message! I\'ll get back to you soon.';
      formStatus.style.color = '#93c01f';

      // Reset form
      contactForm.reset();

      // Clear any remaining error states
      [nameInput, emailInput, messageInput].forEach(function(input) {
        if (input) {
          const errorElement = document.getElementById(input.id + '-error');
          clearError(input, errorElement);
        }
      });
    });
  }

  // ===================================
  // Smooth scroll for anchor links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===================================
  // Add animation on scroll (simple reveal)
  // ===================================
  function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .pillar, .stat, .service-card, .community-card');

    elements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Initialize elements with hidden state
  document.querySelectorAll('.card, .pillar, .stat, .service-card, .community-card').forEach(function(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run on load and scroll
  window.addEventListener('load', revealOnScroll);
  window.addEventListener('scroll', revealOnScroll);

})();
