/* =========================================================
   JORDAN FERRARY
   DIGITAL ARCHIVE
   GALLERY SYSTEM

   Funções:
   - Gallery Filter
   - Universal Image Lightbox
   - Gallery Cards
   - Artwork Project Pages
   - Scroll Zoom
   - Zoom to Mouse Position
   - Click Zoom
   - Image Pan / Drag
   - ESC para fechar
   - Clique fora para fechar
   - Bloqueio de scroll durante o lightbox

   Compatível com:
   .gallery-card-image-button
   .artwork-image-button

   IMPORTANTE:
   Este arquivo continua sendo independente do template.js.
   ========================================================= */


/* =========================================================
   01 — GALLERY FILTER
   ========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");

const galleryCards =
    document.querySelectorAll(".gallery-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active dos outros botões */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        /* Ativa botão atual */

        button.classList.add("active");


        /* Obtém categoria */

        const filter =
            button.dataset.filter;


        /* Filtra cards */

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
   02 — LIGHTBOX ELEMENTS
   ========================================================= */

const lightbox =
    document.querySelector("#imageLightbox");

const lightboxImage =
    document.querySelector("#lightboxImage");

const lightboxTitle =
    document.querySelector("#lightboxTitle");

const lightboxClose =
    document.querySelector(".lightbox-close");


/* =========================================================
   03 — UNIVERSAL IMAGE BUTTONS
   ========================================================= */

/*
   O sistema aceita os dois formatos:

   Gallery:
   .gallery-card-image-button

   Project / Artwork:
   .artwork-image-button
*/

const imageButtons =
    document.querySelectorAll(
        ".gallery-card-image-button, .artwork-image-button"
    );


/* =========================================================
   04 — ZOOM STATE
   ========================================================= */

let lightboxZoom = 1;

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.15;


/* =========================================================
   05 — PAN STATE
   ========================================================= */

let translateX = 0;
let translateY = 0;

let isDragging = false;

let startX = 0;
let startY = 0;


/* =========================================================
   06 — APPLY TRANSFORM
   ========================================================= */

