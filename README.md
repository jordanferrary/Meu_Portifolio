# Jordan Ferrary — Digital Portfolio

## Project structure

```text
jordan_ferrary_site/
├── index.html
├── README.md
├── css/
│   ├── variables.css
│   ├── main.css
│   └── responsive.css
├── js/
│   └── main.js
└── assets/
    └── music/
```

## Where to make changes

- **Global design tokens:** `css/variables.css`. Colors, typography, spacing, layout dimensions, radii, shadows, blur and motion timing are centralized here.
- **Base styles and components:** `css/main.css`.
- **Responsive behavior:** `css/responsive.css`.
- **Carousel projects and music:** `js/main.js`, inside `SITE_CONFIG`.
- **Page content and social links:** `index.html`.

## Add music

1. Put your audio file in `assets/music/`, for example `ambient.mp3`.
2. Open `js/main.js`.
3. Change `musicFile: ""` to `musicFile: "assets/music/ambient.mp3"`.

Use audio you have permission to publish.

## Replace project slides

In `js/main.js`, update the objects in `SITE_CONFIG.projects`. Each project has `label`, `title`, `description`, `image` and `url` fields. Keep the `url` pointed at a real project page in your site.

## Before publishing

- Replace the sample social profile links with your own.
- Replace example project pages and images with your real portfolio projects.
- Check all links and test at desktop, tablet and mobile widths.
- The Google Fonts import and sample Unsplash images require an internet connection.
