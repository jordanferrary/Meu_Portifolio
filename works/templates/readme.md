# JORDAN FERRARY
# DIGITAL ARCHIVE
## ARTWORK TEMPLATE SYSTEM

Sistema modular para criação de páginas de projetos,
artworks, estudos, processos e case studies.

A proposta deste sistema é permitir que cada projeto
tenha uma apresentação diferente sem perder a identidade
visual do DIGITAL ARCHIVE.

---

# 01 // FILOSOFIA DO SISTEMA

O template não deve limitar a apresentação da obra.

Cada projeto pode escolher a estrutura que melhor
representa seu conteúdo.

Exemplo:

ARTWORK 001
→ FULLSCREEN

ARTWORK 002
→ IMAGE LEFT / TEXT RIGHT

ARTWORK 003
→ GALLERY

ARTWORK 004
→ PROCESS

ARTWORK 005
→ CASE STUDY

ARTWORK 006
→ FULLSCREEN / TEXT LEFT


A identidade visual permanece consistente através de:

- Tipografia
- Espaçamento
- Cores
- Bordas
- Grid
- Microinterações
- Sistema de navegação
- Sistema de zoom
- Elementos gráficos
- Responsividade


O HTML define:

ESTRUTURA
ORDEM
HIERARQUIA
CONTEÚDO


O CSS define:

CORES
TIPOGRAFIA
ESPAÇAMENTO
GRID
BORDAS
MOLDURAS
ANIMAÇÕES
HOVER
RESPONSIVIDADE
EFEITOS


O JavaScript define:

ZOOM
LIGHTBOX
INTERAÇÕES
NAVEGAÇÃO DINÂMICA
COMPORTAMENTOS


Não coloque estilos diretamente no HTML.

EVITAR:

style="width: 50%"


PREFERIR:

class="artwork-image"


---

# 02 // SISTEMA DE IMAGENS

Todas as imagens que devem possuir zoom
devem utilizar o componente:

.image-viewer


O sistema de zoom não deve depender
do template utilizado.

Isso significa que:

IMAGE LEFT
IMAGE RIGHT
FULLSCREEN
GALLERY
PROCESS
CASE STUDY

podem utilizar exatamente o mesmo sistema.


---

# IMAGE VIEWER

Estrutura recomendada:

<div class="image-viewer">

    <button
        class="image-viewer-trigger"
        type="button"
        data-image="images/artwork.jpg"
        data-title="PROJECT TITLE"
        aria-label="Open PROJECT TITLE"
    >

        <img
            src="images/artwork.jpg"
            alt="Descrição da obra"
            class="image-viewer-image"
        >

        <span class="image-zoom-indicator">
            ⊕
        </span>

    </button>

</div>


O JavaScript identifica:

.image-viewer-trigger


e utiliza:

data-image

data-title


para abrir a imagem no Lightbox.


---

# 03 // LIGHTBOX

O Lightbox deve existir apenas uma vez
na página.

Não crie um Lightbox para cada imagem.

O componente global deve ficar no final do HTML:

<div
    class="image-lightbox"
    id="imageLightbox"
    aria-hidden="true"
>

    <button
        class="lightbox-close"
        type="button"
        aria-label="Close image preview"
    >
        ×
    </button>


    <div class="lightbox-content">

        <img
            src=""
            alt=""
            class="lightbox-image"
            id="lightboxImage"
        >

        <div
            class="lightbox-title"
            id="lightboxTitle"
        ></div>

    </div>

</div>


Qualquer imagem que possua:

.image-viewer-trigger


pode abrir esse mesmo Lightbox.


---

# 04 // TEMPLATE 01
# IMAGE LEFT / TEXT RIGHT

## Quando usar

Ideal para apresentar uma obra principal acompanhada
de informações sobre o projeto.

Distribuição:

IMAGE
55%

TEXT
45%


Estrutura:

+----------------------------------------------+
|                                              |
|  +------------------+   +-----------------+ |
|  |                  |   |                 | |
|  |                  |   |      TITLE      | |
|  |      IMAGE       |   |                 | |
|  |                  |   |   DESCRIPTION   | |
|  |                  |   |                 | |
|  +------------------+   +-----------------+ |
|                                              |
+----------------------------------------------+


## HTML

