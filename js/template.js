/* =========================================================
   JORDAN FERRARY
   DIGITAL ARCHIVE
   PROJECT TEMPLATE SYSTEM

   Funções:
   - Project image interaction
   - Universal image lightbox
   - Scroll zoom
   - Double-click zoom
   - Drag / Pan da imagem
   - ESC para fechar
   - Clique fora para fechar
   - Bloqueio de scroll da página

   Futuramente:
   - O sistema de Lightbox poderá ser separado
     para lightbox.js
   ========================================================= */


/* =========================================================
   01 — LIGHTBOX ELEMENTS
   ========================================================= */

const templateLightbox =
    document.querySelector("#imageLightbox");

const templateLightboxImage =
    document.querySelector("#lightboxImage");

const templateLightboxTitle =
    document.querySelector("#lightboxTitle");

const templateLightboxClose =
    document.querySelector(".lightbox-close");


/* =========================================================
   02 — PROJECT IMAGE BUTTONS
   ========================================================= */

const templateImageButtons =
    document.querySelectorAll(
        ".artwork-image-button"
    );


/* =========================================================
   03 — ZOOM STATE
   ========================================================= */

let lightboxZoom = 1;

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.15;


/* =========================================================
   04 — PAN STATE
   ========================================================= */

let isDragging = false;

let startX = 0;
let startY = 0;

let translateX = 0;
let translateY = 0;


/* =========================================================
   05 — APPLY IMAGE TRANSFORM
   ========================================================= */

