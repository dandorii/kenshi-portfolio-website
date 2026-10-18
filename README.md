# Kenshi // Personal Archive

A responsive, Persona 3 Portable-inspired personal portfolio built with HTML, CSS, and vanilla JavaScript. Designed as a digital archive for my cybersecurity projects, personal interests, and reflections, with a nostalgic blue-and-cyan interface.

**Live Website:** https://kenshidev.neocities.org/

## Overview

Kenshi // Personal Archive is a personal website that combines a retro game-inspired interface with a portfolio showcasing my journey as a cybersecurity student.

The site focuses on original CSS visuals, responsive layouts, interactive navigation, and small hidden details that make exploring the archive more engaging.

## Features

- **Boot Sequence** — An introductory screen with a skip option.
- **Project Archive** — Showcases cybersecurity projects and experiments.
- **About Me** — A profile describing my interests, learning style, and goals.
- **Side Quests** — A space for hobbies and personal interests.
- **Transmission** — Links to my online profiles and contact information.
- **Social Link Archive** — A dedicated page inspired by the Social Link system, featuring ten personal reflections.
- **Reflection Navigation** — Browse entries using Previous/Next buttons and a reflection selector.
- **Unlisted Memory** — A hidden entry unlocked through an easter egg.
- **Responsive Layout** — Content panels adapt to different screen sizes, including desktop, tablet, and mobile.
- **Sound Toggle** — Optional synthesized interface tones, disabled by default.
- **Easter Eggs** — Hidden interactions throughout the website.

## Featured Projects

### PhishGuard

A phishing URL and email analyzer designed to help users understand suspicious indicators through rule-based detection and a security-focused interface.

- **Technologies:** Python, Flask, JavaScript, SQLite
- **Live Demo:** https://phishguard-ujkh.onrender.com

### YORU Terminal

A Japanese-inspired terminal cybersecurity learning simulator concept focused on interactive security missions, saved progress, XP, ranks, and bite-sized challenges.

- **Planned technologies:** Python, Rich, SQLite

## Project Structure

```text
Kenshi-Personal-Archive/
├── index.html
├── stylev2.css
├── script.js
├── social-link.html
├── social-link.js
└── README.md
```

Additional files or folders may exist depending on your local project setup.

| File | Purpose |
|---|---|
| `index.html` | Main portfolio page and its content |
| `stylev2.css` | Main styling, visual effects, and responsive layout |
| `script.js` | Shared interactions, sound controls, and easter eggs |
| `social-link.html` | Social Link Archive page and Unlisted Memory section |
| `social-link.js` | Reflection content, selector, progress indicator, and Previous/Next navigation |
| `README.md` | Project documentation and setup instructions |

Keep filenames and capitalization consistent with the references in your HTML.

## Getting Started

This is a static website and does not require a backend server.

1. Download or clone the repository.
2. Keep the HTML, CSS, and JavaScript files in their expected locations.
3. Open `index.html` in a browser to preview the main page.
4. Open `social-link.html` to preview the Social Link Archive.

Some browser behaviors, including local navigation and sound interactions, may vary when opening files directly. Testing through a local static server can provide a more consistent preview.

## Deploying to Neocities

1. Sign in to [Neocities](https://neocities.org/) and open your site's dashboard.
2. Upload or replace the updated files in the appropriate directories:
   - `index.html`
   - `stylev2.css`
   - `script.js`
   - `social-link.html`
   - `social-link.js`
3. Preserve the existing filenames and directory structure.
4. Open your live website and test the main page and Social Link Archive.
5. If an older stylesheet appears, perform a hard refresh using `Ctrl + F5`.

Upload only files required by the website. The README, development notes, and reference materials do not need to be published.

## Customization

- **Portfolio content:** Edit `index.html`.
- **Social Link reflections:** Edit the reflection entries in `social-link.js`.
- **Visual styling:** Edit `stylev2.css`.
- **Shared interactions:** Edit `script.js`.
- **Contact information:** Update the contact configuration in `script.js` and use only an email address you are comfortable publishing.
- **Project links:** Replace existing URLs when your projects or profiles change.

Test your changes locally before publishing them.

## Design Notes

The visual direction draws inspiration from the interface atmosphere of *Persona 3 Portable*, using original CSS artwork, typography, color, and text rather than reproducing game assets.

The project does not include Persona 3 character artwork, logos, game fonts, or soundtrack files. Any optional external font imports may require an internet connection.

## Privacy and Security

This is a static portfolio. It does not include a custom backend, account system, or built-in analytics.

Avoid publishing passwords, API keys, private contact details, or other sensitive information in source files or public repositories.

## License and Credits

Created as a personal portfolio and ongoing web development project.

The original code, writing, and CSS-based visual elements are part of this project. Persona 3 Portable and its associated intellectual property belong to their respective rights holders. This is a fan-inspired design, not an official or affiliated product.

## 🌐 Portfolio Versions

Explore the different versions of my personal portfolio.

- **[Neocities — Main Portfolio](https://kenshidev.neocities.org/)**  
  The original public-facing portfolio, without the Personal Archive section.

- **[GitHub — Personal Archive Edition]([https://github.com/dandorii/kenshi-personal-archive](https://dandorii.github.io/kenshi-portfolio-website/))**  
  The version that includes the Social Link Archive, personal reflections, and hidden memories.

