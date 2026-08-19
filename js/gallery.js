/* =========================================================
   JORDAN FERRARY
   DIGITAL ARCHIVE
   GALLERY SYSTEM
   ---------------------------------------------------------
   Funções:
   - Gallery Filter
   - Universal Image Lightbox
   - Artwork Project Pages
   - Gallery Cards
   - ESC para fechar
   - Clique fora para fechar
   - Bloqueio de scroll durante o lightbox

   Compatível com:
   .gallery-card-image-button
   .artwork-image-button
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

   Isso permite que o mesmo gallery.js
   funcione em diferentes templates.
*/

const imageButtons =
    document.querySelectorAll(
        ".gallery-card-image-button, .artwork-image-button"
    );



/* =========================================================
   04 — OPEN LIGHTBOX
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


    /* Define imagem */

    lightboxImage.src =
        image;


    /* Define acessibilidade */

    lightboxImage.alt =
        title || "Artwork preview";


    /* Define título */

    if (lightboxTitle) {

        lightboxTitle.textContent =
            title;

    }


    /* Abre lightbox */

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
   05 — BUTTON EVENTS
   ========================================================= */

imageButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            /*
               Impede comportamento padrão
               caso o botão tenha alguma
               ação adicional.
            */

            event.preventDefault();


            openLightbox(button);

        }
    );

});



/* =========================================================
   06 — CLOSE LIGHTBOX
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


    /*
       Limpa a imagem depois da
       transição do lightbox.
    */

    setTimeout(() => {

        if (lightboxImage) {

            lightboxImage.src = "";

        }

    }, 250);

}



/* =========================================================
   07 — CLOSE BUTTON
   ========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}



/* =========================================================
   08 — CLICK OUTSIDE IMAGE
   ========================================================= */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            /*
               Só fecha quando o clique
               acontece no fundo do lightbox.

               Clique na imagem não fecha.
            */

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}



/* =========================================================
   09 — ESC KEY
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
   10 — PREVENT IMAGE DRAG
   ========================================================= */

/*
   Evita que o usuário arraste a imagem
   acidentalmente enquanto interage
   com o lightbox.
*/

if (lightboxImage) {

    lightboxImage.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );

}



/* =========================================================
   11 — LIGHTBOX STATE
   ========================================================= */

/*
   Garante que o lightbox nunca fique
   travado aberto caso a página seja
   carregada novamente.
*/

if (lightbox) {

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

}