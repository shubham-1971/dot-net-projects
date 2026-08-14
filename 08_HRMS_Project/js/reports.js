// Reports and Analytical Summaries Controller for workpeople

document.addEventListener("DOMContentLoaded", () => {
  // 1. Gather & Calculate Reports Data
  const employees = StorageEngine.getEmployees();
  const activeEmployees = employees.filter(e => e.status === "Active");
  const departments = StorageEngine.getDepartments();
  const leaves = StorageEngine.getLeaves();
  const attendanceData = StorageEngine.getAttendance();

  const totalEmployeesCount = activeEmployees.length;

  // Payroll Calculation
  const totalPayrollVal = activeEmployees.reduce((sum, e) => sum + Number(e.salary), 0);

  // Today On Leave Calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const onLeaveTodayCount = leaves.filter(l => {
    return l.status === "Approved" && todayStr >= l.startDate && todayStr <= l.endDate;
  }).length;

  // Average Weekly Attendance Calculation
  let totalRecords = 0;
  let presentRecords = 0;
  Object.keys(attendanceData).forEach(date => {
    const dayMatrix = attendanceData[date];
    Object.keys(dayMatrix).forEach(empId => {
      totalRecords++;
      if (dayMatrix[empId] === "Present") {
        presentRecords++;
      }
    });
  });
  const avgAttendancePercent = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 95;

  // Set Targets for Counters
  const counterTotalEl = document.getElementById("counter-total");
  const counterAttendanceEl = document.getElementById("counter-attendance");
  const counterLeaveEl = document.getElementById("counter-leave");
  const counterPayrollEl = document.getElementById("counter-payroll");

  if (counterTotalEl) counterTotalEl.setAttribute("data-target", totalEmployeesCount);
  if (counterAttendanceEl) counterAttendanceEl.setAttribute("data-target", avgAttendancePercent);
  if (counterLeaveEl) counterLeaveEl.setAttribute("data-target", onLeaveTodayCount);
  if (counterPayrollEl) counterPayrollEl.setAttribute("data-target", totalPayrollVal);

  // 2. Animated Counter System
  const animateCounters = () => {
    const counters = document.querySelectorAll(".counter-animate");
    const speed = 100; // lower is faster

    counters.forEach(counter => {
      const updateCount = () => {
        const target = parseInt(counter.getAttribute("data-target")) || 0;
        const count = parseInt(counter.textContent.replace(/,/g, "")) || 0;
        const increment = Math.ceil(target / speed) || 1;

        if (count < target) {
          counter.textContent = count + increment > target ? target.toLocaleString("en-IN") : (count + increment).toLocaleString("en-IN");
          setTimeout(updateCount, 15);
        } else {
          counter.textContent = target.toLocaleString("en-IN");
        }
      };
      updateCount();
    });
  };

  // Run counters animation immediately after loader fade-out
  setTimeout(animateCounters, 700);

  // 3. Render Department Ratios (Progress bars)
  const renderDepartmentRatios = () => {
    const container = document.getElementById("department-progress-container");
    if (!container) return;

    container.innerHTML = "";

    departments.forEach(dept => {
      const percentage = totalEmployeesCount > 0 ? Math.round((dept.count / totalEmployeesCount) * 100) : 0;
      
      const pGroup = document.createElement("div");
      pGroup.className = "progress-container";
      pGroup.innerHTML = `
        <div class="progress-header">
          <span>${dept.name} (${dept.count} staff)</span>
          <span>${percentage}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar" style="width: ${percentage}%;"></div>
        </div>
      `;
      container.appendChild(pGroup);
    });
  };

  renderDepartmentRatios();

  // 4. Print Trigger
  const printBtn = document.getElementById("btn-print-report");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // 5. ChartJS Visualizations
  
  // Theme aware Colors
  const isDarkMode = document.body.classList.contains("dark-mode");
  const accentColor = isDarkMode ? "#e2671b" : "#c4520a";
  const labelColor = isDarkMode ? "#efe8dc" : "#1a1510";
  const gridColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";

  // Setup Chart 1: Daily Status (Doughnut)
  const renderDailyStatusChart = () => {
    const canvas = document.getElementById("chart-daily-status");
    if (!canvas) return;

    // Estimate today's metrics
    const present = Math.max(0, totalEmployeesCount - onLeaveTodayCount - 1);
    const absent = Math.max(0, totalEmployeesCount - present - onLeaveTodayCount);

    new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: ["Present", "On Leave", "Absent"],
        datasets: [{
          data: [present, onLeaveTodayCount, absent],
          backgroundColor: ["#4a8c5c", "#4a72b5", "#a83232"],
          borderWidth: isDarkMode ? 1 : 1.5,
          borderColor: isDarkMode ? "#15120e" : "#ffffff"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: { family: "Bricolage Grotesque", size: 11 },
              color: labelColor
            }
          }
        }
      }
    });
  };

  // Setup Chart 2: Weekly Trends (Bar chart)
  const renderWeeklyTrendsChart = () => {
    const canvas = document.getElementById("chart-weekly-rate");
    if (!canvas) return;

    // Extract last 5 days from attendance matrix
    const dates = Object.keys(attendanceData).sort().slice(-5);
    const rates = dates.map(d => {
      const records = attendanceData[d];
      const total = Object.keys(records).length;
      const present = Object.values(records).filter(v => v === "Present").length;
      return total > 0 ? Math.round((present / total) * 100) : 100;
    });

    // Format date headers as short date (e.g. May 19)
    const formattedLabels = dates.map(d => {
      const parts = d.split('-');
      const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
      return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: formattedLabels.length > 0 ? formattedLabels : ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{
          label: "Attendance Rate %",
          data: rates.length > 0 ? rates : [95, 90, 85, 92, 95],
          backgroundColor: accentColor,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { font: { family: "Bricolage Grotesque" }, color: labelColor }
          },
          y: {
            min: 50,
            max: 100,
            grid: { color: gridColor },
            ticks: { font: { family: "Bricolage Grotesque" }, color: labelColor }
          }
        }
      }
    });
  };

  // Setup Chart 3: Leave Type Allocations (Horizontal Bar Chart)
  const renderLeaveAllocationChart = () => {
    const canvas = document.getElementById("chart-leave-allocation");
    if (!canvas) return;

    // Accumulate total days requested per leave type
    const categories = {
      "Casual Leave": 0,
      "Sick Leave": 0,
      "Earned Leave": 0,
      "Maternity Leave": 0,
      "Paternity Leave": 0
    };

    leaves.forEach(l => {
      if (categories[l.type] !== undefined) {
        categories[l.type] += l.days;
      }
    });

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: Object.keys(categories),
        datasets: [{
          data: Object.values(categories),
          backgroundColor: ["#c4520a", "#a83232", "#4a8c5c", "#4a72b5", "#8a7e74"],
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: "y", // Horizontal Bar Chart
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { font: { family: "Bricolage Grotesque" }, color: labelColor, stepSize: 1 }
          },
          y: {
            grid: { display: false },
            ticks: { font: { family: "Bricolage Grotesque" }, color: labelColor }
          }
        }
      }
    });
  };

  // Render Charts
  renderDailyStatusChart();
  renderWeeklyTrendsChart();
  renderLeaveAllocationChart();
});
