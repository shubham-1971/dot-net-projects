// Central Input Validation System for workpeople HRMS

const Validator = {
  // Evaluation Rules
  rules: {
    required: (val) => val !== undefined && val !== null && String(val).trim() !== "",
    minLength: (val, min) => String(val).trim().length >= min,
    email: (val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val);
    },
    mobile: (val) => {
      const mobileRegex = /^[6-9]\d{9}$/; // Standard Indian mobile validation or generic 10-digit
      return mobileRegex.test(val);
    },
    numeric: (val) => !isNaN(val) && val !== "",
    minSalary: (val, min = 15000) => Number(val) >= min,
    dateNotFuture: (val) => {
      if (!val) return true;
      const today = new Date().setHours(0,0,0,0);
      const inputDate = new Date(val).setHours(0,0,0,0);
      return inputDate <= today;
    },
    dateOrder: (startDate, endDate) => {
      if (!startDate || !endDate) return true;
      return new Date(startDate) <= new Date(endDate);
    },
    fileType: (file, allowedTypes = ["image/jpeg", "image/png", "image/webp"]) => {
      if (!file) return true;
      return allowedTypes.includes(file.type);
    }
  },

  // Central Error UI Reders
  showError: (inputElement, message) => {
    if (!inputElement) return;
    
    // Add error style
    inputElement.classList.add("error");
    
    // Check if error helper element already exists
    let errorHelper = inputElement.parentNode.querySelector(".form-error");
    if (!errorHelper) {
      errorHelper = document.createElement("div");
      errorHelper.className = "form-error";
      inputElement.parentNode.appendChild(errorHelper);
    }
    
    errorHelper.textContent = message;
    errorHelper.classList.add("active");
    errorHelper.setAttribute("role", "alert");
    
    // Accessibility improvement
    inputElement.setAttribute("aria-invalid", "true");
  },

  clearError: (inputElement) => {
    if (!inputElement) return;
    
    inputElement.classList.remove("error");
    inputElement.removeAttribute("aria-invalid");
    
    const errorHelper = inputElement.parentNode.querySelector(".form-error");
    if (errorHelper) {
      errorHelper.classList.remove("active");
      errorHelper.textContent = "";
    }
  },

  // Form Valdiator Utility
  validateForm: (formSelector, fieldsConfig) => {
    const form = document.querySelector(formSelector);
    if (!form) return false;

    let isValid = true;

    // Reset error triggers
    form.querySelectorAll(".form-control").forEach(input => {
      Validator.clearError(input);
    });

    Object.keys(fieldsConfig).forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (!input) return;

      const rulesList = fieldsConfig[fieldName];
      const val = input.value;

      for (let i = 0; i < rulesList.length; i++) {
        const ruleItem = rulesList[i];
        let passes = true;
        let errMsg = ruleItem.message;

        if (ruleItem.rule === "required") {
          passes = Validator.rules.required(val);
        } else if (ruleItem.rule === "minLength") {
          passes = Validator.rules.minLength(val, ruleItem.param);
        } else if (ruleItem.rule === "email") {
          passes = !val || Validator.rules.email(val); // Only validate if not empty
        } else if (ruleItem.rule === "mobile") {
          passes = !val || Validator.rules.mobile(val);
        } else if (ruleItem.rule === "numeric") {
          passes = !val || Validator.rules.numeric(val);
        } else if (ruleItem.rule === "minSalary") {
          passes = !val || Validator.rules.minSalary(val, ruleItem.param);
        } else if (ruleItem.rule === "dateNotFuture") {
          passes = !val || Validator.rules.dateNotFuture(val);
        } else if (ruleItem.rule === "dateOrder") {
          const companionInput = form.querySelector(`[name="${ruleItem.param}"]`);
          if (companionInput) {
            passes = Validator.rules.dateOrder(companionInput.value, val);
          }
        }

        if (!passes) {
          Validator.showError(input, errMsg);
          isValid = false;
          break; // Stop at first failing rule for this field
        }
      }
    });

    return isValid;
  },

  // Blur (real-time) listener attachment helper
  attachBlurValidation: (formSelector, fieldsConfig) => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    Object.keys(fieldsConfig).forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (!input) return;

      input.addEventListener("blur", () => {
        const rulesList = fieldsConfig[fieldName];
        const val = input.value;
        Validator.clearError(input);

        for (let i = 0; i < rulesList.length; i++) {
          const ruleItem = rulesList[i];
          let passes = true;
          let errMsg = ruleItem.message;

          if (ruleItem.rule === "required") {
            passes = Validator.rules.required(val);
          } else if (ruleItem.rule === "minLength") {
            passes = Validator.rules.minLength(val, ruleItem.param);
          } else if (ruleItem.rule === "email") {
            passes = !val || Validator.rules.email(val);
          } else if (ruleItem.rule === "mobile") {
            passes = !val || Validator.rules.mobile(val);
          } else if (ruleItem.rule === "numeric") {
            passes = !val || Validator.rules.numeric(val);
          } else if (ruleItem.rule === "minSalary") {
            passes = !val || Validator.rules.minSalary(val, ruleItem.param);
          } else if (ruleItem.rule === "dateNotFuture") {
            passes = !val || Validator.rules.dateNotFuture(val);
          } else if (ruleItem.rule === "dateOrder") {
            const companionInput = form.querySelector(`[name="${ruleItem.param}"]`);
            if (companionInput) {
              passes = Validator.rules.dateOrder(companionInput.value, val);
            }
          }

          if (!passes) {
            Validator.showError(input, errMsg);
            break;
          }
        }
      });
      
      // Clear error on input focus
      input.addEventListener("input", () => {
        Validator.clearError(input);
      });
    });
  }
};
