/*==========================================================
                    CONFIGURATION
==========================================================*/

const API_BASE_URL = "http://localhost:5022/api/Shipments";


/*==========================================================
                    APPLICATION STATE
==========================================================*/

let shipments = [];
let filteredShipments = [];
let selectedShipment = null;


/*==========================================================
                    DOM ELEMENTS
==========================================================*/

// KPI

const totalCount = document.getElementById("totalCount");
const bookedCount = document.getElementById("bookedCount");
const transitCount = document.getElementById("transitCount");
const ofdCount = document.getElementById("ofdCount");
const deliveredCount = document.getElementById("deliveredCount");
const rtoCount = document.getElementById("rtoCount");

// Booking Form

const bookingForm = document.getElementById("bookingForm");

const awbNumber = document.getElementById("awbNumber");
const senderName = document.getElementById("senderName");
const receiverName = document.getElementById("receiverName");
const origin = document.getElementById("origin");
const destination = document.getElementById("destination");
const weightKg = document.getElementById("weightKg");

// Tracking

const trackAwb = document.getElementById("trackAwb");
const trackBtn = document.getElementById("trackBtn");
const trackingResult = document.getElementById("trackingResult");

// Dashboard

const shipmentTableBody = document.getElementById("shipmentTableBody");
const emptyTableState = document.getElementById("emptyTableState");

const statusFilter = document.getElementById("statusFilter");
const tableSearch = document.getElementById("tableSearch");

const tableRecordCount = document.getElementById("tableRecordCount");
const footerShipmentCount = document.getElementById("footerShipmentCount");

// Buttons

const refreshBtn = document.getElementById("refreshBtn");
const refreshDashboardBtn = document.getElementById("refreshDashboardBtn");

// Date Time

const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");

const lastUpdated = document.getElementById("lastUpdated");
const footerLastUpdated = document.getElementById("footerLastUpdated");

// Loading

const loadingOverlay = document.getElementById("loadingOverlay");

// Toast

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");
const toastClose = document.getElementById("toastClose");


/*==========================================================
                    API CLIENT
==========================================================*/