<section class="artwork-split">

    <div class="artwork-image">

        <div class="image-viewer">

            <button
                class="image-viewer-trigger"
                type="button"
                data-image="images/artwork.jpg"
                data-title="PROJECT TITLE"
                aria-label="Open PROJECT TITLE"
            >

                <img
                    src="images/artwork.jpg"
                    alt="Descrição da obra"
                    class="image-viewer-image"
                >

                <span class="image-zoom-indicator">
                    ⊕
                </span>

            </button>

        </div>

    </div>


    <div class="artwork-description">

        <span class="eyebrow">
            DIGITAL ART // 01
        </span>

        <h2>
            PROJECT TITLE
        </h2>

        <p>
            Descrição da obra, conceito,
            inspiração e contexto do projeto.
        </p>


        <div class="project-meta">

            <span>
                CATEGORY
            </span>

            <strong>
                DIGITAL PAINTING
            </strong>


            <span>
                YEAR
            </span>

            <strong>
                2026
            </strong>

        </div>

    </div>

</section>


---

# 05 // TEMPLATE 02
# TEXT LEFT / IMAGE RIGHT

Utiliza exatamente a mesma estrutura
do Template 01.

A diferença é a classe:

reverse


## HTML

<section class="artwork-split reverse">

    <div class="artwork-image">

        <div class="image-viewer">

            <button
                class="image-viewer-trigger"
                type="button"
                data-image="images/artwork.jpg"
                data-title="PROJECT TITLE"
                aria-label="Open PROJECT TITLE"
            >

                <img
                    src="images/artwork.jpg"
                    alt="Descrição da obra"
                    class="image-viewer-image"
                >

                <span class="image-zoom-indicator">
                    ⊕
                </span>

            </button>

        </div>

    </div>


    <div class="artwork-description">

        <span class="eyebrow">
            DIGITAL ART // 02
        </span>

        <h2>
            PROJECT TITLE
        </h2>

        <p>
            Apresente aqui o conceito,
            processo criativo e objetivo
            da obra.
        </p>


        <div class="project-meta">

            <span>
                SOFTWARE
            </span>

            <strong>
                PHOTOSHOP
            </strong>


            <span>
                YEAR
            </span>

            <strong>
                2026
            </strong>

        </div>

    </div>

</section>


A classe:

reverse

inverte automaticamente a composição.


---

# 06 // TEMPLATE 03
# FULLSCREEN

## Quando usar

Para obras visualmente fortes onde a imagem
deve ser o elemento dominante da página.

Ideal para:

- Renders
- Ilustrações finais
- Keyframes
- Concept Art
- Imagens cinematográficas


## HTML

<section class="artwork-fullscreen">

    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/artwork.jpg"
            data-title="PROJECT TITLE"
            aria-label="Open PROJECT TITLE"
        >

            <img
                src="images/artwork.jpg"
                alt="Descrição da obra"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>

</section>


---

# 07 // TEMPLATE 04
# FULLSCREEN + TEXT RIGHT

A imagem domina a composição.

O texto funciona como informação secundária.

Ideal para:

- Artwork final
- Key Art
- Concept Art
- Renders cinematográficos


## HTML

<section class="artwork-fullscreen-overlay">

    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/artwork.jpg"
            data-title="PROJECT TITLE"
            aria-label="Open PROJECT TITLE"
        >

            <img
                src="images/artwork.jpg"
                alt="Descrição da obra"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <div class="fullscreen-info right">

        <span class="eyebrow">
            DIGITAL ART // 01
        </span>

        <h2>
            PROJECT TITLE
        </h2>

        <p>
            Pequena descrição da obra,
            conceito ou contexto visual.
        </p>

    </div>

</section>


---

# 08 // TEMPLATE 05
# FULLSCREEN + TEXT LEFT

Mesma lógica do Template 04.

O conteúdo é posicionado à esquerda.


## HTML

<section class="artwork-fullscreen-overlay">

    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/artwork.jpg"
            data-title="PROJECT TITLE"
            aria-label="Open PROJECT TITLE"
        >

            <img
                src="images/artwork.jpg"
                alt="Descrição da obra"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <div class="fullscreen-info left">

        <span class="eyebrow">
            DIGITAL ART // 02
        </span>

        <h2>
            PROJECT TITLE
        </h2>

        <p>
            Descrição breve do projeto,
            intenção artística e contexto.
        </p>

    </div>

</section>


---

# 09 // TEMPLATE 06
# GALLERY + TEXT LEFT

## Quando usar

Para apresentar várias imagens relacionadas
à mesma obra.

Ideal para:

- Estudos
- Renders
- Variações
- Desenvolvimento visual
- Diferentes ângulos
- Detalhes


Distribuição:

MAIN IMAGE
65%

SECONDARY
35%


A coluna secundária contém duas imagens
empilhadas.


## HTML

