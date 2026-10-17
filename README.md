# Kenshi // Personal Archive

A responsive personal website and cybersecurity portfolio inspired by the visual interface of *Persona 3 Portable*. Built with HTML, CSS, and vanilla JavaScript, the site combines a dark blue interface, geometric artwork, animated transitions, interactive navigation, and personal project showcases.

The visual direction is inspired by the game's interface, but the website uses original artwork and CSS effects rather than official *Persona 3* assets. Third-party game and publisher materials are kept separate from the deployable website files.

## Live Website

- **Portfolio:** [Kenshi // Personal Archive](YOUR-NEOCITIES-URL)
- **GitHub:** [github.com/dandorii](https://github.com/dandorii)
- **Featured Project:** [PhishGuard](https://phishguard-ujkh.onrender.com)

Replace `YOUR-NEOCITIES-URL` with your actual Neocities website URL before publishing this README.

## Tech Stack

- **HTML5** — page structure and semantic content
- **CSS3** — responsive layout, visual styling, transitions, and animations
- **Vanilla JavaScript** — interface interactions, synthesized sound effects, boot sequence, local clock, and easter eggs
- **SVG, PNG, and GIF** — decorative graphics and visual assets
- **Google Fonts** — Space Grotesk and DM Mono
- **Press Start 2P** — locally hosted pixel-style heading font

No frontend frameworks, backend services, or build tools are required.

## Features

- Responsive layout for desktop and mobile screens
- Animated boot sequence with a skip option
- Automatic boot-screen bypass for visitors who prefer reduced motion
- Interactive navigation with active-section highlighting
- Optional interface sounds, disabled by default
- Local clock updated every 30 seconds
- Expandable update log and side-quest panels
- Secret mode activated by clicking the KENSHI wordmark five times within approximately 2.5 seconds between clicks
- Keyboard easter egg: type `YORU` to trigger the YORU Terminal card animation
- Progressive enhancement: the main content remains accessible when JavaScript is unavailable
- Personal project showcase, About section, interests, and contact links

## Project Structure

```text
kenshi-personal-archive/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── fonts/
│   │   ├── press-start-2p-latin-400-normal.woff2
│   │   └── OFL-LICENSE-press-start-2p.txt
│   ├── blue-angle-frame.svg
│   ├── crosshair-decoration.svg
│   ├── ui-dots-pattern.svg
│   ├── kenshi-monogram-badge.png
│   ├── p3p-inspired-blue-geometric-background.png
│   ├── menu-selection-arrow.png
│   ├── diagonal-blue-panel-overlay.png
│   ├── animated-blue-boot-loop.gif
│   └── animated-diagonal-wipe.gif
└── README.md
```

The filenames above describe the intended structure. Keep any additional assets referenced by the HTML or CSS in their existing relative locations. The `assets/restricted/` folder and `Website References/` folder are excluded from the public deployment.

## Deployment

This project is a static website and can be hosted on Neocities or another static hosting service.

### Deploy to Neocities

1. Make sure `index.html`, `style.css`, `script.js`, and the required `assets/` files are ready.
2. Open your Neocities site dashboard and launch the file manager.
3. Upload the website files to the site root, preserving the `assets/` directory structure.
4. Do not upload `assets/restricted/` or `Website References/`.
5. Open your live website and perform a hard refresh using `Ctrl + F5`.
6. Test the fonts, background, menu arrow, animations, navigation, and sound toggle.

The README is documentation, not a requirement for the website to run. You may upload it if you want it visible among the site's files, but it is not necessary.

### Store the source on GitHub

1. Commit the website source files and README to your repository.
2. Verify that all assets referenced by the site are included.
3. Exclude restricted third-party materials and unnecessary local reference files.
4. Add the live Neocities URL to the repository description or README.

Uploading changes to GitHub does not automatically update Neocities unless a deployment integration has been configured. Upload updated website files to Neocities separately when necessary.

## Customization Guide

### Update Log

The Update Log section in `index.html` currently contains two placeholder entries. Their dates use the `DD/MM/YYYY` placeholder format.

To add a real entry:

1. Copy an existing `<details class="update-entry">...</details>` block.
2. Replace its `datetime` attribute with the actual date in `YYYY-MM-DD` format.
3. Update the displayed date, title, and body.
4. Remove the `PLACEHOLDER` label.
5. Place the newest entry first and remove any unused templates.

Only publish real updates, completed projects, and verifiable achievements.

### About and Interests

Edit the About section to reflect your current experience, goals, learning process, and interests.

The Side Quests section includes personal interests and collection-related content. The Tabletop Games entry is a placeholder and should be customized to reflect your actual interests.

### Projects and Contact Links

The Transmission and Contact sections contain links to GitHub and the PhishGuard demo.

- GitHub: `https://github.com/dandorii`
- PhishGuard: `https://phishguard-ujkh.onrender.com`

Update these links if your accounts or deployments change. The PhishGuard demo may take a little time to respond after inactivity on its free hosting plan.

No email address is currently published. If you choose to add one, use a `mailto:` link and only publish an address you are comfortable making public.

### Now-Playing Panel

The Now-Playing panel is currently a visual interface rather than a functional music player. Its playback controls remain disabled, and the interface indicates that playback is unavailable.

To enable music playback in the future, use audio you have permission to distribute and implement the required playback functionality. Include relevant licensing information. The website does not autoplay music.

### Interface Sounds

Interface sounds are generated using the Web Audio API. They are controlled by the site's sound toggle and are disabled by default.

The site can generate short synthesized tones without requiring separate audio files. Browser policies may require a visitor to interact with the page before audio can play.

## Assets, Licenses, and Attribution

### Original Artwork

The following project graphics are intended to be original assets created for this website:

- `p3p-inspired-blue-geometric-background.png`
- `menu-selection-arrow.png`
- `diagonal-blue-panel-overlay.png`
- `blue-angle-frame.svg`
- `crosshair-decoration.svg`
- `ui-dots-pattern.svg`
- `kenshi-monogram-badge.png`
- `animated-blue-boot-loop.gif`
- `animated-diagonal-wipe.gif`

The asset pack's accompanying README permits personal website use without attribution. Retain that documentation if you need to verify the asset terms.

### Heading Font

**Press Start 2P** is provided by The Press Start 2P Project Authors and is used under the SIL Open Font License, version 1.1.

- Font page: https://fonts.google.com/specimen/Press+Start+2P
- Local file: `assets/fonts/press-start-2p-latin-400-normal.woff2`
- License: `assets/fonts/OFL-LICENSE-press-start-2p.txt`

The font file is unmodified. Keep the license file alongside the font when distributing or deploying it.

### Body Fonts and External Requests

Space Grotesk and DM Mono are loaded through Google Fonts using the `@import` statement at the top of `style.css`.

When the fonts are requested, visitors' browsers connect to Google's font servers, including `fonts.googleapis.com` and `fonts.gstatic.com`. Those requests may expose visitors' IP addresses and standard connection information to Google.

To avoid the external font requests, remove the Google Fonts `@import` statement. The stylesheet's system-font fallbacks will keep the website readable.

### Restricted Files — Local Only

The local `assets/restricted/` folder contains 42 files from `assets_2.zip`. These files are not referenced by the deployed website and must not be uploaded as part of this project.

They include:

- *Persona 3 Reload* portrait components and promotional GIFs associated with ATLUS and Xbox
- The *Persona 3 Portable* title-screen GIF, `p3p-menu.gif`, containing official game branding
- A profile illustration whose origin and usage rights have not been confirmed
- Gradius III sound effects associated with Konami

Keep these materials separate from the public website unless you have confirmed the relevant usage rights. Do not assume that publicly accessible material is free to redistribute.

The live site is designed to use its own original graphics and synthesized interface sounds instead.

## Privacy and Accessibility

- No backend or database is required.
- No account registration or login system is included.
- No analytics or tracking scripts are intentionally included.
- Interface sounds are opt-in and disabled by default.
- Visitors who prefer reduced motion automatically skip the boot sequence.
- Navigation and expandable sections support standard browser keyboard interaction.
- The page includes a non-JavaScript fallback so the main content remains visible when JavaScript is unavailable.

The Google Fonts integration does make external requests, as explained in the font section above.

## Development Notes

This project was built as a personal portfolio and front-end learning exercise, combining web development with cybersecurity project presentation and interface experimentation.

The source code is intentionally lightweight: HTML, CSS, and vanilla JavaScript, with no framework or build step.

## License

Unless a separate license is provided for a particular asset or dependency, do not assume that every part of this repository is licensed for unrestricted reuse. Third-party fonts and assets remain subject to their respective licenses.

For reuse or redistribution of individual graphics, verify their source and applicable terms first.

- **Portfolio:** [Kenshi // Personal Archive](YOUR-NEOCITIES-URL)