/* STORAGE */

const registrations =
JSON.parse(
    localStorage.getItem("registrations")
) || [];


const currentUserEmail =
localStorage.getItem(
    "currentUserEmail"
);


/* FILTER USER */

const myRegistrations =
registrations.filter(item =>

    item.email === currentUserEmail
);


/* NO USER */

if(myRegistrations.length === 0)
{
    window.location.href =
    "register.html";
}


/* USER */

const user =
myRegistrations[0];


/* WELCOME */

document.getElementById(
    "welcomeName"
).innerText =
user.name;


document.getElementById(
    "dashboardUserName"
).innerText =
user.name;


document.getElementById(
    "dashboardUserEmail"
).innerText =
user.email;


/* COUNT */

document.getElementById(
    "registrationCount"
).innerText =
myRegistrations.length;


/* GRID */

const dashboardGrid =
document.getElementById(
    "dashboardGrid"
);


/* CARDS */

myRegistrations.forEach(item =>
{
    const event = item.event;

    const card =
    document.createElement("div");

    card.classList.add("event-card");

    card.innerHTML = `

        <div class="event-thumb">

            <div class="event-thumb-bg"
                 style="background:${event.gradient}">
            </div>

            <div class="event-cat-badge">
                ${event.category}
            </div>

            <div class="event-seats-badge">
                REGISTERED
            </div>

            <div class="event-thumb-emoji">
                ${event.emoji}
            </div>

        </div>

        <div class="event-body">

            <h3 class="event-title">
                ${event.title}
            </h3>

            <p class="event-desc">
                ${event.description}
            </p>

            <div class="event-meta">

                <div class="event-meta-item">

                    <i class="fa-solid fa-calendar"></i>

                    ${event.date}

                </div>

                <div class="event-meta-item">

                    <i class="fa-solid fa-location-dot"></i>

                    ${event.location}

                </div>

            </div>

        </div>

        <div class="event-footer">

            <div class="event-price free">
                REGISTERED
            </div>

        </div>
    `;

    dashboardGrid.appendChild(card);
});