<section class="artwork-gallery-layout">

    <div class="gallery-description">

        <span class="eyebrow">
            VISUAL DEVELOPMENT
        </span>

        <h2>
            PROJECT GALLERY
        </h2>

        <p>
            Seleção de imagens relacionadas
            ao desenvolvimento deste projeto.
        </p>

    </div>


    <div class="artwork-gallery">

        <div class="gallery-main">

            <div class="image-viewer">

                <button
                    class="image-viewer-trigger"
                    type="button"
                    data-image="images/image-01.jpg"
                    data-title="PROJECT GALLERY // 01"
                    aria-label="Open image 01"
                >

                    <img
                        src="images/image-01.jpg"
                        alt="Imagem principal do projeto"
                        class="image-viewer-image"
                    >

                    <span class="image-zoom-indicator">
                        ⊕
                    </span>

                </button>

            </div>

        </div>


        <div class="gallery-secondary">

            <div class="image-viewer">

                <button
                    class="image-viewer-trigger"
                    type="button"
                    data-image="images/image-02.jpg"
                    data-title="PROJECT GALLERY // 02"
                    aria-label="Open image 02"
                >

                    <img
                        src="images/image-02.jpg"
                        alt="Imagem secundária 01"
                        class="image-viewer-image"
                    >

                    <span class="image-zoom-indicator">
                        ⊕
                    </span>

                </button>

            </div>


            <div class="image-viewer">

                <button
                    class="image-viewer-trigger"
                    type="button"
                    data-image="images/image-03.jpg"
                    data-title="PROJECT GALLERY // 03"
                    aria-label="Open image 03"
                >

                    <img
                        src="images/image-03.jpg"
                        alt="Imagem secundária 02"
                        class="image-viewer-image"
                    >

                    <span class="image-zoom-indicator">
                        ⊕
                    </span>

                </button>

            </div>

        </div>

    </div>

</section>


---

# 10 // TEMPLATE 07
# GALLERY + TEXT RIGHT

Utiliza a mesma estrutura do Template 06.

Adicionar:

reverse


## HTML

<section class="artwork-gallery-layout reverse">

    <div class="gallery-description">

        <span class="eyebrow">
            VISUAL DEVELOPMENT
        </span>

        <h2>
            PROJECT GALLERY
        </h2>

        <p>
            Estudos visuais, testes,
            variações e desenvolvimento
            da obra.
        </p>

    </div>


    <div class="artwork-gallery">

        <div class="gallery-main">

            <div class="image-viewer">

                <button
                    class="image-viewer-trigger"
                    type="button"
                    data-image="images/image-01.jpg"
                    data-title="PROJECT GALLERY // 01"
                    aria-label="Open image 01"
                >

                    <img
                        src="images/image-01.jpg"
                        alt="Imagem principal"
                        class="image-viewer-image"
                    >

                    <span class="image-zoom-indicator">
                        ⊕
                    </span>

                </button>

            </div>

        </div>


        <div class="gallery-secondary">

            <div class="image-viewer">

                <button
                    class="image-viewer-trigger"
                    type="button"
                    data-image="images/image-02.jpg"
                    data-title="PROJECT GALLERY // 02"
                    aria-label="Open image 02"
                >

                    <img
                        src="images/image-02.jpg"
                        alt="Imagem secundária"
                        class="image-viewer-image"
                    >

                    <span class="image-zoom-indicator">
                        ⊕
                    </span>

                </button>

            </div>


            <div class="image-viewer">

                <button
                    class="image-viewer-trigger"
                    type="button"
                    data-image="images/image-03.jpg"
                    data-title="PROJECT GALLERY // 03"
                    aria-label="Open image 03"
                >

                    <img
                        src="images/image-03.jpg"
                        alt="Imagem secundária"
                        class="image-viewer-image"
                    >

                    <span class="image-zoom-indicator">
                        ⊕
                    </span>

                </button>

            </div>

        </div>

    </div>

</section>


---

# 11 // TEMPLATE 08
# PROCESS

## Quando usar

Para mostrar a evolução de uma obra.

Ideal para:

- Pintura digital
- Modelagem 3D
- Concept Art
- Motion Design
- Desenvolvimento visual
- Projetos com etapas importantes


Fluxo recomendado:

CONCEPT
↓
BLOCKOUT
↓
DETAIL
↓
FINAL


## HTML

