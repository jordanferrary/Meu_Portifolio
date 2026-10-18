/* Gallery-only JavaScript; keeps all project and lightbox selectors scoped. */
const projectData = [
    { title: "The Arcane Wanderer", category: "character", description: "A character concept exploring silhouette, stylized forms, materials and personality.", subtitle: "A study in silhouette and personality.", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=700&q=85", project: "projects/arcane-wanderer.html", tags: ["Character Modeling", "Stylized", "Blender"], type: "Character Art", year: "2026" },
    { title: "Beyond the Horizon", category: "environment", description: "An atmospheric environment study built around composition, depth, lighting and mood.", subtitle: "Building atmosphere through light and color.", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=85", project: "projects/beyond-horizon.html", tags: ["Environment", "Lighting", "Composition"], type: "Environment Art", year: "2026" },
    { title: "Relic of the Forgotten", category: "prop", description: "A fantasy asset study focused on shape language, surface design and presentation.", subtitle: "A fantasy asset exploration.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85", project: "projects/forgotten-relic.html", tags: ["Props", "Materials", "Fantasy"], type: "3D Asset", year: "2026" },
    { title: "Chromatic Dreams", category: "experiment", description: "An experimental exploration of color, reflections, light and abstract forms.", subtitle: "Color, light and visual experimentation.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=85", project: "projects/chromatic-dreams.html", tags: ["Experiment", "Materials", "Color"], type: "Visual Experiment", year: "2026" },
    { title: "Quiet Afterglow", category: "environment", description: "A visual study of calm spaces, soft lighting and environmental storytelling.", subtitle: "A moment suspended in time.", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85", project: "projects/quiet-afterglow.html", tags: ["Environment", "Mood", "Lighting"], type: "Environment Art", year: "2026" },
    { title: "Digital Nomad", category: "character", description: "A character-oriented visual exploration with a focus on personality and stylized presentation.", subtitle: "Character design and digital identity.", image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=700&q=85", project: "projects/digital-nomad.html", tags: ["Character", "Design", "3D"], type: "Character Art", year: "2026" },
    { title: "Arcane Interface", category: "prop", description: "A design study exploring fantasy-inspired interface elements and a coherent visual language.", subtitle: "A meeting between technology and fantasy.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=85", project: "projects/arcane-interface.html", tags: ["Design", "Interface", "Experiment"], type: "Design Study", year: "2026" },
    { title: "Midnight Reverie", category: "experiment", description: "A visual experiment exploring atmosphere, composition and the relationship between light and shadow.", subtitle: "Exploring the beauty of the unknown.", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=90", thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=85", project: "projects/midnight-reverie.html", tags: ["Atmosphere", "Lighting", "Study"], type: "Visual Experiment", year: "2026" }
];

const gallery = document.getElementById("gallery");
const filterButtons = [...document.querySelectorAll(".gallery-filter")];
const searchInput = document.getElementById("search");
const count = document.getElementById("count");
const emptyState = document.getElementById("empty-state");
const loadMoreButton = document.getElementById("load-more");
const categoryNames = { character: "Character", environment: "Environment", prop: "Props & Assets", experiment: "Experiments" };
let currentFilter = "all", searchTerm = "", visibleLimit = 12;

function createProjectCard(data, index) {
    const card = document.createElement("article"); card.className = "gallery-project"; card.dataset.index = index;
    const imageButton = document.createElement("button"); imageButton.className = "gallery-image-button"; imageButton.type = "button"; imageButton.setAttribute("aria-label", `Preview ${data.title}`);
    const image = document.createElement("img"); image.className = "gallery-project-image"; image.src = data.thumbnail; image.alt = data.title; image.loading = "lazy"; image.decoding = "async";
    const overlay = document.createElement("span"); overlay.className = "gallery-image-overlay";
    const zoomLabel = document.createElement("span"); zoomLabel.className = "gallery-zoom-label"; zoomLabel.textContent = "⌕ Quick View";
    const zoomIcon = document.createElement("span"); zoomIcon.className = "gallery-zoom-icon"; zoomIcon.textContent = "↗"; overlay.append(zoomLabel, zoomIcon); imageButton.append(image, overlay);
    const info = document.createElement("div"); info.className = "gallery-project-info";
    const meta = document.createElement("div"); meta.className = "gallery-project-meta";
    const category = document.createElement("span"); category.className = "gallery-project-category"; category.textContent = categoryNames[data.category] || data.category;
    const year = document.createElement("span"); year.className = "gallery-project-year"; year.textContent = data.year; meta.append(category, year);
    const title = document.createElement("h3"); title.className = "gallery-project-title"; title.textContent = data.title;
    const subtitle = document.createElement("p"); subtitle.className = "gallery-project-subtitle"; subtitle.textContent = data.subtitle;
    const footer = document.createElement("div"); footer.className = "gallery-project-footer";
    const type = document.createElement("span"); type.className = "gallery-project-type"; type.textContent = data.type;
    const link = document.createElement("a"); link.className = "gallery-open-project"; link.href = data.project; link.textContent = "View Project ↗"; footer.append(type, link);
    info.append(meta, title, subtitle, footer); card.append(imageButton, info); imageButton.addEventListener("click", () => openLightbox(index)); return card;
}
function renderCards() { const fragment = document.createDocumentFragment(); projectData.forEach((data, index) => fragment.append(createProjectCard(data, index))); gallery.replaceChildren(fragment); updateGallery(); }
function updateGallery() {
    const matching = projectData.map((data, index) => ({ data, index })).filter(({ data }) => {
        const categoryMatch = currentFilter === "all" || data.category === currentFilter;
        const text = [data.title, data.description, data.subtitle, data.category, data.type, ...data.tags].join(" ").toLowerCase();
        return categoryMatch && text.includes(searchTerm);
    });
    const visible = new Set(matching.slice(0, visibleLimit).map(item => item.index));
    [...gallery.children].forEach(card => card.hidden = !visible.has(Number(card.dataset.index)));
    const total = matching.length, shown = Math.min(visibleLimit, total);
    count.textContent = `${total} ${total === 1 ? "project" : "projects"}`;
    emptyState.classList.toggle("visible", total === 0); gallery.hidden = total === 0;
    loadMoreButton.disabled = shown >= total; loadMoreButton.textContent = shown < total ? "Load More Projects ↓" : "All Projects Loaded";
    if (lightbox.classList.contains("open") && !visible.has(activeProjectIndex)) closeLightbox();
}
filterButtons.forEach(button => button.addEventListener("click", () => {
    currentFilter = button.dataset.filter; visibleLimit = 12;
    filterButtons.forEach(item => { const selected = item === button; item.classList.toggle("active", selected); item.setAttribute("aria-pressed", String(selected)); });
    updateGallery();
}));
searchInput.addEventListener("input", () => { searchTerm = searchInput.value.trim().toLowerCase(); visibleLimit = 12; updateGallery(); });
loadMoreButton.addEventListener("click", () => { visibleLimit += 8; updateGallery(); });
document.getElementById("year").textContent = String(new Date().getFullYear());

const lightbox = document.getElementById("lightbox"), lightboxPanel = document.getElementById("lightbox-panel");
const lightboxImage = document.getElementById("lightbox-image"), lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category"), lightboxDescription = document.getElementById("lightbox-description");
const lightboxTags = document.getElementById("lightbox-tags"), viewProject = document.getElementById("view-project");
const closeButton = document.getElementById("modal-close"), previousButton = document.getElementById("modal-prev"), nextButton = document.getElementById("modal-next");
let activeProjectIndex = 0, lastFocusedElement = null;
function getVisibleProjectIndexes() { return [...gallery.children].filter(card => !card.hidden).map(card => Number(card.dataset.index)); }
function openLightbox(index) {
    if (!getVisibleProjectIndexes().includes(index)) return;
    activeProjectIndex = index; lastFocusedElement = document.activeElement; renderLightboxProject();
    lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open"); closeButton.focus();
}
function renderLightboxProject() {
    const visible = getVisibleProjectIndexes(); if (!visible.length) return;
    if (!visible.includes(activeProjectIndex)) activeProjectIndex = visible[0];
    const data = projectData[activeProjectIndex]; lightboxImage.src = data.image; lightboxImage.alt = data.title;
    lightboxTitle.textContent = data.title; lightboxCategory.textContent = `${data.type}${data.year ? " · " + data.year : ""}`;
    lightboxDescription.textContent = data.description; lightboxTags.replaceChildren();
    data.tags.forEach(tag => { const el = document.createElement("span"); el.className = "gallery-lightbox-tag"; el.textContent = tag; lightboxTags.append(el); });
    viewProject.href = data.project || "#"; previousButton.hidden = visible.length < 2; nextButton.hidden = visible.length < 2;
}
function closeLightbox() {
    lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); document.body.classList.remove("modal-open"); lightboxImage.removeAttribute("src");
    if (lastFocusedElement && document.contains(lastFocusedElement)) lastFocusedElement.focus();
}
function moveLightbox(direction) {
    const visible = getVisibleProjectIndexes(); if (!visible.length) return;
    const position = visible.indexOf(activeProjectIndex); activeProjectIndex = visible[(position + direction + visible.length) % visible.length]; renderLightboxProject();
}
closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => moveLightbox(-1)); nextButton.addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
lightboxPanel.addEventListener("click", event => event.stopPropagation());
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
    if (event.key === "Tab") {
        const focusable = [closeButton, previousButton, nextButton, viewProject].filter(el => !el.hidden);
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
});
renderCards();
