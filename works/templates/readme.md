# JORDAN FERRARY // OBRA TEMPLATES

Biblioteca de estruturas HTML para as páginas individuais
das obras do portfólio.

Os templates abaixo são **blocos modulares**.

Eles NÃO são páginas HTML completas.

Não possuem:

- `<!DOCTYPE html>`
- `<html>`
- `<head>`
- `<body>`
- `<main>`

Essas estruturas já pertencem ao `index.html` de cada obra.

---

# 📁 ESTRUTURA RECOMENDADA

Cada obra possui sua própria pasta.

```text
works/
│
├── artwork-001/
│   ├── index.html
│   └── images/
│       ├── hero.jpg
│       ├── artwork.jpg
│       ├── process-01.jpg
│       └── final.jpg
│
├── artwork-002/
│   ├── index.html
│   └── images/
│       ├── hero.jpg
│       └── final.jpg
│
└── artwork-003/
    ├── index.html
    └── images/
        ├── image-01.jpg
        ├── image-02.jpg
        └── image-03.jpg
```

---

# 🧭 COMO USAR

1. Crie a pasta da obra.
2. Crie o `index.html`.
3. Utilize o template desejado abaixo.
4. Copie somente o bloco HTML.
5. Cole dentro do `<main>` da página.
6. Coloque as imagens na pasta `images`.
7. Altere textos, títulos e caminhos.
8. O CSS global será responsável pela aparência.

---

# TEMPLATE 01
# IMAGE LEFT / TEXT RIGHT

### Quando usar

Ideal para apresentar uma obra principal acompanhada
de informações sobre o projeto.

### Estrutura

```text
┌──────────────────────────────────────────────┐
│                                              │
│  ┌──────────────────┐   ┌─────────────────┐ │
│  │                  │   │                 │ │
│  │                  │   │     TITLE       │ │
│  │      IMAGE       │   │                 │ │
│  │                  │   │   DESCRIPTION   │ │
│  │                  │   │                 │ │
│  └──────────────────┘   └─────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

### HTML — COPY

```html
<section class="artwork-split">

    <div class="artwork-image">

        <img
            src="images/artwork.jpg"
            alt="Descrição da obra"
        >

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
```

---

# TEMPLATE 02
# TEXT LEFT / IMAGE RIGHT

### Quando usar

Ideal para alternar a composição entre projetos
e evitar que todas as páginas tenham a mesma estrutura.

### Estrutura

```text
┌──────────────────────────────────────────────┐
│                                              │
│  ┌─────────────────┐   ┌──────────────────┐ │
│  │                 │   │                  │ │
│  │     TITLE       │   │                  │ │
│  │                 │   │      IMAGE       │ │
│  │   DESCRIPTION   │   │                  │ │
│  │                 │   │                  │ │
│  └─────────────────┘   └──────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

### HTML — COPY

```html
<section class="artwork-split reverse">

    <div class="artwork-image">

        <img
            src="images/artwork.jpg"
            alt="Descrição da obra"
        >

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
```

---

# TEMPLATE 03
# FULLSCREEN

### Quando usar

Para obras visualmente fortes onde a imagem
deve ser o elemento dominante da página.

Ideal para:

- Renders
- Ilustrações finais
- Keyframes
- Concept art
- Imagens cinematográficas

### Estrutura

```text
┌──────────────────────────────────────────────┐
│                                              │
│                                              │
│                                              │
│                  ARTWORK                     │
│                                              │
│                                              │
│                                              │
└──────────────────────────────────────────────┘
```

### HTML — COPY

```html
<section class="artwork-fullscreen">

    <img
        src="images/artwork.jpg"
        alt="Descrição da obra"
    >

</section>
```

---

# TEMPLATE 04
# FULLSCREEN + TEXT RIGHT

### Quando usar

Para manter a obra ocupando toda a tela
enquanto informações ficam discretamente
sobrepostas no lado direito.

### Estrutura

