# JORDAN FERRARY // DIGITAL ARCHIVE

Portfólio pessoal de Jordan Ferrary.

O projeto foi desenvolvido como um arquivo digital
para apresentar trabalhos de 2D e 3D, permitindo que
cada projeto tenha sua própria página de apresentação,
processo e galeria de imagens.

---

# 01 // VISÃO GERAL

O portfólio possui três níveis principais:

1. Página principal
2. Galerias 2D e 3D
3. Página individual de cada projeto

Fluxo:

INDEX
  ↓
PORTFOLIO
  ↓
2D / 3D
  ↓
PROJECT
  ↓
PROCESS + FINAL ART + MORE VIEWS


---

# 02 // ESTRUTURA DO PROJETO

JORDAN-FERRARY-PORTFOLIO/

├── index.html

├── css/
│   ├── style.css
│   ├── gallery.css
│   ├── project.css
│   └── contact.css

├── 2d/
│   ├── index.html
│   ├── project-01.html
│   ├── project-02.html
│   └── project-03.html

├── 3d/
│   ├── index.html
│   ├── project-01.html
│   ├── project-02.html
│   └── project-03.html

├── contact/
│   └── index.html

├── assets/
│   ├── images/
│   ├── thumbnails/
│   └── projects/

├── templates/
│   ├── project-template.html
│   └── project-template.css

└── README.md


---

# 03 // INDEX.HTML

O index.html é a página principal.

Ele contém:

- identidade visual;
- apresentação;
- status;
- links;
- entrada para o portfólio;
- acesso à galeria 2D;
- acesso à galeria 3D;
- seção About;
- acesso ao Contact.

Não é necessário colocar todos os projetos
diretamente no index.

O index funciona como HUB.


---

# 04 // PORTFOLIO

O menu PORTFOLIO funciona como entrada geral
para o sistema de trabalhos.

As duas categorias principais são:

2D
3D

Não existe Motion na arquitetura atual.

Caso Motion seja adicionado futuramente,
deverá ser tratado como uma terceira categoria.


---

# 05 // GALERIA 2D

Arquivo:

2d/index.html

A galeria apresenta os projetos 2D.

Cada card possui:

- thumbnail;
- categoria;
- título;
- descrição;
- link para o projeto.

Os filtros são definidos pelo atributo:

data-category

Exemplo:

data-category="painting"

Categorias padrão:

painting
illustration
study


---

# 06 // GALERIA 3D

Arquivo:

3d/index.html

A estrutura é igual à galeria 2D.

Categorias padrão:

environment
character
render

Novas categorias podem ser adicionadas.


---

# 07 // COMO FUNCIONAM OS FILTROS

Cada projeto recebe:

data-category="categoria"

Exemplo:

<article
    class="gallery-card"
    data-category="painting"
>

O botão de filtro utiliza:

data-filter="painting"

Quando os valores são iguais,
o projeto aparece.

Quando são diferentes,
o projeto é ocultado.

O filtro ALL mostra todos.


---

# 08 // PÁGINA INDIVIDUAL

Cada projeto possui seu próprio HTML.

Exemplo:

2d/project-01.html

ou:

3d/project-01.html

Essa página funciona como uma apresentação
individual do trabalho.


---

# 09 // ESTRUTURA DE UM PROJETO

Cada projeto pode possuir:

- imagem principal;
- descrição;
- ferramentas;
- ano;
- processo;
- imagens de processo;
- artwork final;
- renders adicionais;
- imagens complementares;
- navegação entre projetos.


---

# 10 // TEMPLATE

O arquivo:

templates/project-template.html

é o modelo oficial para criação de novos projetos.

Para criar um projeto:

1. copie o template;
2. cole dentro da pasta correta;
3. renomeie o arquivo;
4. altere título;
5. altere categoria;
6. altere descrição;
7. altere ferramentas;
8. altere ano;
9. altere os caminhos das imagens;
10. ajuste os links Previous / Next.


---

# 11 // EXEMPLO DE NOVO PROJETO

Para criar:

2d/project-04.html

copie:

templates/project-template.html

e renomeie para:

project-04.html


---

# 12 // IMAGENS DO PROJETO

Recomendação:

assets/projects/project-04/

Dentro:

hero.jpg
final.jpg
process-01.jpg
process-02.jpg
process-03.jpg
view-01.jpg
view-02.jpg

Não é obrigatório utilizar todas.

Você pode ter apenas:

hero.jpg
final.jpg

ou dezenas de imagens.


---

# 13 // CAMINHOS DAS IMAGENS

Dentro de:

2d/project-01.html

o caminho deve ser:

../assets/projects/project-01/hero.jpg

O ../ é necessário porque o HTML
está dentro da pasta 2d.


---

# 14 // THUMBNAILS

As thumbnails utilizadas nas galerias ficam em:

assets/thumbnails/

Exemplo:

assets/thumbnails/2d-01.jpg

assets/thumbnails/3d-01.jpg


---

# 15 // LIGHTBOX / ZOOM

As páginas individuais possuem um sistema
de visualização ampliada.

Ao clicar em uma imagem:

1. o lightbox aparece;
2. a imagem é ampliada;
3. o fundo fica escuro;
4. o usuário pode clicar para fechar;
5. ESC também fecha.

O sistema utiliza JavaScript diretamente
na página do projeto.

Não é necessário instalar biblioteca externa.