<section class="artwork-process">


    <header class="process-intro">

        <span class="eyebrow">
            CREATIVE PROCESS
        </span>

        <h2>
            PROJECT TITLE
        </h2>

        <p>
            Processo de desenvolvimento
            da obra desde o conceito
            até o resultado final.
        </p>

    </header>


    <div class="process-list">


        <article class="process-stage">


            <div class="process-image">

                <div class="image-viewer">

                    <button
                        class="image-viewer-trigger"
                        type="button"
                        data-image="images/concept.jpg"
                        data-title="PROCESS // 01"
                        aria-label="Open concept"
                    >

                        <img
                            src="images/concept.jpg"
                            alt="Concept"
                            class="image-viewer-image"
                        >

                        <span class="image-zoom-indicator">
                            ⊕
                        </span>

                    </button>

                </div>

            </div>


            <div class="process-info">

                <span>
                    01
                </span>

                <h3>
                    CONCEPT
                </h3>

                <p>
                    Ideia inicial e direção
                    visual do projeto.
                </p>

            </div>

        </article>


        <article class="process-stage">


            <div class="process-image">

                <div class="image-viewer">

                    <button
                        class="image-viewer-trigger"
                        type="button"
                        data-image="images/blockout.jpg"
                        data-title="PROCESS // 02"
                        aria-label="Open blockout"
                    >

                        <img
                            src="images/blockout.jpg"
                            alt="Blockout"
                            class="image-viewer-image"
                        >

                        <span class="image-zoom-indicator">
                            ⊕
                        </span>

                    </button>

                </div>

            </div>


            <div class="process-info">

                <span>
                    02
                </span>

                <h3>
                    BLOCKOUT
                </h3>

                <p>
                    Construção das formas,
                    composição e estrutura.
                </p>

            </div>

        </article>


        <article class="process-stage">


            <div class="process-image">

                <div class="image-viewer">

                    <button
                        class="image-viewer-trigger"
                        type="button"
                        data-image="images/detail.jpg"
                        data-title="PROCESS // 03"
                        aria-label="Open detail"
                    >

                        <img
                            src="images/detail.jpg"
                            alt="Detalhamento"
                            class="image-viewer-image"
                        >

                        <span class="image-zoom-indicator">
                            ⊕
                        </span>

                    </button>

                </div>

            </div>


            <div class="process-info">

                <span>
                    03
                </span>

                <h3>
                    DETAIL
                </h3>

                <p>
                    Refinamento dos detalhes,
                    materiais e iluminação.
                </p>

            </div>

        </article>


        <article class="process-stage">


            <div class="process-image">

                <div class="image-viewer">

                    <button
                        class="image-viewer-trigger"
                        type="button"
                        data-image="images/final.jpg"
                        data-title="PROCESS // 04"
                        aria-label="Open final artwork"
                    >

                        <img
                            src="images/final.jpg"
                            alt="Resultado final"
                            class="image-viewer-image"
                        >

                        <span class="image-zoom-indicator">
                            ⊕
                        </span>

                    </button>

                </div>

            </div>


            <div class="process-info">

                <span>
                    04
                </span>

                <h3>
                    FINAL
                </h3>

                <p>
                    Resultado final da obra.
                </p>

            </div>

        </article>


    </div>

</section>


---

# 12 // TEMPLATE 09
# CASE STUDY

## Quando usar

Utilizar para os projetos mais importantes
do portfólio.

O objetivo não é apenas mostrar a obra.

O objetivo é contar a história do projeto.


Estrutura:

HERO
↓
OVERVIEW
↓
OBJECTIVE
↓
PROCESS
↓
VISUAL DEVELOPMENT
↓
FINAL RESULT
↓
CONCLUSION


---

# CASE STUDY // HERO

<section class="case-hero">


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/hero.jpg"
            data-title="CASE STUDY // 001"
            aria-label="Open hero artwork"
        >

            <img
                src="images/hero.jpg"
                alt="Imagem principal do projeto"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <div class="case-hero-content">

        <span class="eyebrow">
            CASE STUDY // 001
        </span>

        <h1>
            PROJECT TITLE
        </h1>

        <p>
            Uma breve apresentação
            do projeto.
        </p>

    </div>

</section>


---

# CASE STUDY // OVERVIEW

<section class="case-section">

    <span class="eyebrow">
        01 // OVERVIEW
    </span>

    <h2>
        THE PROJECT
    </h2>

    <p>
        Explique aqui o projeto,
        contexto, objetivo e conceito.
    </p>

</section>


---

# CASE STUDY // OBJECTIVE

<section class="case-section">

    <span class="eyebrow">
        02 // OBJECTIVE
    </span>

    <h2>
        DIRECTION
    </h2>

    <p>
        Explique quais eram os objetivos
        visuais e criativos do projeto.
    </p>

</section>


---

# CASE STUDY // VISUAL DEVELOPMENT