```text
┌──────────────────────────────────────────────┐
│                                              │
│                         ┌─────────────────┐ │
│                         │ PROJECT TITLE   │ │
│        ARTWORK          │                 │ │
│                         │ DESCRIPTION     │ │
│                         │                 │ │
│                         └─────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

### HTML — COPY

```html
<section class="artwork-fullscreen-overlay">

    <img
        src="images/artwork.jpg"
        alt="Descrição da obra"
    >


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
```

---

# TEMPLATE 05
# FULLSCREEN + TEXT LEFT

### Quando usar

Mesma lógica do template anterior,
porém com o conteúdo no lado esquerdo.

### HTML — COPY

```html
<section class="artwork-fullscreen-overlay">

    <img
        src="images/artwork.jpg"
        alt="Descrição da obra"
    >


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
```

---

# TEMPLATE 06
# GALLERY + TEXT LEFT

### Quando usar

Para mostrar várias imagens relacionadas
a uma mesma obra.

Ideal para:

- Estudos
- Renders
- Variações
- Desenvolvimento visual
- Diferentes ângulos

### Distribuição

Uma imagem maior à esquerda
e duas imagens empilhadas à direita.

```text
┌──────────────────────────────────────────────┐
│                                              │
│  ┌──────────────────┐  ┌─────────────────┐ │
│  │                  │  │                 │ │
│  │                  │  │    IMAGE 01     │ │
│  │      IMAGE       │  ├─────────────────┤ │
│  │       MAIN       │  │    IMAGE 02     │ │
│  │                  │  │                 │ │
│  └──────────────────┘  └─────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

### HTML — COPY

```html
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

            <img
                src="images/image-01.jpg"
                alt="Imagem principal do projeto"
            >

        </div>


        <div class="gallery-secondary">

            <img
                src="images/image-02.jpg"
                alt="Imagem secundária 01"
            >

            <img
                src="images/image-03.jpg"
                alt="Imagem secundária 02"
            >

        </div>

    </div>

</section>
```

---

# TEMPLATE 07
# GALLERY + TEXT RIGHT

### Quando usar

Mesma galeria anterior,
porém com a descrição posicionada
no lado direito.

### HTML — COPY

```html
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

            <img
                src="images/image-01.jpg"
                alt="Imagem principal do projeto"
            >

        </div>


        <div class="gallery-secondary">

            <img
                src="images/image-02.jpg"
                alt="Imagem secundária 01"
            >

            <img
                src="images/image-03.jpg"
                alt="Imagem secundária 02"
            >

        </div>

    </div>

</section>
```

---

# TEMPLATE 08
# PROCESS

### Quando usar

Para mostrar a evolução de uma obra.

Ideal para pintura digital,
modelagem 3D, concept art e projetos
que possuem várias etapas importantes.

### Estrutura

```text
CONCEPT
   ↓
BLOCKOUT
   ↓
DETAIL
   ↓
FINAL
```

### HTML — COPY

```html
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

                <img
                    src="images/concept.jpg"
                    alt="Concept"
                >

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

                <img
                    src="images/blockout.jpg"
                    alt="Blockout"
                >

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

                <img
                    src="images/detail.jpg"
                    alt="Detalhamento"
                >

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

                <img
                    src="images/final.jpg"
                    alt="Resultado final"
                >

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
```

---

# TEMPLATE 09
# CASE STUDY

### Quando usar

Este é o template para os projetos
mais importantes do portfólio.

Em vez de simplesmente mostrar a obra,
ele conta a história do projeto.

Estrutura:

```text
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
```

---

## HERO — COPY

```html
<section class="case-hero">

    <img
        src="images/hero.jpg"
        alt="Imagem principal do projeto"
    >


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
```

---

## OVERVIEW — COPY

```html
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
```

---

## OBJECTIVE — COPY

```html
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
```

---

## VISUAL DEVELOPMENT — COPY

```html
<section class="case-section">

    <span class="eyebrow">
        03 // VISUAL DEVELOPMENT
    </span>

    <h2>
        EXPLORATION
    </h2>


    <div class="case-gallery">

        <img
            src="images/process-01.jpg"
            alt="Desenvolvimento 01"
        >

        <img
            src="images/process-02.jpg"
            alt="Desenvolvimento 02"
        >

        <img
            src="images/process-03.jpg"
            alt="Desenvolvimento 03"
        >

    </div>

</section>
```

---

## FINAL RESULT — COPY

```html
<section class="case-final">

    <img
        src="images/final.jpg"
        alt="Resultado final"
    >


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
```

---

# 🧩 COMPONENTES EXTRAS

Além dos templates completos,
alguns componentes podem ser adicionados
a qualquer página.

---

# PROJECT META

