// Leave Management Controller for workpeople

document.addEventListener("DOMContentLoaded", () => {

  //hr validation
 let isHRMode = false;

 const hrCard = document.getElementById("hr-admin-card");

  hrCard.addEventListener("click", () => {

    isHRMode = true;

    ToastSystem.show(
      "HR Approval Mode Enabled",
      "success"
    );

    loadLeavesLog();
  });




  const formSelector = "#apply-leave-form";
  // Form Validation Config
  const fieldsConfig = {
    employeeId: [
      { rule: "required", message: "Employee ID is required" }
    ],
    type: [
      { rule: "required", message: "Leave Category is required" }
    ],
    startDate: [
      { rule: "required", message: "Start Date is required" }
    ],
    endDate: [
      { rule: "required", message: "End Date is required" },
      { rule: "dateOrder", param: "startDate", message: "End Date must be on or after Start Date" }
    ],
    reason: [
      { rule: "required", message: "Reason is required" },
      { rule: "minLength", param: 5, message: "Reason must be at least 5 characters" }
    ]
  };

  // 1. Employee ID Auto-Lookup
  const empIdInput = document.getElementById("leave-emp-id");
  const empNameInput = document.getElementById("leave-emp-name");

  if (empIdInput && empNameInput) {
    const performLookup = () => {
      const id = empIdInput.value.trim().toUpperCase();
      empIdInput.value = id; // Normalise case
      
      if (!id) {
        empNameInput.value = "";
        return;
      }

      const employees = StorageEngine.getEmployees();
      const matched = employees.find(e => e.id === id);

      if (matched) {
        if (matched.status !== "Active") {
          empNameInput.value = `${matched.name} (Inactive)`;
          ToastSystem.show("Warning: Employee is marked as Inactive.", "info");
        } else {
          empNameInput.value = matched.name;
          Validator.clearError(empIdInput);
        }
      } else {
        empNameInput.value = "Employee Not Found";
        Validator.showError(empIdInput, "Invalid Employee ID");
      }
    };

    empIdInput.addEventListener("input", performLookup);
    empIdInput.addEventListener("blur", performLookup);
  }

  // 2. Calculate Leave Duration Excluding Weekends
  const startDateInput = document.getElementById("leave-start-date");
  const endDateInput = document.getElementById("leave-end-date");
  const durationLabel = document.getElementById("calculated-duration-days");
  //allows only 20 days
  const today = new Date();

const minAllowedDate = new Date();
minAllowedDate.setDate(today.getDate() - 20);

const minDateStr = minAllowedDate.toISOString().split("T")[0];
const todayStr = today.toISOString().split("T")[0];

if (startDateInput) {
  startDateInput.min = minDateStr;
  // startDateInput.max = todayStr;
}

if (endDateInput) {
  endDateInput.min = minDateStr;
  // endDateInput.max = todayStr;
}
  
  const calculateDaysExcludingWeekends = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    
    let start = new Date(startDate);
    let end = new Date(endDate);

    if (start > end) return 0;

    let daysCount = 0;
    let current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      // 0 = Sunday, 6 = Saturday
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        daysCount++;
      }
      current.setDate(current.getDate() + 1);
    }

    return daysCount;
  };

  const updateCalculatedDays = () => {
    const sDate = startDateInput.value;
    const eDate = endDateInput.value;
    //vallidating for 20 days 
    const today = new Date();

const minAllowedDate = new Date();
minAllowedDate.setDate(today.getDate() - 20);

const minDateStr =
  minAllowedDate.toISOString().split("T")[0];

if (startDateInput) {
  startDateInput.min = minDateStr;
}

if (endDateInput) {
  endDateInput.min = minDateStr;
}

    //weekend excluding 
    const count = calculateDaysExcludingWeekends(sDate, eDate);
    if (durationLabel) {
      durationLabel.textContent = count;
    }
  };

  if (startDateInput && endDateInput) {
    startDateInput.addEventListener("change", updateCalculatedDays);
    endDateInput.addEventListener("change", updateCalculatedDays);
  }

  // 3. Render Leaves Log Table
  const loadLeavesLog = () => {
    const leaves = StorageEngine.getLeaves();
    const searchVal = document.getElementById("leave-search") ? document.getElementById("leave-search").value.toLowerCase().trim() : "";
    const statusVal = document.getElementById("leave-status-filter") ? document.getElementById("leave-status-filter").value : "";

    const filtered = leaves.filter(l => {
      const matchesSearch = !searchVal || 
        l.employeeName.toLowerCase().includes(searchVal) ||
        l.employeeId.toLowerCase().includes(searchVal) ||
        l.type.toLowerCase().includes(searchVal);
      const matchesStatus = !statusVal || l.status === statusVal;
      return matchesSearch && matchesStatus;
    });

    // Sort by id / date descending to see newest first
    filtered.sort((a, b) => b.id.localeCompare(a.id));

    const tbody = document.querySelector("#leaves-table tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--muted); padding: 20px;">No leave applications found</td></tr>';
      return;
    }

    filtered.forEach(leave => {
      let statusBadge = "badge-neutral";
      if (leave.status === "Approved") statusBadge = "badge-active";
      if (leave.status === "Pending" ) statusBadge = "badge-leave";
      if (leave.status === "Rejected") statusBadge = "badge-rejected";

      let actionsMarkup = "";
      if (leave.status === "Pending" && isHRMode) {
        actionsMarkup = `
          <div style="display: flex; gap: 4px; justify-content: flex-end;">
            <button class="btn-approve btn-approve-leave" data-id="${leave.id}" style="padding: 4px 8px; font-size: 11px;">Approve</button>
            <button class="btn-decline btn-reject-leave" data-id="${leave.id}" style="padding: 4px 8px; font-size: 11px;">Decline</button>
          </div>
        `;
      } else {
        actionsMarkup = `<span style="font-size: 11px; color: var(--muted); font-style: italic;">Processed</span>`;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-weight: 600; color: var(--accent);">${leave.id}</td>
        <td>
          <div style="font-weight: 600;">${leave.employeeName}</div>
          <div style="font-size: 11px; color: var(--muted);">${leave.employeeId}</div>
        </td>
        <td>${leave.type}</td>
        <td style="font-size: 12px; color: var(--muted);">${leave.startDate} to ${leave.endDate}</td>
        <td style="font-weight: 600; text-align: center;">${leave.days}</td>
        <td style="max-width: 150px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${leave.reason}">${leave.reason}</td>
        <td><span class="badge ${statusBadge}">${leave.status}</span></td>
        <td style="text-align: right;">${actionsMarkup}</td>
      `;
      tbody.appendChild(tr);
    });
  };

  // 4. Leave Approval Events
  document.addEventListener("click", (e) => {
    const approveBtn = e.target.closest(".btn-approve-leave");
    if (approveBtn) {
      // Only HR can approve
    if (!isHRMode) {
      ToastSystem.show(
        "Only HR Admin can approve leaves.",
        "error"
      );
      return;
    }
      const id = approveBtn.getAttribute("data-id");
      const leaves = StorageEngine.getLeaves();
      const idx = leaves.findIndex(l => l.id === id);
      if (idx > -1) {
        leaves[idx].status = "Approved";
        StorageEngine.saveLeaves(leaves);
        ToastSystem.show(`Approved leave for ${leaves[idx].employeeName}!`, "success");
        loadLeavesLog();
      }
    }

    const rejectBtn = e.target.closest(".btn-reject-leave");
    if (rejectBtn) {
      // Only HR can reject
    if (!isHRMode) {
      ToastSystem.show(
        "Only HR Admin can reject leaves.",
        "error"
      );
      return;
    }
      const id = rejectBtn.getAttribute("data-id");
      const leaves = StorageEngine.getLeaves();
      const idx = leaves.findIndex(l => l.id === id);
      if (idx > -1) {
        leaves[idx].status = "Rejected";
        StorageEngine.saveLeaves(leaves);
        ToastSystem.show(`Declined leave for ${leaves[idx].employeeName}.`, "neutral");
        loadLeavesLog();
      }
    }
  });

  document
  .getElementById("hr-admin-card")
  .addEventListener("click", () => {

    isHRMode = true;

    ToastSystem.show(
      "HR Approval Mode Enabled",
      "success"
    );

    loadLeavesLog();
});


  // 5. Submit Leave Form Handler
  const formElement = document.querySelector(formSelector);
  if (formElement) {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const isValid = Validator.validateForm(formSelector, fieldsConfig);
      
      const empId = empIdInput.value.trim().toUpperCase();
      const employees = StorageEngine.getEmployees();
      const matchedEmployee = employees.find(emp => emp.id === empId);

      if (empId && !matchedEmployee) {
        Validator.showError(empIdInput, "Please enter a valid Employee ID");
        ToastSystem.show("Please enter a valid Employee ID.", "error");
        return;
      }

      if (isValid && matchedEmployee) {
        const type = document.getElementById("leave-type").value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const reason = document.getElementById("leave-reason").value.trim();
        const days = calculateDaysExcludingWeekends(startDate, endDate);

        if (days <= 0) {
          ToastSystem.show("No working days in the requested date range (weekends only).", "error");
          return;
        }

        const leaves = StorageEngine.getLeaves();
        
        // Generate new Leave ID e.g. L-109
        let maxNum = 100;
        leaves.forEach(l => {
          if (l.id && typeof l.id === "string") {
            const match = l.id.match(/^L-(\d+)$/);
            if (match) {
              const num = parseInt(match[1]);
              if (num > maxNum) maxNum = num;
            }
          }
        });

        const newLeaveId = `L-${maxNum + 1}`;

        const newLeave = {
          id: newLeaveId,
          employeeId: empId,
          employeeName: matchedEmployee.name,
          type,
          startDate,
          endDate,
          days,
          reason,
          status: "Pending"
        };

        leaves.push(newLeave);
        StorageEngine.saveLeaves(leaves);

        ToastSystem.show("Leave request submitted successfully!", "success");
        formElement.reset();
        if (durationLabel) durationLabel.textContent = "0";
        if (empNameInput) empNameInput.value = "";
        loadLeavesLog();
      } else {
        ToastSystem.show("Please correct the form errors.", "error");
      }
    });
  }

  // Attach live blur validation
  Validator.attachBlurValidation(formSelector, fieldsConfig);

  // Attach filter event listeners
  const searchInput = document.getElementById("leave-search");
  if (searchInput) searchInput.addEventListener("input", loadLeavesLog);

  const statusFilter = document.getElementById("leave-status-filter");
  if (statusFilter) statusFilter.addEventListener("change", loadLeavesLog);

  // Initial table render
  loadLeavesLog();
});
