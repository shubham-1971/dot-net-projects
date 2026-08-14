// Seed & LocalStorage Engine for workpeople (HRMS_Project)

const DEFAULT_DEPARTMENTS = [
  { id: "HR", name: "Human Resources", manager: "Suresh Iyer", extension: "x101", count: 1 },
  { id: "DEV", name: "Development", manager: "Rohan Mehta", extension: "x102", count: 2 },
  { id: "QA", name: "Testing", manager: "Priya Nair", extension: "x103", count: 1 },
  { id: "FIN", name: "Finance", manager: "Lohitha Gumm", extension: "x104", count: 1 },
  { id: "MKT", name: "Marketing", manager: "Kiran Desai", extension: "x105", count: 1 },
  { id: "SLS", name: "Sales", manager: "Kiran Desai", extension: "x106", count: 0 },
  { id: "OPS", name: "Operations", manager: "Ananya Sharma", extension: "x107", count: 0 }
];

const DEFAULT_EMPLOYEES = [
  {
    id: "WP-1001",
    name: "Ananya Sharma",
    department: "Development",
    role: "UX Designer",
    salary: 75000,
    joinDate: "2024-03-15",
    email: "ananya.sharma@workpeople.com",
    phone: "9876543210",
    avatar: "",
    status: "Active"
  }
  // ,
  // {
  //   id: "WP-1002",
  //   name: "Rohan Mehta",
  //   department: "Development",
  //   role: "Tech Lead",
  //   salary: 120000,
  //   joinDate: "2023-01-10",
  //   email: "rohan.mehta@workpeople.com",
  //   phone: "9876543211",
  //   avatar: "",
  //   status: "Active"
  // },
  // {
  //   id: "WP-1003",
  //   name: "Priya Nair",
  //   department: "Testing",
  //   role: "QA Automation",
  //   salary: 65000,
  //   joinDate: "2024-06-01",
  //   email: "priya.nair@workpeople.com",
  //   phone: "9876543212",
  //   avatar: "",
  //   status: "Active"
  // },
  // {
  //   id: "WP-1004",
  //   name: "Suresh Iyer",
  //   department: "Finance",
  //   role: "Accounts Lead",
  //   salary: 85000,
  //   joinDate: "2022-09-15",
  //   email: "suresh.iyer@workpeople.com",
  //   phone: "9876543213",
  //   avatar: "",
  //   status: "Active"
  // },
  // {
  //   id: "WP-1005",
  //   name: "Kiran Desai",
  //   department: "Marketing",
  //   role: "Growth Lead",
  //   salary: 90000,
  //   joinDate: "2025-02-20",
  //   email: "kiran.desai@workpeople.com",
  //   phone: "9876543214",
  //   avatar: "",
  //   status: "Active"
  // }
];

const DEFAULT_LEAVES = [
  { id: "L-101", employeeId: "WP-1001", employeeName: "Ananya Sharma", type: "Casual Leave", startDate: "2026-05-10", endDate: "2026-05-12", days: 3, reason: "Family event", status: "Approved" },
  // { id: "L-102", employeeId: "WP-1002", employeeName: "Rohan Mehta", type: "Sick Leave", startDate: "2026-05-15", endDate: "2026-05-15", days: 1, reason: "Fever", status: "Approved" },
  // { id: "L-103", employeeId: "WP-1003", employeeName: "Priya Nair", type: "Earned Leave", startDate: "2026-06-01", endDate: "2026-06-05", days: 5, reason: "Vacation", status: "Pending" },
  // { id: "L-104", employeeId: "WP-1004", employeeName: "Suresh Iyer", type: "Casual Leave", startDate: "2026-05-20", endDate: "2026-05-22", days: 3, reason: "Personal work", status: "Rejected" },
  // { id: "L-105", employeeId: "WP-1005", employeeName: "Kiran Desai", type: "Earned Leave", startDate: "2026-05-25", endDate: "2026-05-29", days: 5, reason: "Family trip", status: "Pending" },
  // { id: "L-106", employeeId: "WP-1001", employeeName: "Ananya Sharma", type: "Sick Leave", startDate: "2026-04-12", endDate: "2026-04-13", days: 2, reason: "Medical checkup", status: "Approved" },
  // { id: "L-107", employeeId: "WP-1002", employeeName: "Rohan Mehta", type: "Casual Leave", startDate: "2026-06-15", endDate: "2026-06-16", days: 2, reason: "Home renovation", status: "Pending" },
  // { id: "L-108", employeeId: "WP-1003", employeeName: "Priya Nair", type: "Sick Leave", startDate: "2026-05-18", endDate: "2026-05-19", days: 2, reason: "Migraine", status: "Approved" }
];