```html
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
```

---

# IMAGE WITH CAPTION

```html
<figure class="artwork-figure">

    <img
        src="images/artwork.jpg"
        alt="Descrição da obra"
    >

    <figcaption>
        Final render — Project Title
    </figcaption>

</figure>
```

---

# TWO IMAGE ROW

```html
<div class="image-row">

    <img
        src="images/image-01.jpg"
        alt="Imagem 01"
    >

    <img
        src="images/image-02.jpg"
        alt="Imagem 02"
    >

</div>
```

---

# THREE IMAGE ROW

```html
<div class="image-row three">

    <img
        src="images/image-01.jpg"
        alt="Imagem 01"
    >

    <img
        src="images/image-02.jpg"
        alt="Imagem 02"
    >

    <img
        src="images/image-03.jpg"
        alt="Imagem 03"
    >

</div>
```

---

# LARGE IMAGE

```html
<div class="large-artwork">

    <img
        src="images/artwork.jpg"
        alt="Descrição da obra"
    >

</div>
```

---

# TEXT BLOCK

```html
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
```

---

# 🔄 COMO INVERTER UMA COMPOSIÇÃO

Os templates que possuem a classe:

```html
reverse
```

podem ser invertidos através dela.

Exemplo:

```html
<section class="artwork-split reverse">
```

ou:

```html
<section class="artwork-gallery-layout reverse">
```

Isso permite usar a mesma estrutura
em lados diferentes sem criar outro template.

---

# 🖼️ ZOOM / VISUALIZAÇÃO DA OBRA

As imagens podem posteriormente receber
um sistema de visualização ampliada.

A estrutura HTML pode permanecer simples:

```html
<div class="artwork-image">

    <img
        src="images/artwork.jpg"
        alt="Descrição da obra"
        class="zoomable"
    >

</div>
```

O comportamento de zoom será controlado
posteriormente pelo JavaScript/CSS.

---

# 📐 REGRAS DE DISTRIBUIÇÃO

Para manter a identidade visual do portfólio:

### Imagem + texto

Use aproximadamente:

```text
IMAGE 55%
TEXT 45%
```

ou:

```text
TEXT 45%
IMAGE 55%
```

### Gallery

Use:

```text
MAIN IMAGE    65%
SECONDARY     35%
```

com as duas imagens secundárias
empilhadas.

### Fullscreen

A imagem deve dominar a composição.

O texto deve ser tratado como
informação secundária.

### Process

Cada etapa deve possuir:

- Número
- Imagem
- Nome
- Pequena descrição

---

# 🎨 RESPONSABILIDADE DO CSS

O HTML define:

```text
ESTRUTURA
ORDEM
HIERARQUIA
CONTEÚDO
```

O CSS define:

```text
CORES
BORDAS
MOLDURAS
ESPAÇAMENTO
TIPOGRAFIA
GRID
ANIMAÇÕES
HOVER
RESPONSIVIDADE
ZOOM VISUAL
CYBER-FANTASY UI
```

Portanto, não coloque estilos diretamente
nos templates.

Evite:

```html
style="width: 50%"
```

Prefira:

```html
class="artwork-image"
```

e deixe o CSS controlar a aparência.

---

# 🧠 QUAL TEMPLATE ESCOLHER?

| Situação | Template |
|---|---|
| Uma obra + descrição | Image Left |
| Alternância visual | Image Right |
| Obra extremamente visual | Fullscreen |
| Obra + informações discretas | Fullscreen Overlay |
| Estudos / renders | Gallery |
| Processo de criação | Process |
| Projeto importante | Case Study |

---

# ✦ FILOSOFIA

Não é necessário que todas as obras
tenham a mesma estrutura.

O sistema existe justamente para permitir
variação sem perder identidade.

Exemplo:

```text
ARTWORK 001
→ FULLSCREEN

ARTWORK 002
→ IMAGE LEFT

ARTWORK 003
→ GALLERY

ARTWORK 004
→ PROCESS

ARTWORK 005
→ CASE STUDY

ARTWORK 006
→ FULLSCREEN TEXT LEFT
```

O visitante percebe uma identidade visual
consistente, mas cada projeto possui
uma apresentação própria.

---

# JORDAN FERRARY
## DIGITAL ARCHIVE

2D / 3D / VISUAL DEVELOPMENT

© 2026