const api = {

    async get(url) {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(await response.text());

        }

        return await response.json();

    },

    async post(url, data) {

        const response = await fetch(url, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {

            throw new Error(await response.text());

        }

        return await response.json();

    },

    async put(url, data) {

        const response = await fetch(url, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {

            throw new Error(await response.text());

        }

        return await response.json();

    },

    async delete(url) {

        const response = await fetch(url, {

            method: "DELETE"

        });

        if (!response.ok) {

            throw new Error(await response.text());

        }

    }

};


/*==========================================================
                    LOADING
==========================================================*/

function showLoading() {

    loadingOverlay.classList.add("show");

}

function hideLoading() {

    loadingOverlay.classList.remove("show");

}


/*==========================================================
                    TOAST
==========================================================*/

let toastTimer;

function showToast(title, message, type = "success") {

    toast.className = "toast";

    if (type !== "success") {

        toast.classList.add(type);

    }

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

toastClose.addEventListener("click", () => {

    toast.classList.remove("show");

});


/*==========================================================
                    DATE & TIME
==========================================================*/

function updateDateTime() {

    const now = new Date();

    currentDate.textContent =
        now.toLocaleDateString("en-IN", {

            weekday: "short",

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

    currentTime.textContent =
        now.toLocaleTimeString("en-IN", {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        });

}


/*==========================================================
                LAST REFRESHED
==========================================================*/

function updateLastUpdated() {

    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {

        hour: "2-digit",

        minute: "2-digit"

    });

    lastUpdated.textContent = time;

    footerLastUpdated.textContent = time;

}


/*==========================================================
                INITIALIZATION
==========================================================*/

setInterval(updateDateTime, 1000);

updateDateTime();


/*==========================================================
                    STATUS CLASSES
==========================================================*/

const statusClasses = {

    "Booked": "status-badge badge-booked",

    "In Transit": "status-badge badge-transit",

    "Out for Delivery": "status-badge badge-ofd",

    "Delivered": "status-badge badge-delivered",

    "RTO": "status-badge badge-rto"

};


/*==========================================================
                    FORMAT DATE
==========================================================*/

function formatDate(date) {

    if (!date)
        return "-";

    return new Date(date).toLocaleString("en-IN", {

        day: "2-digit",

        month: "short",

        year: "numeric",

        hour: "2-digit",

        minute: "2-digit"

    });

}


/*==========================================================
                LOAD COMPLETE DASHBOARD
==========================================================*/

async function loadDashboard() {

    try {

        showLoading();

        await Promise.all([

            loadShipments(),

            loadStatistics()

        ]);

        tableSearch.value = "";

        statusFilter.value = "All";

        updateLastUpdated();

    }
    catch (error) {

        console.error(error);

        alert(error.message);

        showToast(
            "Error",
            error.message,
            "error"
        );

    }
    finally {

        hideLoading();

    }

}


/*==========================================================
                LOAD SHIPMENTS
==========================================================*/

async function loadShipments() {

    shipments = await api.get(API_BASE_URL);

    filteredShipments = [...shipments];

    applyStatusFilter();

}


/*==========================================================
                LOAD KPI
==========================================================*/

async function loadStatistics() {

    const stats = await api.get(`${API_BASE_URL}/stats`);

    totalCount.textContent = stats.total;

    bookedCount.textContent = stats.booked;

    transitCount.textContent = stats.inTransit;

    ofdCount.textContent = stats.outForDelivery;

    deliveredCount.textContent = stats.delivered;

    rtoCount.textContent = stats.rto;

}


/*==========================================================
                TABLE RENDERING
==========================================================*/

function renderShipmentTable(data) {

    shipmentTableBody.innerHTML = "";

    if (data.length === 0) {

        emptyTableState.style.display = "block";

        tableRecordCount.textContent = "0";

        footerShipmentCount.textContent = "0";

        return;

    }

    emptyTableState.style.display = "none";

    tableRecordCount.textContent = data.length;

    footerShipmentCount.textContent = data.length;

    let html = "";

    data.forEach(shipment => {

        html += createShipmentRow(shipment);

    });

    shipmentTableBody.innerHTML = html;

    lucide.createIcons();

}


/*==========================================================
                TABLE ROW
==========================================================*/

function createShipmentRow(shipment) {

    return `

<tr>

<td>${shipment.awbNumber}</td>

<td>${shipment.senderName}</td>

<td>${shipment.receiverName}</td>

<td>${shipment.origin} → ${shipment.destination}</td>

<td>${shipment.weightKg} Kg</td>

<td>

<span class="${statusClasses[shipment.status]}">

${shipment.status}

</span>

                            </td>

                            <td>${formatDate(shipment.bookedAt)}</td>

<td>

<select
    class="status-select"
    data-awb="${shipment.awbNumber}"
    onchange="updateShipmentStatus(this)">

    ${getStatusOptions(shipment.status)}

</select>

</td>

<td>

<button
    class="delete-btn"
    data-id="${shipment.shipmentId}"
    data-awb="${shipment.awbNumber}"
    onclick="deleteShipment(this)">

    <i data-lucide="trash-2"></i>

</button>

</td>

</tr>

`;

}


/*==========================================================
            STATUS DROPDOWN
==========================================================*/

function getStatusOptions(currentStatus) {

    const statuses = [

        "Booked",

        "In Transit",

        "Out for Delivery",

        "Delivered",

        "RTO"

    ];

    return statuses.map(status =>

        `<option
        value="${status}"
        ${status === currentStatus ? "selected" : ""}>
        ${status}
        </option>`

    ).join("");

}

async function updateShipmentStatus(select) {

    const awb = select.dataset.awb;

    const status = select.value;

    try {

        showLoading();

        const response = await fetch(

            `${API_BASE_URL}/${awb}/status`,

            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: status
                })
            }

        );

        hideLoading();

        if (!response.ok) {

            const error = await response.json();

            throw new Error(error.message || "Unable to update shipment.");

        }

        showToast(
            "Success",
            "Shipment status updated successfully."
        );

        await loadDashboard();

    }

    catch (error) {

        hideLoading();

        showToast(
            "Error",
            error.message
        );

    }

}
/*==========================================================
                    DELETE SHIPMENT
==========================================================*/

async function deleteShipment(button) {

    const shipmentId = button.dataset.id;

    const awb = button.dataset.awb;

    const confirmed = confirm(

        `Delete shipment ${awb} ?`

    );

    if (!confirmed)
        return;

    try {

        showLoading();

        const response = await fetch(

            `${API_BASE_URL}/${shipmentId}`,

            {
                method: "DELETE"
            }

        );

        if (!response.ok) {

            const error = await response.json();

            throw new Error(

                error.message ||

                "Unable to delete shipment."

            );

        }

        showToast(

            "Success",

            "Shipment deleted successfully."

        );

        await loadDashboard();

    }

    catch (error) {

        showToast(

            "Error",

            error.message,

            "error"

        );

    }

    finally {

        hideLoading();

    }

}
/*==========================================================
                INITIAL LOAD
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

});

/*==========================================================
                    BOOK SHIPMENT
==========================================================*/

bookingForm.addEventListener("submit", bookShipment);

