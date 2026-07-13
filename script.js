// Wait for the DOM to load fully
document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------------
       1. Header Scroll State
       ------------------------------------------------------------- */
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* -------------------------------------------------------------
       2. Mobile Navigation Toggle
       ------------------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    // Close menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }

  /* -------------------------------------------------------------
       3. Active Section Link Highlighting on Scroll
       ------------------------------------------------------------- */
  const sections = document.querySelectorAll("section");

  const highlightNav = () => {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(`.nav-menu a[href*=${sectionId}]`)
          ?.classList.add("active");
      } else {
        document
          .querySelector(`.nav-menu a[href*=${sectionId}]`)
          ?.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNav);

  /* -------------------------------------------------------------
       4. Scroll-Triggered Fade-In Animations (IntersectionObserver)
       ------------------------------------------------------------- */
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });

  /* -------------------------------------------------------------
       5. Portfolio Filtering Logic
       ------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  const filterPortfolio = (filterValue) => {
    // Update active class on buttons
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-filter") === filterValue) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Hide/Show items
    portfolioItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (filterValue === "all" || category === filterValue) {
        item.style.display = "flex";
        // Trigger a small animation repaint
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 50);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const filterValue = e.target.getAttribute("data-filter");
      filterPortfolio(filterValue);
    });
  });

  // Domain Quick Links Trigger Portfolio Filters
  const domainTriggers = document.querySelectorAll(".filter-trigger");
  domainTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      const filterValue = e.target.getAttribute("data-filter");
      filterPortfolio(filterValue);
    });
  });

  /* -------------------------------------------------------------
       6. Project Modal Database & Modal Controller
       ------------------------------------------------------------- */
  const projectData = {
    faceinsight: {
      title: "FaceInsight",
      tag: "Artificial Intelligence",
      image: "assets/faceInsight.png",
      role: "AI Project Developer",
      duration: "Academic Project",
      focus: "Image analysis and model-based prediction",
      description:
        "FaceInsight is an image-based AI project that detects faces in uploaded images and predicts age and gender using TensorFlow and OpenCV. The work focused on practical model usage and a simple interface for testing the workflow.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Streamlit"],
      demo: "#",
      code: "#",
    },
    fashionstore: {
      title: "FashionStore",
      tag: "Java Full Stack",
      image: "assets/fashionStore.png",
      role: "Java Full Stack Developer",
      duration: "Academic Project",
      focus: "User authentication, products, cart, and orders",
      description:
        "FashionStore is a Java-based e-commerce web application with user authentication, product management, cart handling, and order flow. The project helped me strengthen database integration and backend logic in a practical web app.",
      tech: [
        "Java",
        "JDBC",
        "Servlets",
        "JSP",
        "MySQL",
        "HTML5",
        "CSS3",
        "JavaScript",
      ],
      demo: "#",
      code: "#",
    },
    foodapp: {
      title: "GoGrab",
      tag: "Java Full Stack",
      image: "assets/goGrab.png",
      role: "Java Full Stack Developer",
      duration: "Academic Project",
      focus: "Food ordering and delivery address management",
      description:
        "GoGrab is a food ordering web application where users can browse restaurants, view menus, manage carts, place orders, and maintain delivery addresses using Java Full Stack technologies.",
      tech: [
        "Java",
        "Servlets",
        "JDBC",
        "JSP",
        "MySQL",
        "HTML5",
        "CSS3",
        "JavaScript",
      ],
      demo: "#",
      code: "#",
    },
    vava: {
      title: "VAVA",
      tag: "Artificial Intelligence",
      image: "assets/vava.png",
      role: "Python Developer",
      duration: "Academic Project",
      focus: "Speech recognition and voice commands",
      description:
        "VAVA is a voice-based desktop assistant built in Python that responds to speech commands for simple actions. The project focused on basic speech recognition and interactive command handling.",
      tech: ["Python", "SpeechRecognition", "pyttsx3"],
      demo: "#",
      code: "#",
    },
    blockland: {
      title: "Chain Charity",
      tag: "Blockchain",
      image: "assets/blockLand.png",
      role: "Blockchain Project Developer",
      duration: "Academic Project",
      focus: "Transparent donations and crowdfunding",
      description:
        "Chain Charity is a blockchain-based crowdfunding platform developed using Solidity to improve transparency and trust in charitable donations.",
      tech: ["Solidity", "Ethereum", "Remix IDE"],
      demo: "#",
      code: "#",
    },
  };

  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImg = document.getElementById("modal-img");
  const modalTag = document.getElementById("modal-tag");
  const modalTitle = document.getElementById("modal-title");
  const modalRole = document.getElementById("modal-role");
  const modalDuration = document.getElementById("modal-duration");
  const modalFocus = document.getElementById("modal-focus");
  const modalDesc = document.getElementById("modal-desc");
  const modalTech = document.getElementById("modal-tech");
  const modalDemo = document.getElementById("modal-demo-link");
  const modalCode = document.getElementById("modal-code-link");

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalRole.textContent = data.role;
    modalDuration.textContent = data.duration;
    modalFocus.textContent = data.focus;
    modalDesc.textContent = data.description;

    // Clean tech list
    modalTech.innerHTML = "";
    data.tech.forEach((techItem) => {
      const li = document.createElement("li");
      li.textContent = techItem;
      modalTech.appendChild(li);
    });

    modalDemo.href = data.demo;
    modalCode.href = data.code;

    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // Lock page scroll
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "auto"; // Restore scroll
  };

  // Attach click events to portfolio items
  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => {
      const projectId = item.getAttribute("data-project-id");
      openModal(projectId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close modal when clicking overlay background
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  /* -------------------------------------------------------------
       7. Asynchronous Google Forms Submission Handler
       ------------------------------------------------------------- */
  const gform = document.getElementById("gform");
  const feedback = document.getElementById("form-feedback");

  if (gform) {
    gform.addEventListener("submit", (e) => {
      e.preventDefault(); // Stop standard form redirection

      // UI feedback: show sending state
      const submitBtn = gform.querySelector(".form-submit-btn");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.innerHTML =
        'Sending... <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>';

      feedback.style.display = "block";
      feedback.style.color = "var(--text-secondary)";
      feedback.textContent = "Submitting message...";

      const formData = new FormData(gform);

      const isFormspree = gform.action.includes("formspree.io");
      const fetchOptions = {
        method: "POST",
        body: formData,
      };

      if (isFormspree) {
        fetchOptions.headers = {
          Accept: "application/json",
        };
      } else {
        fetchOptions.mode = "no-cors"; // Google Form action fallback
      }

      // Send dynamic fetch request
      fetch(gform.action, fetchOptions)
        .then((response) => {
          if (isFormspree && !response.ok) {
            throw new Error("Network response error");
          }
          feedback.style.color = "var(--accent)";
          feedback.innerHTML =
            "✔ Message sent successfully! I will reach out shortly.";
          gform.reset(); // Clear input fields
        })
        .catch((err) => {
          console.error("Google Form submission failed:", err);
          // Fallback / standard notice
          feedback.style.color = "#ef4444";
          feedback.textContent =
            "❌ Submission error. Please contact directly at mrcoder250@gmail.com.";
        })
        .finally(() => {
          // Reset submit button state
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.innerHTML = originalBtnText;
        });
    });
  }
});

// Spin animation rules added via script inject for spinner helper
const style = document.createElement("style");
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