<section class="case-section">

    <span class="eyebrow">
        03 // VISUAL DEVELOPMENT
    </span>

    <h2>
        EXPLORATION
    </h2>


    <div class="case-gallery">


        <div class="image-viewer">

            <button
                class="image-viewer-trigger"
                type="button"
                data-image="images/process-01.jpg"
                data-title="VISUAL DEVELOPMENT // 01"
                aria-label="Open development image 01"
            >

                <img
                    src="images/process-01.jpg"
                    alt="Desenvolvimento 01"
                    class="image-viewer-image"
                >

                <span class="image-zoom-indicator">
                    ⊕
                </span>

            </button>

        </div>


        <div class="image-viewer">

            <button
                class="image-viewer-trigger"
                type="button"
                data-image="images/process-02.jpg"
                data-title="VISUAL DEVELOPMENT // 02"
                aria-label="Open development image 02"
            >

                <img
                    src="images/process-02.jpg"
                    alt="Desenvolvimento 02"
                    class="image-viewer-image"
                >

                <span class="image-zoom-indicator">
                    ⊕
                </span>

            </button>

        </div>


        <div class="image-viewer">

            <button
                class="image-viewer-trigger"
                type="button"
                data-image="images/process-03.jpg"
                data-title="VISUAL DEVELOPMENT // 03"
                aria-label="Open development image 03"
            >

                <img
                    src="images/process-03.jpg"
                    alt="Desenvolvimento 03"
                    class="image-viewer-image"
                    >

                <span class="image-zoom-indicator">
                    ⊕
                </span>

            </button>

        </div>

    </div>

</section>


---

# CASE STUDY // FINAL RESULT

<section class="case-final">


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/final.jpg"
            data-title="FINAL RESULT"
            aria-label="Open final artwork"
        >

            <img
                src="images/final.jpg"
                alt="Resultado final"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <div class="case-final-content">

        <span class="eyebrow">
            04 // FINAL RESULT
        </span>

        <h2>
            FINAL
        </h2>

        <p>
            Resultado final e considerações
            sobre o projeto.
        </p>

    </div>

</section>


---

# 13 // COMPONENTES EXTRAS

Os componentes abaixo podem ser utilizados
em qualquer template.


---

# PROJECT META

<div class="project-meta">

    <span>
        SOFTWARE
    </span>

    <strong>
        BLENDER / PHOTOSHOP
    </strong>


    <span>
        YEAR
    </span>

    <strong>
        2026
    </strong>


    <span>
        TYPE
    </span>

    <strong>
        PERSONAL PROJECT
    </strong>

</div>


---

# IMAGE WITH CAPTION

<figure class="artwork-figure">


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/artwork.jpg"
            data-title="PROJECT TITLE"
            aria-label="Open artwork"
        >

            <img
                src="images/artwork.jpg"
                alt="Descrição da obra"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <figcaption>
        Final render — Project Title
    </figcaption>

</figure>


---

# TWO IMAGE ROW

<div class="image-row">


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/image-01.jpg"
            data-title="IMAGE // 01"
            aria-label="Open image 01"
        >

            <img
                src="images/image-01.jpg"
                alt="Imagem 01"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/image-02.jpg"
            data-title="IMAGE // 02"
            aria-label="Open image 02"
        >

            <img
                src="images/image-02.jpg"
                alt="Imagem 02"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


</div>


---

# THREE IMAGE ROW

<div class="image-row three">


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/image-01.jpg"
            data-title="IMAGE // 01"
            aria-label="Open image 01"
        >

            <img
                src="images/image-01.jpg"
                alt="Imagem 01"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/image-02.jpg"
            data-title="IMAGE // 02"
            aria-label="Open image 02"
        >

            <img
                src="images/image-02.jpg"
                alt="Imagem 02"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/image-03.jpg"
            data-title="IMAGE // 03"
            aria-label="Open image 03"
        >

            <img
                src="images/image-03.jpg"
                alt="Imagem 03"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>


</div>


---

# LARGE IMAGE

<div class="large-artwork">


    <div class="image-viewer">

        <button
            class="image-viewer-trigger"
            type="button"
            data-image="images/artwork.jpg"
            data-title="PROJECT TITLE"
            aria-label="Open artwork"
        >

            <img
                src="images/artwork.jpg"
                alt="Descrição da obra"
                class="image-viewer-image"
            >

            <span class="image-zoom-indicator">
                ⊕
            </span>

        </button>

    </div>

</div>


---

# TEXT BLOCK

<div class="artwork-text">

    <span class="eyebrow">
        NOTES
    </span>

    <h2>
        CREATIVE DIRECTION
    </h2>

    <p>
        Texto adicional sobre a obra,
        decisões criativas ou processo.
    </p>