async function bookShipment(e) {

    e.preventDefault();

    const shipment = {

        awbNumber: awbNumber.value.trim(),
        senderName: senderName.value.trim(),
        receiverName: receiverName.value.trim(),
        origin: origin.value.trim(),
        destination: destination.value.trim(),
        weightKg: parseFloat(weightKg.value)

    };

    // Validation

    if (
        shipment.awbNumber === "" ||
        shipment.senderName === "" ||
        shipment.receiverName === "" ||
        shipment.origin === "" ||
        shipment.destination === "" ||
        isNaN(shipment.weightKg)
    ) {

        showToast(
            "Validation",
            "Please fill all fields.",
            "error"
        );

        return;

    }

    if (shipment.weightKg <= 0) {

        showToast(
            "Validation",
            "Weight must be greater than zero.",
            "error"
        );

        return;

    }

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(shipment.senderName)) {
        showToast(
            "Validation",
            "Sender Name must contain only letters.",
            "error"
        );
        return;
    }

    if (!nameRegex.test(shipment.receiverName)) {
        showToast(
            "Validation",
            "Receiver Name must contain only letters.",
            "error"
        );
        return;
    }

    if (!nameRegex.test(shipment.origin)) {
        showToast(
            "Validation",
            "Origin must contain only letters.",
            "error"
        );
        return;
    }



    if (!nameRegex.test(shipment.destination)) {
        showToast(
            "Validation",
            "Destination must contain only letters.",
            "error"
        );
        return;
    }



    try {

        showLoading();

        await api.post(API_BASE_URL, shipment);

        showToast(
            "Success",
            "Shipment booked successfully."
        );

        bookingForm.reset();

        await loadDashboard();

    }
    catch (error) {

        showToast(
            "Booking Failed",
            error.message,
            "error"
        );

    }
    finally {

        hideLoading();

    }

}

/*==========================================================
                    TRACK SHIPMENT
==========================================================*/

trackBtn.addEventListener("click", trackShipment);

async function trackShipment() {

    const awb = trackAwb.value.trim();

    if (awb === "") {

        showToast(
            "Validation",
            "Enter an AWB Number.",
            "error"
        );

        return;

    }

    try {

        showLoading();

        const shipment = await api.get(`${API_BASE_URL}/${awb}`);

        selectedShipment = shipment;

        renderShipmentDetails(shipment);

    }
    catch {

        trackingResult.innerHTML = `

<h3>Shipment Not Found</h3>

<p>No shipment exists with this AWB.</p>

`;

    }
    finally {

        hideLoading();

    }

}
/*==========================================================
                RENDER SHIPMENT DETAILS
==========================================================*/

function renderShipmentDetails(shipment) {

    trackingResult.innerHTML = `

    <div class="shipment-track-widget">

        <div class="shipment-top">

            <h2>${shipment.awbNumber}</h2>

            <div class="shipment-route">

                <span>${shipment.senderName}</span>

                <i data-lucide="arrow-right"></i>

                <span>${shipment.receiverName}</span>

            </div>

            <div class="shipment-city">

                ${shipment.origin}

                <i data-lucide="move-right"></i>

                ${shipment.destination}

            </div>

        </div>

        ${renderTimeline(shipment.status)}

        <div class="shipment-bottom">

            <div>

                <small>Weight</small>

                <strong>${shipment.weightKg} Kg</strong>

            </div>

            <div>

                <small>Booked</small>

                <strong>${formatDate(shipment.bookedAt)}</strong>

            </div>

            <div>

                <small>Delivered</small>

                <strong>

                    ${shipment.deliveredAt
            ? formatDate(shipment.deliveredAt)
            : "Pending"}

                </strong>

            </div>

        </div>

    </div>

    `;

    lucide.createIcons();

}

function renderTimeline(status) {

    const steps = [

        "Booked",

        "In Transit",

        "Out for Delivery",

        "Delivered"

    ];

    const current = steps.indexOf(status);

    return `

    <div class="shipment-timeline">

        ${steps.map((step, index) => `

        <div class="timeline-item">

            <div class="timeline-circle ${index <= current ? "active" : ""}">

                ${index < current ? "✓" : ""}

            </div>

            <span>${step}</span>

        </div>

        ${index < steps.length - 1 ?

            `<div class="timeline-line ${index < current ? "active" : ""}"></div>`

            : ""}

        `).join("")}

    </div>

    `;

}

/*==========================================================
                    LIVE SEARCH
==========================================================*/

tableSearch.addEventListener("input", searchShipments);

function searchShipments() {

    const keyword = tableSearch.value
        .trim()
        .toLowerCase();

    filteredShipments = shipments.filter(shipment =>

        shipment.awbNumber.toLowerCase().includes(keyword) ||

        shipment.senderName.toLowerCase().includes(keyword) ||

        shipment.receiverName.toLowerCase().includes(keyword)

    );

    applyStatusFilter();

}

/*==========================================================
                    STATUS FILTER
==========================================================*/

statusFilter.addEventListener("change", applyStatusFilter);

function applyStatusFilter() {

    const selectedStatus = statusFilter.value;

    let result = [...filteredShipments];

    if (selectedStatus !== "All") {

        result = result.filter(

            shipment => shipment.status === selectedStatus

        );

    }

    renderShipmentTable(result);

}