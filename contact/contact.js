/* =========================================================
JORDAN FERRARY // CONTACT SYSTEM
========================================================= */

const contactForm =
document.getElementById("contactForm");

const formStatus =
document.getElementById("formStatus");

if (contactForm) {

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const formData =
            new FormData(contactForm);


        const name =
            formData.get("name");

        const email =
            formData.get("email");

        const project =
            formData.get("project");

        const message =
            formData.get("message");


        /*
         * DESTINATION
         */

        const destination =
            "jordan.ferrary.me@gmail.com";


        /*
         * SUBJECT
         */

        const subject =
            `PROJECT INQUIRY // ${project}`;


        /*
         * MESSAGE
         */

        const body =

`Hello Jordan,

NAME:
${name}

EMAIL:
${email}

PROJECT TYPE:
${project}

MESSAGE:
${message}

---

Sent through
JORDAN FERRARY // DIGITAL ARCHIVE`;

        /*
         * MAILTO
         */

        const mailto =
            `mailto:${destination}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        /*
         * STATUS
         */

        formStatus.textContent =
            "TRANSMISSION READY // OPENING MAIL CLIENT...";


        /*
         * OPEN EMAIL
         */

        window.location.href =
            mailto;

    }
);

}