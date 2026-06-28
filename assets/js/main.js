/* ==========================================================================
   NEWLEAF - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Theme Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const htmlEl = document.documentElement;
  
  // Check local storage or prefers-color-scheme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
    }
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.setAttribute('data-theme', 'dark');
  }

  // Update icons based on theme
  const updateThemeIcons = () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        if (isDark) {
          icon.className = 'ph ph-sun';
        } else {
          icon.className = 'ph ph-moon';
        }
      }
    });
  };

  updateThemeIcons();

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (htmlEl.getAttribute('data-theme') === 'dark') {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeIcons();
    });
  });

  // 2. RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  const savedDir = localStorage.getItem('dir');
  if (savedDir === 'rtl') {
    htmlEl.setAttribute('dir', 'rtl');
  }

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (htmlEl.getAttribute('dir') === 'rtl') {
        htmlEl.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        htmlEl.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  });

  // 3. Drawer Menu
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  const openDrawer = () => {
    if(drawer && drawerOverlay) {
      drawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if(drawer && drawerOverlay) {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // 4. Form Validation (Contact & Auth)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      contactForm.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

      // Check required fields
      contactForm.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
          isValid = false;
          field.classList.add('is-invalid');
          const errorMsg = field.parentElement.querySelector('.form-error');
          if(errorMsg) errorMsg.style.display = 'block';
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('is-invalid');
          const errorMsg = emailField.parentElement.querySelector('.form-error');
          if(errorMsg) errorMsg.style.display = 'block';
        }
      }

      if (isValid) {
        // Show success
        const successMsg = document.getElementById('formSuccessMsg');
        if (successMsg) {
          successMsg.style.display = 'block';
          contactForm.reset();
        }
      }
    });
  }

  // Register Form validation
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      registerForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      
      const pwd = document.getElementById('regPassword');
      const confirmPwd = document.getElementById('regConfirmPassword');
      const terms = document.getElementById('regTerms');

      if (pwd && pwd.value.length < 8) {
        isValid = false;
        pwd.classList.add('is-invalid');
      }

      if (pwd && confirmPwd && pwd.value !== confirmPwd.value) {
        isValid = false;
        confirmPwd.classList.add('is-invalid');
      }

      if (terms && !terms.checked) {
        isValid = false;
        terms.classList.add('is-invalid');
      }

      if (isValid) {
        // In real app, submit form
        alert('Registration successful (demo)');
      }
    });
  }

  // 5. Accordion (FAQ)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-item').forEach(acc => acc.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Resource Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card-wrapper');
  
  if (filterBtns.length > 0 && articleCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        articleCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. Coming Soon Countdown
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    // Set a date 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance < 0) {
        countdownEl.innerHTML = "EXPIRED";
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      countdownEl.innerHTML = `
        <div style="display:flex;gap:24px;justify-content:center;font-size:1.5rem;font-weight:500;">
          <div>${days}d</div>
          <div>${hours}h</div>
          <div>${minutes}m</div>
          <div>${seconds}s</div>
        </div>
      `;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 8. Password Visibility Toggle
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const wrapper = toggle.closest('.password-input-wrapper');
      if (wrapper) {
        const input = wrapper.querySelector('input');
        const icon = toggle.querySelector('i');
        if (input && icon) {
          if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'ph ph-eye-slash';
          } else {
            input.type = 'password';
            icon.className = 'ph ph-eye';
          }
        }
      }
    });
  });

});
