/* =========================================================
   JORDAN FERRARY // DIGITAL ARCHIVE
   MAIN INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                sidebar.classList.toggle("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }


    /* =====================================================
       NAVIGATION
       ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");


            /* Close mobile menu */

            if (window.innerWidth <= 760 && sidebar) {

                sidebar.classList.remove("menu-open");

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        });

    });


    /* =====================================================
       ACTIVE SECTION DETECTION
       ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const currentId =
                        entry.target.id;


                    navLinks.forEach(link => {

                        const target =
                            link.getAttribute("href");


                        link.classList.toggle(
                            "active",
                            target === `#${currentId}`
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


    /* =====================================================
       CLOSE MENU WHEN RESIZING
       ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 760 &&
            sidebar
        ) {

            sidebar.classList.remove("menu-open");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });

});