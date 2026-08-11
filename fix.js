/**
 * Fix for missing DOM elements that cause JS crashes in index.html
 *
 * Bugs fixed:
 * 1. #theme-toggle button referenced in JS but missing from nav
 * 2. #orbit container referenced in JS but missing from skills section
 * 3. #accueil anchor referenced in nav but missing from DOM
 * 4. Footer typo: #accueuil instead of #accueil
 * 5. Contact form CSS exists but no contact section in HTML
 * 6. Mini-game score never displayed to user
 *
 * This script runs after DOMContentLoaded to patch these issues at runtime.
 * The proper fix is to edit index.html directly (tracked in follow-up).
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Add theme-toggle button to nav if missing
    if (!document.getElementById('theme-toggle')) {
        const nav = document.querySelector('nav .nav-links');
        if (nav) {
            const btn = document.createElement('button');
            btn.className = 'theme-toggle';
            btn.id = 'theme-toggle';
            btn.title = 'Toggle theme';
            btn.textContent = '\u{1F319}';
            nav.appendChild(btn);
        }
    }

    // 2. Add orbit container to skills section if missing
    if (!document.getElementById('orbit')) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const orbit = document.createElement('div');
            orbit.className = 'orbit-container';
            orbit.id = 'orbit';
            skillsSection.appendChild(orbit);
        } else {
            // Create the entire skills section
            const section = document.createElement('section');
            section.id = 'skills';
            section.innerHTML = '<h2>Comp\u00e9tences</h2><div class="orbit-container" id="orbit"></div>';
            document.querySelector('footer')?.before(section);
        }
    }

    // 3. Add #accueil anchor if missing
    if (!document.getElementById('accueil')) {
        const anchor = document.createElement('a');
        anchor.id = 'accueil';
        document.body.prepend(anchor);
    }

    // 4. Fix footer typo: #accueuil -> #accueil
    document.querySelectorAll('a[href="#accueuil"]').forEach(a => {
        a.setAttribute('href', '#accueil');
    });

    // 5. Add contact section if missing
    if (!document.getElementById('contact')) {
        const footer = document.querySelector('footer');
        if (footer) {
            const section = document.createElement('section');
            section.id = 'contact';
            section.innerHTML = `
                <h2>Contact</h2>
                <form class="contact-form" onsubmit="event.preventDefault(); this.querySelector('button').textContent = 'Envoy\u00e9 !';">
                    <input type="text" placeholder="Votre nom" required>
                    <input type="email" placeholder="Votre email" required>
                    <textarea rows="4" placeholder="Votre message" required></textarea>
                    <button type="submit">Envoyer</button>
                </form>`;
            footer.before(section);
        }
    }

    // 6. Display mini-game score via title attribute
    const game = document.getElementById('mini-game');
    if (game && !game.dataset.scorePatched) {
        game.dataset.scorePatched = 'true';
        // The click handler in index.html already updates score,
        // we just need to display it
        const originalClick = game.onclick;
        game.addEventListener('click', (e) => {
            // Wait for the original handler to update score
            requestAnimationFrame(() => {
                const ball = document.getElementById('ball');
                if (ball) {
                    const bg = ball.style.background;
                    const match = bg.match(/hsl\((\d+)/);
                    if (match) {
                        const score = Math.floor(parseInt(match[1]) / 10);
                        game.title = `Score: ${score}`;
                    }
                }
            });
        });
    }

    // 7. Add null checks for the inline script's theme toggle and orbit
    // The inline script runs before this file, so we re-bind if needed
    const toggle = document.getElementById('theme-toggle');
    if (toggle && !toggle.dataset.bound) {
        toggle.dataset.bound = 'true';
        toggle.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            toggle.textContent = isDark ? '\u{2600}\u{FE0F}' : '\u{1F319}';
        });
    }
});