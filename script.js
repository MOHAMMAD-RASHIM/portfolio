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
      tag: "AI Integration",
      image: "assets/project_faceinsight.svg",
      role: "Team Lead & AI Engineer",
      duration: "4 Months",
      focus: "Real-time face analysis & model deployment",
      description:
        "FaceInsight is an AI-powered age and gender detection platform that combines deep learning inference with a polished web experience. I led a team of four to build the workflow from model preparation to deployment, focusing on robust preprocessing, fast inference, and a clear interface for end users.",
      tech: ["PyTorch", "OpenCV", "FastAPI", "React", "Deep Learning"],
      demo: "#",
      code: "#",
    },
    fashionstore: {
      title: "FashionStore",
      tag: "UI & Cloud",
      image: "assets/project_fashionstore.svg",
      role: "Frontend Engineer & Product Builder",
      duration: "3 Months",
      focus: "Premium storefront UX & cloud hosting",
      description:
        "FashionStore is a premium e-commerce web application focused on interactive product browsing, polished UI states, and scalable cloud deployment. The experience blends modern frontend architecture with an engaging visual system tailored to fashion retail.",
      tech: ["React", "Node.js", "Firebase", "Cloud Hosting"],
      demo: "#",
      code: "#",
    },
    foodapp: {
      title: "FoodApp",
      tag: "UI & Cloud",
      image: "assets/project_foodapp.svg",
      role: "Full Stack Developer",
      duration: "5 Months",
      focus: "Ordering flow & live delivery tracking",
      description:
        "FoodApp is a full-stack food delivery platform that combines order management, delivery tracking, and a refined customer experience. I built the core application flow and delivery experience for fast, reliable interactions across desktop and mobile.",
      tech: ["Spring Boot", "React", "MySQL", "Docker"],
      demo: "#",
      code: "#",
    },
    vava: {
      title: "VAVA",
      tag: "AI Integration",
      image: "assets/project_vava.svg",
      role: "AI Engineer",
      duration: "2 Months",
      focus: "Speech recognition & voice-driven interactions",
      description:
        "VAVA is a voice-activated virtual assistant designed for hands-free interaction through speech recognition and natural language commands. The project emphasizes adaptive responsiveness and a lightweight experience that feels intuitive from the first interaction.",
      tech: ["Python", "Speech Recognition", "WebSocket", "React"],
      demo: "#",
      code: "#",
    },
    hospitaldb: {
      title: "Hospital DB",
      tag: "Enterprise Java",
      image: "assets/project_hospitaldb.svg",
      role: "Backend Developer",
      duration: "6 Months",
      focus: "Secure patient management & enterprise data flow",
      description:
        "Hospital DB is a secure patient management system built for medical environments that require reliability, role-based access, and clean data handling. The platform focuses on HIPAA-conscious design, access control, and a dependable backend foundation.",
      tech: ["Java", "Spring Boot", "PostgreSQL", "JWT Security"],
      demo: "#",
      code: "#",
    },
    blockland: {
      title: "BlockLand",
      tag: "Enterprise Java",
      image: "assets/project_blockland.svg",
      role: "Software Engineer",
      duration: "4 Months",
      focus: "Decentralized land registry workflows",
      description:
        "BlockLand is a blockchain-based land registry application that brings transparent ownership records and tamper-resistant verification into a practical system. The project combines secure backend services with a modern interface for managing property records.",
      tech: ["Java", "Blockchain", "Spring Security", "PostgreSQL"],
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
