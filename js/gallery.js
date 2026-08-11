/* =========================================================
   GALLERY FILTER
   ========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");

const galleryCards =
    document.querySelectorAll(".gallery-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;


        galleryCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================================================
   IMAGE LIGHTBOX
   ========================================================= */

const lightbox =
    document.querySelector("#imageLightbox");

const lightboxImage =
    document.querySelector("#lightboxImage");

const lightboxTitle =
    document.querySelector("#lightboxTitle");

const lightboxClose =
    document.querySelector(".lightbox-close");

const imageButtons =
    document.querySelectorAll(
        ".gallery-card-image-button"
    );


/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

imageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const image =
            button.dataset.image;

        const title =
            button.dataset.title;


        lightboxImage.src = image;

        lightboxImage.alt = title;

        lightboxTitle.textContent = title;


        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    });

});


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "lightbox-open"
    );


    setTimeout(() => {

        lightboxImage.src = "";

    }, 250);

}


/* CLOSE BUTTON */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* =========================================================
   CLICK OUTSIDE IMAGE
   ========================================================= */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {

            closeLightbox();

        }

    }
);