function updateLightboxTransform() {

    if (!lightboxImage) {
        return;
    }


    lightboxImage.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${lightboxZoom})`;

}


/* =========================================================
   07 — RESET ZOOM
   ========================================================= */

function resetLightboxZoom() {

    lightboxZoom = 1;

    translateX = 0;
    translateY = 0;

    isDragging = false;

    if (lightboxImage) {

        lightboxImage.style.transform =
            "translate(0px, 0px) scale(1)";

        lightboxImage.style.cursor =
            "zoom-out";

    }

}


/* =========================================================
   08 — OPEN LIGHTBOX
   ========================================================= */

function openLightbox(button) {

    /* Segurança */

    if (
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    /* Recupera informações */

    const image =
        button.dataset.image;

    const title =
        button.dataset.title || "";


    /*
       Sem imagem definida,
       não tenta abrir.
    */

    if (!image) {
        return;
    }


    /* -----------------------------------------
       RESET ZOOM
       ----------------------------------------- */

    resetLightboxZoom();


    /* -----------------------------------------
       Define imagem
       ----------------------------------------- */

    lightboxImage.src =
        image;


    /* -----------------------------------------
       Define acessibilidade
       ----------------------------------------- */

    lightboxImage.alt =
        title || "Artwork preview";


    /* -----------------------------------------
       Define título
       ----------------------------------------- */

    if (lightboxTitle) {

        lightboxTitle.textContent =
            title;

    }


    /* -----------------------------------------
       Abre lightbox
       ----------------------------------------- */

    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
       Impede a página de continuar
       rolando enquanto o lightbox
       estiver aberto.
    */

    document.body.classList.add(
        "lightbox-open"
    );

}


/* =========================================================
   09 — BUTTON EVENTS
   ========================================================= */

imageButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openLightbox(button);

        }
    );

});


/* =========================================================
   10 — SCROLL ZOOM TO MOUSE
   ========================================================= */

if (lightboxImage) {

    lightboxImage.addEventListener(
        "wheel",
        event => {

            event.preventDefault();


            /* -----------------------------------------
               ZOOM ATUAL
               ----------------------------------------- */

            const oldZoom =
                lightboxZoom;


            /* -----------------------------------------
               NOVO ZOOM
               ----------------------------------------- */

            if (event.deltaY < 0) {

                lightboxZoom += ZOOM_STEP;

            } else {

                lightboxZoom -= ZOOM_STEP;

            }


            /* -----------------------------------------
               LIMITA ZOOM
               ----------------------------------------- */

            lightboxZoom =
                Math.min(
                    MAX_ZOOM,
                    Math.max(
                        MIN_ZOOM,
                        lightboxZoom
                    )
                );


            /*
               Se o zoom não mudou,
               não precisa recalcular.
            */

            if (lightboxZoom === oldZoom) {
                return;
            }


            /* -----------------------------------------
               POSIÇÃO DA IMAGEM
               ----------------------------------------- */

            const rect =
                lightboxImage.getBoundingClientRect();


            const mouseX =
                event.clientX - rect.left;

            const mouseY =
                event.clientY - rect.top;


            const imageCenterX =
                rect.width / 2;

            const imageCenterY =
                rect.height / 2;


            const offsetX =
                mouseX - imageCenterX;

            const offsetY =
                mouseY - imageCenterY;


            /* -----------------------------------------
               RATIO DO ZOOM
               ----------------------------------------- */

            const zoomRatio =
                lightboxZoom / oldZoom;


            /* -----------------------------------------
               MANTÉM O MOUSE COMO REFERÊNCIA
               ----------------------------------------- */

            translateX -=
                offsetX * (zoomRatio - 1);

            translateY -=
                offsetY * (zoomRatio - 1);


            /* -----------------------------------------
               RESET EM 1X
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
   11 — CLICK ZOOM
   ========================================================= */

if (lightboxImage) {

    lightboxImage.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            /* -----------------------------------------
               1X → 2X
               ----------------------------------------- */

            if (lightboxZoom === 1) {

                lightboxZoom = 2;

            }


            /* -----------------------------------------
               2X+ → 1X
               ----------------------------------------- */

            else {

                lightboxZoom = 1;

                translateX = 0;
                translateY = 0;

            }


            updateLightboxTransform();

        }
    );

}


/* =========================================================
   12 — DRAG / PAN
   ========================================================= */

if (lightboxImage) {

    lightboxImage.addEventListener(
        "mousedown",
        event => {

            /*
               Só permite pan quando
               estiver ampliado.
            */

            if (lightboxZoom <= 1) {
                return;
            }


            isDragging = true;


            startX =
                event.clientX - translateX;

            startY =
                event.clientY - translateY;


            lightboxImage.style.cursor =
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


            if (lightboxImage) {

                lightboxImage.style.cursor =
                    lightboxZoom > 1
                        ? "grab"
                        : "zoom-out";

            }

        }
    );

}


/* =========================================================
   13 — CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    if (!lightbox) {
        return;
    }


    /* Fecha */

    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    /* Libera scroll */

    document.body.classList.remove(
        "lightbox-open"
    );


    /* Reseta zoom */

    resetLightboxZoom();


    /*
       Limpa a imagem depois da
       transição do lightbox.
    */

    setTimeout(() => {

        if (
            lightboxImage &&
            !lightbox.classList.contains("open")
        ) {

            lightboxImage.src = "";

        }

    }, 250);

}


/* =========================================================
   14 — CLOSE BUTTON
   ========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* =========================================================
   15 — CLICK OUTSIDE IMAGE
   ========================================================= */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            const clickedImage =
                event.target === lightboxImage;

            const clickedTitle =
                event.target === lightboxTitle;

            const clickedClose =
                event.target === lightboxClose;


            /*
               Qualquer área que não seja
               imagem, título ou botão fecha.
            */

            if (
                !clickedImage &&
                !clickedTitle &&
                !clickedClose
            ) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   16 — ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("open")
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   17 — PREVENT IMAGE DRAG
   ========================================================= */

if (lightboxImage) {

    lightboxImage.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );

}


/* =========================================================
   18 — INITIAL LIGHTBOX STATE
   ========================================================= */

if (lightbox) {

    lightbox.classList.remove(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

}