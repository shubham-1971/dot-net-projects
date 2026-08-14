// Employee Directory and Registration Controller for workpeople

document.addEventListener("DOMContentLoaded", () => {
  const formSelector = "#add-employee-form";
  
  // Validation config
  const fieldsConfig = {
    name: [
      { rule: "required", message: "Full name is required" },
      { rule: "minLength", param: 3, message: "Name must be at least 3 characters" }
    ],
    email: [
      { rule: "required", message: "Email is required" },
      { rule: "email", message: "Enter a valid email address" }
    ],
    phone: [
      { rule: "required", message: "Phone number is required" },
      { rule: "mobile", message: "Enter a valid 10-digit mobile number" }
    ],
    role: [
      { rule: "required", message: "Job role is required" }
    ],
    department: [
      { rule: "required", message: "Department is required" }
    ],
    salary: [
      { rule: "required", message: "Salary is required" },
      { rule: "minSalary", param: 15000, message: "Salary must be at least ₹15,000" }
    ],
    joinDate: [
      { rule: "required", message: "Joining date is required" },
      { rule: "dateNotFuture", message: "Joining date cannot be in the future" }
    ]
  };

  // 1. Generate Next Employee ID
  const generateNextEmployeeID = () => {
    const employees = StorageEngine.getEmployees();
    let maxNum = 1000; // Default base

    employees.forEach(emp => {
      const match = emp.id.match(/^WP-(\d+)$/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    });

    const nextId = `WP-${maxNum + 1}`;
    const idField = document.getElementById("generated-emp-id");
    if (idField) {
      idField.value = nextId;
    }
  };

  generateNextEmployeeID();

  // 2. Load Department Select lists
  const loadDepartmentDropdowns = () => {
    const departments = StorageEngine.getDepartments();
    const empDeptSelect = document.getElementById("emp-dept");
    const rosterFilter = document.getElementById("roster-dept-filter");

    if (empDeptSelect) {
      empDeptSelect.innerHTML = '<option value="">Select Department</option>';
      departments.forEach(dept => {
        const opt = document.createElement("option");
        opt.value = dept.name;
        opt.textContent = dept.name;
        empDeptSelect.appendChild(opt);
      });
    }

    if (rosterFilter) {
      rosterFilter.innerHTML = '<option value="">All Departments</option>';
      departments.forEach(dept => {
        const opt = document.createElement("option");
        opt.value = dept.name;
        opt.textContent = dept.name;
        rosterFilter.appendChild(opt);
      });
    }
  };

  loadDepartmentDropdowns();

  // 3. Avatar Profile Upload Previewer (Base64 conversion)
  let base64Avatar = "";
  const avatarFileInput = document.getElementById("emp-avatar-file");
  const avatarPreviewBox = document.getElementById("avatar-preview-box");

  if (avatarFileInput && avatarPreviewBox) {
    avatarFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!Validator.rules.fileType(file)) {
          ToastSystem.show("Invalid file type. Please upload a PNG, JPEG, or WEBP image.", "error");
          avatarFileInput.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          base64Avatar = event.target.result;
          avatarPreviewBox.innerHTML = `<img src="${base64Avatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);" alt="Preview">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 4. Attach Live Blur validations
  Validator.attachBlurValidation(formSelector, fieldsConfig);

  // 5. Form Submission
  const formElement = document.querySelector(formSelector);
  if (formElement) {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const isValid = Validator.validateForm(formSelector, fieldsConfig);
      if (isValid) {
        const empId = document.getElementById("generated-emp-id").value;
        const name = document.getElementById("emp-name").value.trim();
        const email = document.getElementById("emp-email").value.trim();
        const phone = document.getElementById("emp-phone").value.trim();
        const role = document.getElementById("emp-role").value.trim();
        const department = document.getElementById("emp-dept").value;
        const salary = parseInt(document.getElementById("emp-salary").value);
        const joinDate = document.getElementById("emp-join-date").value;

        // Double check uniqueness of email / ID
        const employees = StorageEngine.getEmployees();
        const isEmailTaken = employees.some(emp => emp.email.toLowerCase() === email.toLowerCase());

        if (isEmailTaken) {
          ToastSystem.show("An employee with this email address already exists.", "error");
          Validator.showError(document.getElementById("emp-email"), "Email already registered");
          return;
        }

        const newEmployee = {
          id: empId,
          name,
          email,
          phone,
          role,
          department,
          salary,
          joinDate,
          avatar: base64Avatar,
          status: "Active"
        };

        employees.push(newEmployee);
        StorageEngine.saveEmployees(employees);

        ToastSystem.show(`${name} registered successfully as ${role}!`, "success");

        // Reset form details
        formElement.reset();
        base64Avatar = "";
        if (avatarPreviewBox) {
          avatarPreviewBox.innerHTML = "WP";
        }

        generateNextEmployeeID();
        loadRosterTable();
      } else {
        ToastSystem.show("Please fix the errors before submitting.", "error");
      }
    });
  }

  // 6. Roster Table population with pagination & filter
  let currentPage = 1;
  let pageLimit = 10;

  const loadRosterTable = () => {
    const employees = StorageEngine.getEmployees();
    const searchVal = document.getElementById("roster-search") ? document.getElementById("roster-search").value.toLowerCase().trim() : "";
    const deptFilterVal = document.getElementById("roster-dept-filter") ? document.getElementById("roster-dept-filter").value : "";

    // Filtering
    const filtered = employees.filter(emp => {
      const matchesSearch = !searchVal || 
        emp.id.toLowerCase().includes(searchVal) ||
        emp.name.toLowerCase().includes(searchVal) ||
        emp.email.toLowerCase().includes(searchVal) ||
        emp.role.toLowerCase().includes(searchVal);
      const matchesDept = !deptFilterVal || emp.department === deptFilterVal;
      return matchesSearch && matchesDept;
    });

    // Pagination calculations
    const totalEntries = filtered.length;
    const totalPages = Math.ceil(totalEntries / pageLimit) || 1;
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const startIdx = (currentPage - 1) * pageLimit;
    const endIdx = Math.min(startIdx + pageLimit, totalEntries);
    const paginated = filtered.slice(startIdx, endIdx);

    const tbody = document.querySelector("#roster-table tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (paginated.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--muted); padding: 20px;">No matching employees found</td></tr>';
    } else {
      paginated.forEach(emp => {
        const initials = emp.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
        const badgeClass = emp.status === "Active" ? "badge-active" : "badge-neutral";
        
        let avatarMarkup = `<div class="table-avatar">${initials}</div>`;
        if (emp.avatar) {
          avatarMarkup = `<div class="table-avatar"><img src="${emp.avatar}" style="width:100%; height:100%; object-fit:cover; border-radius:7px;"></div>`;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${avatarMarkup}</td>
          <td style="font-weight: 600; color: var(--accent);">${emp.id}</td>
          <td>
            <div class="table-user-name">${emp.name}</div>
            <div class="table-user-sub">${emp.email}</div>
          </td>
          <td>${emp.phone}</td>
          <td>
            <div class="table-user-name">${emp.role}</div>
            <div><span class="badge badge-neutral" style="font-size: 10px; font-weight: 500;">${emp.department}</span></div>
          </td>
          <td>${emp.joinDate}</td>
          <td><span class="badge ${badgeClass}">${emp.status}</span></td>
          <td style="text-align: right;">
            <button class="btn-decline btn-delete-emp" data-id="${emp.id}" style="padding: 4px 8px; border-color: var(--border);" title="Terminate / Delete">
              <i class="ti ti-trash" style="color: var(--red);"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Pagination info text
    const infoContainer = document.getElementById("roster-pagination-info");
    if (infoContainer) {
      infoContainer.textContent = `Showing ${totalEntries === 0 ? 0 : startIdx + 1}-${endIdx} of ${totalEntries} entries`;
    }

    // Pagination dynamic controls
    const buttonsContainer = document.getElementById("roster-pagination-buttons");
    if (buttonsContainer) {
      buttonsContainer.innerHTML = "";
      if (totalPages > 1) {
        // Prev button
        const prevBtn = document.createElement("button");
        prevBtn.className = "btn-decline";
        prevBtn.style.padding = "4px 10px";
        prevBtn.style.fontSize = "11px";
        prevBtn.textContent = "Prev";
        if (currentPage === 1) prevBtn.disabled = true;
        prevBtn.addEventListener("click", () => {
          currentPage = Math.max(1, currentPage - 1);
          loadRosterTable();
        });
        buttonsContainer.appendChild(prevBtn);

        // Numeric buttons
        for (let p = 1; p <= totalPages; p++) {
          const pBtn = document.createElement("button");
          pBtn.className = "btn-decline";
          pBtn.style.padding = "4px 10px";
          pBtn.style.fontSize = "11px";
          pBtn.textContent = p;
          if (p === currentPage) {
            pBtn.style.backgroundColor = "var(--accent)";
            pBtn.style.color = "white";
            pBtn.style.borderColor = "var(--accent)";
            pBtn.style.fontWeight = "700";
          }
          pBtn.addEventListener("click", () => {
            currentPage = p;
            loadRosterTable();
          });
          buttonsContainer.appendChild(pBtn);
        }

        // Next button
        const nextBtn = document.createElement("button");
        nextBtn.className = "btn-decline";
        nextBtn.style.padding = "4px 10px";
        nextBtn.style.fontSize = "11px";
        nextBtn.textContent = "Next";
        if (currentPage === totalPages) nextBtn.disabled = true;
        nextBtn.addEventListener("click", () => {
          currentPage = Math.min(totalPages, currentPage + 1);
          loadRosterTable();
        });
        buttonsContainer.appendChild(nextBtn);
      }
    }
  };

  // 7. Filters events attachment
  const rosterSearchInput = document.getElementById("roster-search");
  if (rosterSearchInput) {
    rosterSearchInput.addEventListener("input", () => {
      currentPage = 1;
      loadRosterTable();
    });
  }

  const rosterDeptFilter = document.getElementById("roster-dept-filter");
  if (rosterDeptFilter) {
    rosterDeptFilter.addEventListener("change", () => {
      currentPage = 1;
      loadRosterTable();
    });
  }

  const rosterPageLimit = document.getElementById("roster-page-limit");
  if (rosterPageLimit) {
    rosterPageLimit.addEventListener("change", (e) => {
      pageLimit = parseInt(e.target.value);
      currentPage = 1;
      loadRosterTable();
    });
  }

  // 8. Delete / Terminate Employee Action
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-delete-emp");
    if (btn) {
      const id = btn.getAttribute("data-id");
      if (confirm(`Are you sure you want to delete/terminate employee: ${id}?`)) {
        let employees = StorageEngine.getEmployees();
        const emp = employees.find(e => e.id === id);
        
        if (emp) {
          // Switch to inactive, or remove completely from database
          // Let's remove completely for database consistency, or switch status.
          // Let's set as Inactive first so that historical reference is maintained, or remove
          // Let's keep status "Inactive" instead of full deletion if they're seed, but full remove is fine too.
          // Let's switch to Inactive to show the badge-neutral on table.
          emp.status = "Inactive";
          StorageEngine.saveEmployees(employees);
          ToastSystem.show(`Status of employee ${id} updated to Inactive.`, "info");
          loadRosterTable();
        }
      }
    }
  });

  // Initial table render
  loadRosterTable();
});