function updateLightboxTransform() {

    if (!templateLightboxImage) {
        return;
    }


    templateLightboxImage.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${lightboxZoom})`;

}


/* =========================================================
   06 — RESET ZOOM
   ========================================================= */

function resetLightboxZoom() {

    lightboxZoom = 1;

    translateX = 0;
    translateY = 0;

    updateLightboxTransform();

}


/* =========================================================
   07 — OPEN LIGHTBOX
   ========================================================= */

function openTemplateLightbox(button) {

    if (
        !templateLightbox ||
        !templateLightboxImage ||
        !button
    ) {
        return;
    }


    const image =
        button.dataset.image;


    if (!image) {
        return;
    }


    const title =
        button.dataset.title || "";


    /* -----------------------------------------
       RESET ZOOM
       ----------------------------------------- */

    resetLightboxZoom();


    /* -----------------------------------------
       IMAGE
       ----------------------------------------- */

    templateLightboxImage.src =
        image;

    templateLightboxImage.alt =
        title || "Artwork preview";


    /* -----------------------------------------
       TITLE
       ----------------------------------------- */

    if (templateLightboxTitle) {

        templateLightboxTitle.textContent =
            title;

    }


    /* -----------------------------------------
       OPEN
       ----------------------------------------- */

    templateLightbox.classList.add(
        "active"
    );

    templateLightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    /* -----------------------------------------
       LOCK PAGE SCROLL
       ----------------------------------------- */

    document.body.classList.add(
        "lightbox-open"
    );

}


/* =========================================================
   08 — IMAGE BUTTON EVENTS
   ========================================================= */

templateImageButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openTemplateLightbox(button);

        }
    );

});


/* =========================================================
   09 — SCROLL ZOOM TO MOUSE POSITION
   ========================================================= */

if (templateLightboxImage) {

    templateLightboxImage.addEventListener(
        "wheel",
        event => {

            event.preventDefault();


            /* -----------------------------------------
               CURRENT ZOOM
               ----------------------------------------- */

            const oldZoom =
                lightboxZoom;


            /* -----------------------------------------
               NEW ZOOM
               ----------------------------------------- */

            if (event.deltaY < 0) {

                lightboxZoom += ZOOM_STEP;

            } else {

                lightboxZoom -= ZOOM_STEP;

            }


            lightboxZoom =
                Math.min(
                    MAX_ZOOM,
                    Math.max(
                        MIN_ZOOM,
                        lightboxZoom
                    )
                );


            /* -----------------------------------------
               IF ZOOM DID NOT CHANGE
               ----------------------------------------- */

            if (lightboxZoom === oldZoom) {
                return;
            }


            /* -----------------------------------------
               MOUSE POSITION
               ----------------------------------------- */

            const rect =
                templateLightboxImage.getBoundingClientRect();


            const mouseX =
                event.clientX - rect.left;

            const mouseY =
                event.clientY - rect.top;


            /* -----------------------------------------
               POSITION RELATIVE TO IMAGE CENTER
               ----------------------------------------- */

            const imageCenterX =
                rect.width / 2;

            const imageCenterY =
                rect.height / 2;


            const offsetX =
                mouseX - imageCenterX;

            const offsetY =
                mouseY - imageCenterY;


            /* -----------------------------------------
               ZOOM RATIO
               ----------------------------------------- */

            const zoomRatio =
                lightboxZoom / oldZoom;


            /* -----------------------------------------
               MOVE IMAGE TOWARD MOUSE
               ----------------------------------------- */

            translateX -=
                offsetX * (zoomRatio - 1);

            translateY -=
                offsetY * (zoomRatio - 1);


            /* -----------------------------------------
               RESET WHEN RETURNING TO 1X
               ----------------------------------------- */

            if (lightboxZoom === MIN_ZOOM) {

                translateX = 0;
                translateY = 0;

            }


            updateLightboxTransform();

        },
        {
            passive: false
        }
    );

}


/* =========================================================
   10 — CLICK ZOOM
   ========================================================= */

if (templateLightboxImage) {

    templateLightboxImage.addEventListener(
        "click",
        event => {

            /*
               Evita que o clique seja interpretado
               pelo sistema de fechamento.
            */

            event.stopPropagation();


            /* -----------------------------------------
               TOGGLE ZOOM
               ----------------------------------------- */

            if (lightboxZoom === 1) {

                lightboxZoom = 2;

            } else {

                lightboxZoom = 1;

                translateX = 0;
                translateY = 0;

            }


            updateLightboxTransform();

        }
    );

}


/* =========================================================
   11 — DRAG / PAN
   ========================================================= */

if (templateLightboxImage) {

    templateLightboxImage.addEventListener(
        "mousedown",
        event => {

            /*
               Só permite arrastar
               quando estiver ampliado.
            */

            if (lightboxZoom <= 1) {
                return;
            }


            isDragging = true;


            startX =
                event.clientX - translateX;

            startY =
                event.clientY - translateY;


            templateLightboxImage.style.cursor =
                "grabbing";

        }
    );


    window.addEventListener(
        "mousemove",
        event => {

            if (!isDragging) {
                return;
            }


            translateX =
                event.clientX - startX;

            translateY =
                event.clientY - startY;


            updateLightboxTransform();

        }
    );


    window.addEventListener(
        "mouseup",
        () => {

            isDragging = false;


            templateLightboxImage.style.cursor =
                "zoom-out";

        }
    );

}


/* =========================================================
   12 — CLOSE LIGHTBOX
   ========================================================= */

function closeTemplateLightbox() {

    if (!templateLightbox) {
        return;
    }


    templateLightbox.classList.remove(
        "active"
    );

    templateLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "lightbox-open"
    );


    resetLightboxZoom();


    setTimeout(() => {

        if (
            templateLightboxImage &&
            !templateLightbox.classList.contains("active")
        ) {

            templateLightboxImage.src = "";

        }

    }, 300);

}


/* =========================================================
   13 — CLOSE BUTTON
   ========================================================= */

if (templateLightboxClose) {

    templateLightboxClose.addEventListener(
        "click",
        closeTemplateLightbox
    );

}


/* =========================================================
   14 — CLICK OUTSIDE IMAGE
   ========================================================= */

if (templateLightbox) {

    templateLightbox.addEventListener(
        "click",
        event => {

            const clickedImage =
                event.target === templateLightboxImage;

            const clickedTitle =
                event.target === templateLightboxTitle;

            const clickedClose =
                event.target === templateLightboxClose;


            if (
                !clickedImage &&
                !clickedTitle &&
                !clickedClose
            ) {

                closeTemplateLightbox();

            }

        }
    );

}


/* =========================================================
   15 — ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            templateLightbox &&
            templateLightbox.classList.contains("active")
        ) {

            closeTemplateLightbox();

        }

    }
);


/* =========================================================
   16 — PREVENT IMAGE DRAG
   ========================================================= */

if (templateLightboxImage) {

    templateLightboxImage.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );

}


/* =========================================================
   17 — INITIAL STATE
   ========================================================= */

if (templateLightbox) {

    templateLightbox.classList.remove(
        "active"
    );

    templateLightbox.setAttribute(
        "aria-hidden",
        "true"
    );

}