</div>


---

# 14 // SISTEMA DE ZOOM

## Imagem com zoom

Qualquer imagem pode receber zoom
simplesmente utilizando:

.image-viewer


A estrutura mínima é:

<div class="image-viewer">

    <button
        class="image-viewer-trigger"
        type="button"
        data-image="images/artwork.jpg"
        data-title="PROJECT TITLE"
    >

        <img
            src="images/artwork.jpg"
            alt="Descrição da obra"
            class="image-viewer-image"
        >

    </button>

</div>


Se quiser o indicador visual:

<span class="image-zoom-indicator">
    ⊕
</span>


O comportamento é global.

Não é necessário criar JavaScript
específico para cada template.


---

# 15 // DATA ATTRIBUTES

O sistema utiliza atributos HTML
para tornar os componentes modulares.

## data-image

Define qual imagem será aberta.

Exemplo:

data-image="images/artwork-full.jpg"


## data-title

Define o título mostrado no Lightbox.

Exemplo:

data-title="FINAL ARTWORK"


## aria-label

Define uma descrição acessível
para o botão.

Exemplo:

aria-label="Open final artwork"


---

# 16 // TROCAR UMA IMAGEM

Não é necessário alterar o componente.

Basta trocar:

src

e:

data-image


Exemplo:

ANTES:

src="images/artwork.jpg"

data-image="images/artwork.jpg"


DEPOIS:

src="images/final-render.png"

data-image="images/final-render.png"


O restante permanece igual.


---

# 17 // TROCAR O TEXTO

O conteúdo pode ser alterado livremente.

Exemplo:

<span class="eyebrow">
    3D ART // CHARACTER
</span>

<h2>
    CHARACTER STUDY
</h2>

<p>
    Desenvolvimento visual do personagem,
    explorando formas, materiais e iluminação.
</p>


O CSS continua o mesmo.


---

# 18 // QUANDO NÃO USAR ZOOM

Nem toda imagem precisa obrigatoriamente
ser ampliável.

Se uma imagem for apenas decorativa
ou fizer parte de uma composição pequena,
ela pode utilizar somente:

<img
    src="images/background.jpg"
    alt="Background"
>


Sem:

.image-viewer


Isso evita interações desnecessárias.


---

# 19 // RESPONSIVIDADE

O sistema deve ser pensado
Desktop First, mas funcionar
corretamente em:

DESKTOP
TABLET
MOBILE


No mobile:

- Colunas podem virar uma coluna
- Textos devem reduzir
- Imagens devem manter proporção
- Overlays devem continuar legíveis
- Botões devem permanecer acessíveis
- Lightbox deve ocupar corretamente a tela


Não criar versões HTML diferentes
para Desktop e Mobile.

A mesma estrutura deve ser reutilizada.


---

# 20 // REVERSE

Componentes que possuem composição lateral
podem utilizar:

reverse


Exemplo:

<section class="artwork-split reverse">


Ou:

<section class="artwork-gallery-layout reverse">


O CSS é responsável pela inversão.


---

# 21 // SISTEMA DE CLASSES

## Layouts

.artwork-split

.artwork-fullscreen

.artwork-fullscreen-overlay

.artwork-gallery-layout

.artwork-process

.case-hero

.case-section

.case-final


## Imagens

.artwork-image

.image-viewer

.image-viewer-trigger

.image-viewer-image

.artwork-figure

.large-artwork


## Galerias

.artwork-gallery

.gallery-main

.gallery-secondary

.image-row

.image-row.three

.case-gallery


## Texto

.artwork-description

.gallery-description

.artwork-text

.fullscreen-info

.process-info

.case-hero-content

.case-final-content


## Interface

.eyebrow

.project-meta

.image-zoom-indicator


## Lightbox

.image-lightbox

.lightbox-content

.lightbox-image

.lightbox-title

.lightbox-close


---

# 22 // ESTRUTURA RECOMENDADA DE UMA PÁGINA

Uma página de artwork pode seguir:

NAVIGATION
↓
HERO
↓
OVERVIEW
↓
ARTWORK
↓
PROCESS
↓
GALLERY
↓
FINAL RESULT
↓
TOOLS
↓
CONCLUSION
↓
FOOTER


Mas isso não é obrigatório.


Uma página pequena pode ser:

NAVIGATION
↓
HERO
↓
FULLSCREEN ART
↓
FOOTER


Uma página intermediária:

NAVIGATION
↓
HERO
↓
IMAGE + TEXT
↓
PROCESS
↓
FINAL
↓
FOOTER