// Helper to generate attendance seed for past 5 days
// Mapped by date strings, e.g. {"2026-05-19": {"WP-1001": "Present", "WP-1002": "Present", ...}}
const generateAttendanceSeed = () => {
  const attendance = {};
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Don't skip weekends for simplicity in seed but make sure seed is filled
    attendance[dateStr] = {
      "WP-1001": "Present"
      // ,
      // "WP-1002": "Present",
      // "WP-1003": "Present",
      // "WP-1004": "Present",
      // "WP-1005": "Present"
    };
    
    // Add some realistic variations (leaves/absents)
    if (i === 1) attendance[dateStr]["WP-1003"] = "On Leave";
    if (i === 3) attendance[dateStr]["WP-1004"] = "Absent";
  }
  return attendance;
};

// Storage keys
const KEYS = {
  EMPLOYEES: "wp_employees",
  DEPARTMENTS: "wp_departments",
  LEAVES: "wp_leaves",
  ATTENDANCE: "wp_attendance",
  THEME: "wp_theme"
};

// Initialization functions
const initStorage = () => {
  if (!localStorage.getItem(KEYS.DEPARTMENTS)) {
    localStorage.setItem(KEYS.DEPARTMENTS, JSON.stringify(DEFAULT_DEPARTMENTS));
  }
  if (!localStorage.getItem(KEYS.EMPLOYEES)) {
    localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(DEFAULT_EMPLOYEES));
  }
  if (!localStorage.getItem(KEYS.LEAVES)) {
    localStorage.setItem(KEYS.LEAVES, JSON.stringify(DEFAULT_LEAVES));
  }
  if (!localStorage.getItem(KEYS.ATTENDANCE)) {
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(generateAttendanceSeed()));
  }
};

// Call immediately upon script load
initStorage();

// Data accessors
const StorageEngine = {
  getEmployees: () => {
    return JSON.parse(localStorage.getItem(KEYS.EMPLOYEES)) || [];
  },
  saveEmployees: (data) => {
    localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(data));
    StorageEngine.updateDepartmentCounts();
  },
  getDepartments: () => {
    return JSON.parse(localStorage.getItem(KEYS.DEPARTMENTS)) || [];
  },
  saveDepartments: (data) => {
    localStorage.setItem(KEYS.DEPARTMENTS, JSON.stringify(data));
  },
  getLeaves: () => {
    return JSON.parse(localStorage.getItem(KEYS.LEAVES)) || [];
  },
  saveLeaves: (data) => {
    localStorage.setItem(KEYS.LEAVES, JSON.stringify(data));
  },
  getAttendance: () => {
    return JSON.parse(localStorage.getItem(KEYS.ATTENDANCE)) || {};
  },
  saveAttendance: (data) => {
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(data));
  },
  getTheme: () => {
    return localStorage.getItem(KEYS.THEME) || "light";
  },
  saveTheme: (theme) => {
    localStorage.setItem(KEYS.THEME, theme);
  },
  
  // Re-calculate employee counts per department dynamically
  updateDepartmentCounts: () => {
    const employees = StorageEngine.getEmployees();
    const departments = StorageEngine.getDepartments();
    
    departments.forEach(dept => {
      dept.count = employees.filter(emp => emp.department.toLowerCase() === dept.name.toLowerCase() && emp.status === "Active").length;
    });
    
    localStorage.setItem(KEYS.DEPARTMENTS, JSON.stringify(departments));
  }
};
