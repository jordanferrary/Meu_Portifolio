const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && sidebar) {

menuToggle.addEventListener("click", () => {

    const isOpen = sidebar.classList.toggle("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});

}

navLinks.forEach(link => {

link.addEventListener("click", () => {

    navLinks.forEach(item => {
        item.classList.remove("active");
    });

    link.classList.add("active");

    if (window.innerWidth <= 760 && menuToggle && sidebar) {

        sidebar.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});

});

const sections = document.querySelectorAll(
"section[id]"
);

if ("IntersectionObserver" in window) {

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const id = entry.target.id;

            navLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );

            });

        });

    },
    {
        threshold: 0.35
    }
);


sections.forEach(section => {
    observer.observe(section);
});

}