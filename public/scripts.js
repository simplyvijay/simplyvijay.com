mdb.Navbar.getInstance(document.querySelector('.navbar')).init();
var sidenavInstance = mdb.Sidenav.getInstance(document.querySelector('.sidenav'));

// Get all the links inside the sidenav
var sidenavLinks = document.querySelectorAll('.sidenav-link');
// Add event listener to each link
sidenavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        // Close the sidenav when a link is clicked
        sidenavInstance.hide();
    });
});

// Contact Form validation
const contactButton = document.getElementById('contactButton');
const name_input = document.getElementById('name_input');
const email_input = document.getElementById('email_input');
const message_input = document.getElementById('message_input');
const subject_input = document.getElementById('subject_input');

name_input.addEventListener('focusin', function () {
    name_input.classList.remove('is-invalid');
});

email_input.addEventListener('focusin', function () {
    email_input.classList.remove('is-invalid');
});

subject_input.addEventListener('focusin', function () {
    subject_input.classList.remove('is-invalid');
});

message_input.addEventListener('focusin', function () {
    message_input.classList.remove('is-invalid');
});

const isValidFullName = (name) => {
    const regex = /^[a-zA-Z\s'-]+$/;
    if(regex.test(name) && name.length >= 3) {
        return true;
    }
    name_input.classList.add('is-invalid');
    return false;
}

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(email) && email.length >= 3) {
        return true;
    }
    email_input.classList.add('is-invalid');
    return false;
}

const isValidSubject = (subject) => {

    if(subject.length >= 1) {
        return true;
    }
    subject_input.classList.add('is-invalid');
    return false;
}

const isValidMessage = (message) => {

    if(message.length >= 1) {
        return true;
    }
    message_input.classList.add('is-invalid');
    return false;
}

contactButton.addEventListener('click', function () {

    const name = name_input.value;
    const email = email_input.value;
    const subject = subject_input.value;
    const message = message_input.value;
    const status = document.getElementById('status');

    if(isValidFullName(name) && isValidEmail(email) && isValidSubject(subject) && isValidMessage(message)) {
        const form = document.getElementById('contactForm');
        const data = new FormData(form);
        const contactButtonContent = contactButton.innerHTML;
        contactButton.setAttribute('disabled', 'disabled');
        contactButton.innerHTML = '<span class="spinner-border spinner-border-sm text-black" role="status" aria-hidden="true"></span> Sending...';

        fetch("https://formspree.io/f/mzbnrway", {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset();
                contactButton.removeAttribute('disabled');
                contactButton.innerHTML = contactButtonContent;
                status.innerHTML = '<i class="fas fa-check-circle"></i> Message sent!';
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form"
                    }
                })
            }
        }).catch(() => {
            status.innerHTML = "Oops! There was a problem submitting your form"
        });
    }
});