Uma página completa:

NAVIGATION
↓
HERO
↓
OVERVIEW
↓
OBJECTIVE
↓
PROCESS
↓
VISUAL DEVELOPMENT
↓
FINAL RESULT
↓
TOOLS
↓
CONCLUSION
↓
FOOTER


---

# 23 // REGRAS DE DESIGN

## Imagem + texto

Preferência:

IMAGE
55%

TEXT
45%


Mas isso não deve ser tratado como
uma regra rígida.

A composição pode variar dependendo
da obra.


---

## Gallery

Preferência:

MAIN
65%

SECONDARY
35%


As imagens secundárias devem
normalmente ser empilhadas.


---

## Fullscreen

A imagem deve dominar
a composição.

O texto deve ser secundário.


---

## Process

Cada etapa deve possuir:

NUMBER
IMAGE
TITLE
DESCRIPTION


Exemplo:

01
CONCEPT

02
BLOCKOUT

03
DETAIL

04
FINAL


---

# 24 // HIERARQUIA VISUAL

A página deve possuir
uma hierarquia clara.

Nível 01:

PROJECT TITLE


Nível 02:

SECTION TITLE


Nível 03:

DESCRIPTION


Nível 04:

META


Nível 05:

MICRO INFORMATION


Exemplo:

CASE STUDY // 001

PROJECT TITLE

A short description...

YEAR
2026

TYPE
DIGITAL ART


---

# 25 // IDENTIDADE VISUAL

A interface deve seguir
a linguagem do:

JORDAN FERRARY
DIGITAL ARCHIVE


Direção:

CYBER-FANTASY
DIGITAL ARCHIVE
EDITORIAL
TECHNICAL
ART DIRECTION


Elementos recorrentes:

- Cyan
- Gold
- Dark background
- Thin borders
- Technical labels
- Small uppercase text
- Large typography
- Geometric details
- Minimal interface
- Subtle glow
- Microinteractions


Os efeitos devem ser discretos.

Evitar excesso de:

- Glow
- Gradients
- Borders
- Animations
- Shadows


A obra continua sendo
o elemento principal.


---

# 26 // MODULARIDADE

O sistema deve permitir
que qualquer bloco seja removido
sem quebrar a página.

Por exemplo:

<section class="artwork-process">
    ...
</section>


Pode ser removido completamente.

A página continuará funcionando.


O mesmo vale para:

Gallery

Tools

Meta

Text Block

Case Section


---

# 27 // REGRA IMPORTANTE

Não criar uma classe nova
para cada projeto.

EVITAR:

.project-001-image

.project-002-image

.project-003-image


PREFERIR:

.artwork-image

.image-viewer

.gallery-main


O conteúdo muda.

O sistema permanece.


---

# 28 // CRIANDO UM NOVO PROJETO

Passo 01

Escolha o nível do projeto.

Pequeno:

FULLSCREEN


Médio:

IMAGE LEFT
+
PROCESS


Grande:

CASE STUDY


---

Passo 02

Escolha a composição.

IMAGE LEFT

ou:

IMAGE RIGHT


ou:

FULLSCREEN


ou:

GALLERY


---

Passo 03

Adicione as imagens.


Exemplo:

images/

    hero.jpg

    concept.jpg

    blockout.jpg

    detail.jpg

    final.jpg


---

Passo 04

Adicione os textos.


Não altere o CSS
para modificar conteúdo.


---

Passo 05

Adicione o sistema de zoom
nas imagens que merecem
visualização ampliada.


---

Passo 06

Adicione o Lightbox global
uma única vez.


---

# 29 // EXEMPLO DE PROJETO SIMPLES

<section class="artwork-split">

    <div class="artwork-image">

        <div class="image-viewer">

            <button
                class="image-viewer-trigger"
                type="button"
                data-image="images/artwork.jpg"
                data-title="PROJECT TITLE"
            >

                <img
                    src="images/artwork.jpg"
                    alt="Project artwork"
                    class="image-viewer-image"
                >

                <span class="image-zoom-indicator">
                    ⊕
                </span>

            </button>

        </div>

    </div>


    <div class="artwork-description">

        <span class="eyebrow">
            DIGITAL ART // 001
        </span>

        <h2>
            PROJECT TITLE
        </h2>

        <p>
            Descrição do projeto.
        </p>

    </div>

</section>


---

# 30 // EXEMPLO DE PROJETO COMPLETO

<header class="project-nav">

    <a
        href="../index.html"
        class="back-link"
    >
        ← BACK TO ARCHIVE
    </a>

    <div class="project-id">
        PROJECT // 001
    </div>

