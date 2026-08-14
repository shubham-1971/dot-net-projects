// Shared UI Controllers for workpeople HRMS

document.addEventListener("DOMContentLoaded", () => {
  // 1. Loader Screen Fade Out
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 600);
  }

  // 2. Theme Toggler
  const themeToggleBtn = document.getElementById("theme-toggle");
  const initTheme = StorageEngine.getTheme();
  
  const applyTheme = (theme) => {
    const icon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (icon) {
        icon.className = "ti ti-sun";
      }
    } else {
      document.body.classList.remove("dark-mode");
      if (icon) {
        icon.className = "ti ti-moon";
      }
    }
  };

  applyTheme(initTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = StorageEngine.getTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      StorageEngine.saveTheme(newTheme);
      applyTheme(newTheme);
      ToastSystem.show(`Switched to ${newTheme} mode!`, "info");
    });
  }

  // 3. Back-To-Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  
  // 4. Mobile Sidebar Hamburger Trigger
  const mobileHamburger = document.getElementById("mobile-hamburger");
  const sidebar = document.getElementById("sidebar");
  if (mobileHamburger && sidebar) {
    mobileHamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("mobile-open");
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (sidebar.classList.contains("mobile-open") && !sidebar.contains(e.target) && e.target !== mobileHamburger) {
        sidebar.classList.remove("mobile-open");
      }
    });
  }
});

// 5. Toast Notification System
const ToastSystem = {
  container: null,
  activeToasts: [],

  init: () => {
    if (!ToastSystem.container) {
      ToastSystem.container = document.createElement("div");
      ToastSystem.container.className = "toast-container";
      document.body.appendChild(ToastSystem.container);
    }
  },

  show: (message, type = "success") => {
    ToastSystem.init();

    // Max 3 concurrent toasts
    if (ToastSystem.activeToasts.length >= 3) {
      const oldestToast = ToastSystem.activeToasts.shift();
      oldestToast.classList.remove("show");
      setTimeout(() => {
        if (oldestToast.parentNode) {
          oldestToast.remove();
        }
      }, 300);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let iconClass = "ti ti-circle-check";
    if (type === "info") iconClass = "ti ti-info-circle";
    if (type === "error") iconClass = "ti ti-alert-circle";

    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <span>${message}</span>
    `;

    ToastSystem.container.appendChild(toast);
    ToastSystem.activeToasts.push(toast);

    // Slide in
    setTimeout(() => {
      toast.classList.add("show");
    }, 50);

    // Auto fade out and remove
    setTimeout(() => {
      toast.classList.remove("show");
      // Remove from tracking array
      const idx = ToastSystem.activeToasts.indexOf(toast);
      if (idx > -1) ToastSystem.activeToasts.splice(idx, 1);

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
};
