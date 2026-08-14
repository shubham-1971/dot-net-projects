// Departments Management Controller for workpeople

document.addEventListener("DOMContentLoaded", () => {
  const formSelector = "#dept-form";
  
  // Validation Rules
  const fieldsConfig = {
    code: [
      { rule: "required", message: "Department Code is required" },
      { rule: "minLength", param: 2, message: "Code must be at least 2 characters" }
    ],
    name: [
      { rule: "required", message: "Department Name is required" },
      { rule: "minLength", param: 3, message: "Name must be at least 3 characters" }
    ],
    manager: [
      { rule: "required", message: "Manager is required" }
    ],
    extension: [
      { rule: "required", message: "Extension number is required" }
    ]
  };

  // State
  let sortAsc = true;

  // 1. Load active employees into Manager select dropdown inside modal
  const populateManagerDropdown = () => {
    const employees = StorageEngine.getEmployees().filter(e => e.status === "Active");
    const managerSelect = document.getElementById("dept-manager");
    if (!managerSelect) return;

    managerSelect.innerHTML = '<option value="">Select Manager</option>';
    
    // De-duplicate names or just add active employee names
    const names = [...new Set(employees.map(e => e.name))];
    names.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      managerSelect.appendChild(opt);
    });
  };

  // 2. Load and render department cards in grid
  const loadDepartmentsGrid = () => {
    // Recalculate dynamic counts
    StorageEngine.updateDepartmentCounts();

    let departments = StorageEngine.getDepartments();
    const searchVal = document.getElementById("dept-search") ? document.getElementById("dept-search").value.toLowerCase().trim() : "";

    // Filtering
    let filtered = departments.filter(dept => {
      return dept.name.toLowerCase().includes(searchVal) || 
             dept.manager.toLowerCase().includes(searchVal) ||
             dept.id.toLowerCase().includes(searchVal);
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    const grid = document.getElementById("departments-grid");
    if (!grid) return;

    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 40px;">No matching departments found</div>';
      return;
    }

    filtered.forEach(dept => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.justifyContent = "space-between";
      card.style.minHeight = "160px";

      // Design: 3px top border style using inline or custom rules
      card.innerHTML = `
        <div style="height: 3px; background-color: var(--accent);"></div>
        <div class="card-body" style="padding: 16px 18px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <span class="badge badge-neutral" style="font-weight: 700; color: var(--accent);">${dept.id}</span>
              <span class="badge badge-active" style="font-size: 11px;">${dept.count} Staff</span>
            </div>
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 4px; color: var(--text);">${dept.name}</h3>
            <div style="font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 4px; margin-bottom: 3px;">
              <i class="ti ti-user-star" style="font-size: 14px;"></i> <span>Manager: <strong>${dept.manager}</strong></span>
            </div>
            <div style="font-size: 11px; color: var(--subtle); display: flex; align-items: center; gap: 4px;">
              <i class="ti ti-phone-call" style="font-size: 13px;"></i> <span>Extension: ${dept.extension}</span>
            </div>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 14px; justify-content: flex-end;">
            <button class="btn btn-secondary btn-edit-dept" data-id="${dept.id}" style="padding: 4px 10px; font-size: 11px; border-color: var(--border);">
              <i class="ti ti-edit"></i> Edit
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  };

  // 3. Modal Opening & Closing Controls
  const modal = document.getElementById("dept-modal");
  const openModalBtn = document.getElementById("btn-open-dept-modal");
  const closeModalBtn = document.getElementById("btn-close-dept-modal");
  const cancelModalBtn = document.getElementById("btn-cancel-dept-modal");
  const deptForm = document.getElementById("dept-form");

  const openModal = (deptId = null) => {
    populateManagerDropdown();
    
    // Clear previous errors
    if (deptForm) {
      deptForm.querySelectorAll(".form-control").forEach(input => Validator.clearError(input));
      deptForm.reset();
    }

    const modalTitle = document.getElementById("modal-title-text");
    const codeInput = document.getElementById("dept-code");
    const editingIdInput = document.getElementById("dept-editing-id");

    if (deptId) {
      // Edit Mode
      if (modalTitle) modalTitle.textContent = "Edit Department";
      if (codeInput) codeInput.readOnly = true; // Code shouldn't be altered
      if (editingIdInput) editingIdInput.value = deptId;

      const departments = StorageEngine.getDepartments();
      const dept = departments.find(d => d.id === deptId);
      if (dept) {
        document.getElementById("dept-code").value = dept.id;
        document.getElementById("dept-name").value = dept.name;
        document.getElementById("dept-manager").value = dept.manager;
        document.getElementById("dept-extension").value = dept.extension;
      }
    } else {
      // Create Mode
      if (modalTitle) modalTitle.textContent = "Create Department";
      if (codeInput) codeInput.readOnly = false;
      if (editingIdInput) editingIdInput.value = "";
    }

    if (modal) {
      modal.classList.add("active");
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("active");
    }
  };

  if (openModalBtn) openModalBtn.addEventListener("click", () => openModal());
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

  // Close modal clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 4. Save/Submit Form Handler
  if (deptForm) {
    deptForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const isValid = Validator.validateForm(formSelector, fieldsConfig);
      if (isValid) {
        const id = document.getElementById("dept-code").value.trim().toUpperCase();
        const name = document.getElementById("dept-name").value.trim();
        const manager = document.getElementById("dept-manager").value;
        const extension = document.getElementById("dept-extension").value.trim();
        const editingId = document.getElementById("dept-editing-id").value;

        let departments = StorageEngine.getDepartments();

        if (editingId) {
          // Editing existing department
          const deptIdx = departments.findIndex(d => d.id === editingId);
          if (deptIdx > -1) {
            departments[deptIdx].name = name;
            departments[deptIdx].manager = manager;
            departments[deptIdx].extension = extension;
            StorageEngine.saveDepartments(departments);
            ToastSystem.show(`Department '${name}' updated successfully!`, "success");
          }
        } else {
          // Creating new department
          const exists = departments.some(d => d.id === id || d.name.toLowerCase() === name.toLowerCase());
          if (exists) {
            ToastSystem.show("Department code or name already exists.", "error");
            return;
          }

          const newDept = {
            id,
            name,
            manager,
            extension,
            count: 0
          };

          departments.push(newDept);
          StorageEngine.saveDepartments(departments);
          ToastSystem.show(`Department '${name}' created successfully!`, "success");
        }

        closeModal();
        loadDepartmentsGrid();
      } else {
        ToastSystem.show("Please fix the form errors.", "error");
      }
    });
  }

  // Attach live blur validations
  Validator.attachBlurValidation(formSelector, fieldsConfig);

  // 5. Card click delegate for edit
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-edit-dept");
    if (btn) {
      const id = btn.getAttribute("data-id");
      openModal(id);
    }
  });

  // 6. Sorting Trigger
  const sortBtn = document.getElementById("btn-sort-alphabetical");
  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      sortAsc = !sortAsc;
      const icon = sortBtn.querySelector("i");
      if (sortAsc) {
        if (icon) icon.className = "ti ti-sort-ascending-letters";
        sortBtn.innerHTML = '<i class="ti ti-sort-ascending-letters"></i> Sort A-Z';
      } else {
        if (icon) icon.className = "ti ti-sort-descending-letters";
        sortBtn.innerHTML = '<i class="ti ti-sort-descending-letters"></i> Sort Z-A';
      }
      loadDepartmentsGrid();
    });
  }

  // 7. Search Input Filter
  const searchInput = document.getElementById("dept-search");
  if (searchInput) {
    searchInput.addEventListener("input", loadDepartmentsGrid);
  }

  // Initial load
  loadDepartmentsGrid();
});