</header>


<main>


    <section class="artwork-fullscreen-overlay">

        <div class="image-viewer">

            <button
                class="image-viewer-trigger"
                type="button"
                data-image="images/hero.jpg"
                data-title="PROJECT TITLE"
            >

                <img
                    src="images/hero.jpg"
                    alt="Project hero"
                    class="image-viewer-image"
                >

                <span class="image-zoom-indicator">
                    ⊕
                </span>

            </button>

        </div>


        <div class="fullscreen-info right">

            <span class="eyebrow">
                CASE STUDY // 001
            </span>

            <h1>
                PROJECT TITLE
            </h1>

            <p>
                Breve apresentação
                do projeto.
            </p>

        </div>

    </section>


    <section class="artwork-split">

        <div class="artwork-image">

            <div class="image-viewer">

                <button
                    class="image-viewer-trigger"
                    type="button"
                    data-image="images/detail.jpg"
                    data-title="PROJECT DETAIL"
                >

                    <img
                        src="images/detail.jpg"
                        alt="Project detail"
                        class="image-viewer-image"
                    >

                    <span class="image-zoom-indicator">
                        ⊕
                    </span>

                </button>

            </div>

        </div>


        <div class="artwork-description">

            <span class="eyebrow">
                01 // OVERVIEW
            </span>

            <h2>
                THE PROJECT
            </h2>

            <p>
                Descrição completa do projeto.
            </p>

        </div>

    </section>


    <section class="artwork-process">

        ...

    </section>


    <section class="artwork-gallery-layout">

        ...

    </section>


    <section class="case-final">

        ...

    </section>


</main>


<footer>

    <span>
        © 2026 JORDAN FERRARY
    </span>

    <span>
        DIGITAL ARCHIVE
    </span>

</footer>


<!-- LIGHTBOX GLOBAL -->

<div
    class="image-lightbox"
    id="imageLightbox"
    aria-hidden="true"
>

    <button
        class="lightbox-close"
        type="button"
        aria-label="Close image preview"
    >
        ×
    </button>


    <div class="lightbox-content">

        <img
            src=""
            alt=""
            class="lightbox-image"
            id="lightboxImage"
        >

        <div
            class="lightbox-title"
            id="lightboxTitle"
        ></div>

    </div>

</div>


---

# 31 // CHECKLIST

Antes de publicar um projeto:

[ ] Título definido

[ ] Categoria definida

[ ] Ano definido

[ ] Descrição revisada

[ ] Imagens otimizadas

[ ] ALT das imagens preenchido

[ ] data-image correto

[ ] data-title correto

[ ] Zoom funcionando

[ ] Lightbox funcionando

[ ] Mobile testado

[ ] Links funcionando

[ ] Back to Archive funcionando

[ ] Footer correto

[ ] Nenhum style inline

[ ] Nenhuma classe específica
    desnecessária


---

# 32 // QUAL TEMPLATE ESCOLHER?

| Situação | Template |
|---|---|
| Uma obra + descrição | IMAGE LEFT |
| Alternância visual | IMAGE RIGHT |
| Obra extremamente visual | FULLSCREEN |
| Obra + informação discreta | FULLSCREEN OVERLAY |
| Estudos / renders | GALLERY |
| Processo de criação | PROCESS |
| Projeto importante | CASE STUDY |


---

# 33 // MAPA DO SISTEMA

DIGITAL ARCHIVE

    ├── ARTWORK SPLIT
    │   ├── IMAGE LEFT
    │   └── IMAGE RIGHT
    │
    ├── FULLSCREEN
    │   ├── TEXT RIGHT
    │   └── TEXT LEFT
    │
    ├── GALLERY
    │   ├── TEXT LEFT
    │   └── TEXT RIGHT
    │
    ├── PROCESS
    │
    ├── CASE STUDY
    │   ├── HERO
    │   ├── OVERVIEW
    │   ├── OBJECTIVE
    │   ├── DEVELOPMENT
    │   └── FINAL
    │
    └── COMPONENTS
        ├── META
        ├── FIGURE
        ├── IMAGE ROW
        ├── LARGE IMAGE
        ├── TEXT BLOCK
        └── IMAGE VIEWER


---

# 34 // REGRA FINAL

O sistema não existe para obrigar
todos os projetos a parecerem iguais.

Ele existe para permitir:

CONSISTÊNCIA
+
LIBERDADE


A identidade pertence ao sistema.

A personalidade pertence ao projeto.


JORDAN FERRARY
DIGITAL ARCHIVE

2D / 3D / VISUAL DEVELOPMENT

© 2026