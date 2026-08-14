/* AUTO SELECT EVENT */

const selectedEvent =
JSON.parse(
    localStorage.getItem("selectedEvent")
);

if(selectedEvent)
{
    document.getElementById("event").value =
    selectedEvent.title;
}


/* FORM */

const form =
document.getElementById("registrationForm");


/* VALIDATION */

function setError(input, message)
{
    input.classList.add("input-error");

    input.nextElementSibling.innerText =
    message;
}

function clearError(input)
{
    input.classList.remove("input-error");

    input.nextElementSibling.innerText = "";
}


/* SUBMIT */

form.addEventListener("submit", function(event)
{
    event.preventDefault();

    const name =
    document.getElementById("name");

    const email =
    document.getElementById("email");

    const phone =
    document.getElementById("phone");

    const college =
    document.getElementById("college");

    const eventField =
    document.getElementById("event");

    const date =
    document.getElementById("date");

    const gender =
document.querySelector(
    'input[name="gender"]:checked'
);

    let isValid = true;


    /* RESET ERRORS */

    [
        name,
        email,
        phone,
        college,
        eventField,
        date
    ].forEach(field =>
    {
        clearError(field);
    });


    /* VALIDATIONS */

    if(name.value.trim() === "")
    {
        setError(name, "Full name required");
        isValid = false;
    }

    if(email.value.trim() === "")
    {
        setError(email, "Email required");
        isValid = false;
    }

    if(phone.value.trim() === "")
    {
        setError(phone, "Phone required");
        isValid = false;
    }

    if(college.value.trim() === "")
    {
        setError(college, "College required");
        isValid = false;
    }

    if(eventField.value.trim() === "")
    {
        setError(eventField, "Select event");
        isValid = false;
    }

    if(date.value.trim() === "")
    {
        setError(date, "Date required");
        isValid = false;
    }

    if(!gender)
    {
        document.getElementById(
            "genderError"
        ).innerText =
        "Select gender";

        isValid = false;
    }
    else
    {
        document.getElementById(
            "genderError"
        ).innerText = "";
    }

    /* STOP SUBMIT */

    if(!isValid)
    {
        return;
    }


    /* EVENT OBJECT */

    const selectedEventData =
    selectedEvent || {

        title: eventField.value,

        category: "Workshop",

        date: date.value,

        location: "Campus",

        emoji: "🎓",

        description:
        "Event Registration",

        gradient:
        "linear-gradient(135deg,#ff9f1c,#ff4d6d)"
    };


    /* REGISTRATION */

    const registration = {

        name: name.value,

        email: email.value,

        phone: phone.value,

        college: college.value,

        date: date.value,

        event: selectedEventData
    };


    /* STORAGE */

    let registrations =
    JSON.parse(
        localStorage.getItem("registrations")
    ) || [];


    /* CHECK DUPLICATE */

    const alreadyRegistered =
    registrations.some(item =>

        item.email === email.value

        &&

        item.event.title ===
        selectedEventData.title
    );


    if(alreadyRegistered)
    {
        setError(
            eventField,
            "Already registered for this event"
        );

        return;
    }
    registrations.push(registration);


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    localStorage.setItem(
        "currentUserEmail",
        email.value
    );


    window.location.href =
    "dashboard.html";
});