---

# 16 // CONTACT ME

A página está em:

contact/index.html

O CSS correspondente está em:

css/contact.css

O Contact possui:

- email;
- Instagram;
- ArtStation;
- Behance.

Links ainda não configurados devem ser
substituídos antes da publicação.


---

# 17 // CSS

style.css

CSS global do site.

gallery.css

CSS das galerias.

project.css

CSS das páginas individuais.

contact.css

CSS do Contact.


---

# 18 // COMO ADICIONAR UM NOVO PROJETO 2D

Exemplo:

1. Criar:

2d/project-04.html

2. Criar:

assets/projects/project-04/

3. Colocar as imagens.

4. Adicionar um card em:

2d/index.html

5. Configurar:

href="project-04.html"

6. Definir a categoria:

data-category="painting"


---

# 19 // COMO ADICIONAR UM NOVO PROJETO 3D

Exemplo:

1. Criar:

3d/project-04.html

2. Criar:

assets/projects/project-04/

3. Colocar as imagens.

4. Adicionar card em:

3d/index.html

5. Configurar o link.

6. Definir a categoria.


---

# 20 // NOMEAÇÃO

Use nomes simples.

Correto:

project-01.html
project-02.html

hero.jpg
final.jpg
process-01.jpg

Evite:

Meu Projeto Final 2026.jpg

Prefira:

project-final.jpg


---

# 21 // GITHUB PAGES

O projeto é compatível com GitHub Pages.

Como o site utiliza HTML, CSS e JavaScript
sem backend obrigatório, pode ser hospedado
diretamente em um repositório.

É importante respeitar os caminhos relativos.

Exemplo:

../css/project.css

Não utilizar caminhos absolutos locais como:

C:/Users/Jordan/Desktop/...


---

# 22 // LINKS

Sempre utilizar links relativos para páginas
dentro do próprio projeto.

Exemplo:

<a href="../3d/index.html">

ou:

<a href="project-02.html">

Links externos podem utilizar URLs completas.

Exemplo:

https://instagram.com/...


---

# 23 // ADICIONANDO MAIS IMAGENS

Um projeto pode ter quantas imagens forem necessárias.

Exemplo:

process-01.jpg
process-02.jpg
process-03.jpg
process-04.jpg
process-05.jpg

Basta adicionar novos elementos:

<figure>

    <img
        src="../assets/projects/project-01/process-05.jpg"
        alt="Process 05"
    >

</figure>


---

# 24 // PERFORMANCE

Para manter o site leve:

- utilize JPG para fotografias e renders;
- utilize PNG quando transparência for necessária;
- comprima imagens antes do upload;
- evite imagens gigantes sem necessidade;
- utilize thumbnails menores nas galerias;
- mantenha imagens de projeto em resolução maior.

A thumbnail não precisa possuir a mesma
resolução da imagem final.


---

# 25 // CHECKLIST DE NOVO PROJETO

Antes de publicar:

[ ] HTML criado

[ ] título alterado

[ ] categoria alterada

[ ] descrição adicionada

[ ] ferramentas adicionadas

[ ] ano configurado

[ ] hero adicionada

[ ] artwork final adicionada

[ ] imagens de processo adicionadas

[ ] thumbnails adicionadas

[ ] link do card configurado

[ ] Previous configurado

[ ] Next configurado

[ ] Back to Gallery configurado

[ ] imagens testadas

[ ] zoom testado


---

# 26 // CHECKLIST DO SITE

Antes de publicar o portfólio:

[ ] index funcionando

[ ] 2D funcionando

[ ] 3D funcionando

[ ] Contact funcionando

[ ] links do menu funcionando

[ ] links sociais funcionando

[ ] thumbnails carregando

[ ] projetos abrindo

[ ] zoom funcionando

[ ] versão mobile testada

[ ] caminhos relativos verificados

[ ] GitHub Pages testado


---

# 27 // ARQUITETURA FUTURA

A arquitetura foi pensada para crescer.

Atualmente:

2D
3D

Se novas áreas forem adicionadas futuramente,
elas podem seguir o mesmo padrão.

Exemplo:

motion/
photography/
concept-art/

Cada nova categoria deve possuir:

index.html
gallery
projects


---

# 28 // PRINCÍPIO DO PROJETO

O index é o HUB.

As galerias são os catálogos.

Os projetos individuais são as apresentações
completas das obras.

Assets armazenam as mídias.

Templates aceleram a criação.

README documenta toda a arquitetura.

Essa separação permite que o portfólio cresça
sem transformar o projeto em um único HTML gigante.


---

# 29 // REGRA PRINCIPAL

Sempre que um novo projeto for criado:

1. duplicar o template;
2. criar sua pasta de assets;
3. adicionar imagens;
4. adicionar o card à galeria;
5. testar todos os links;
6. testar o zoom;
7. testar no mobile.

Não alterar a arquitetura de pastas sem
atualizar este README.


---

# 30 // STATUS

JORDAN FERRARY // DIGITAL ARCHIVE

SYSTEM STATUS:
OPERATIONAL

ARCHITECTURE:
HTML / CSS / JAVASCRIPT

CATEGORIES:
2D / 3D

HOSTING:
GITHUB PAGES READY

PROJECT PRESENTATION:
ENABLED

IMAGE LIGHTBOX:
ENABLED

DOCUMENTATION:
ACTIVE