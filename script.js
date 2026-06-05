/* ─── Dark Mode ─────────────────────────────────────────────────────────── */
const html = document.documentElement;
const darkToggle = document.getElementById('darkModeToggle');

// Default to dark theme for the gaming aesthetic
if (!localStorage.getItem('theme')) {
    html.setAttribute('data-theme', 'dark');
} else {
    html.setAttribute('data-theme', localStorage.getItem('theme'));
}

darkToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

/* ─── Scroll Progress + Navbar ──────────────────────────────────────────── */
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('scrollProgress').style.width =
        `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
});

/* ─── Boot Sequence ─────────────────────────────────────────────────────── */
const bootLines = [
    '> BOOTING PORTFOLIO.EXE...',
    '> LOADING PLAYER DATA...',
    '> NAME.....: SUCHITRA RAJKUMAR',
    '> CLASS....: SOFTWARE ENGINEER',
    '> SPEC.....: AI + FULL STACK',
    '> BASE.....: ILLINOIS TECH, CHICAGO',
    '> QUEST....: INTERNING @ FULCRUM DEFENSE INC.',
    '> STATUS...: [ ONLINE ]',
];

const bootContainer = document.getElementById('bootLines');
const termCursor   = document.getElementById('termCursor');
const heroCtas     = document.getElementById('heroCtas');

let lineIdx = 0;

function showNextLine() {
    if (lineIdx >= bootLines.length) {
        // All lines shown — reveal CTAs
        termCursor.style.display = 'none';
        heroCtas.style.transition = 'opacity 0.5s ease';
        heroCtas.style.opacity = '1';
        return;
    }

    const line = document.createElement('span');
    line.className = 'terminal-line';
    line.textContent = bootLines[lineIdx];

    // Green highlight for the STATUS line
    if (bootLines[lineIdx].includes('ONLINE')) {
        line.style.color = 'var(--green)';
        line.style.textShadow = '0 0 8px var(--green)';
    }

    bootContainer.appendChild(line);
    lineIdx++;

    // Stagger: faster for early lines, pause after LOADING line
    const delay = lineIdx === 2 ? 300 : 160;
    setTimeout(showNextLine, delay);
}

// Small initial pause before boot starts
setTimeout(showNextLine, 600);

/* ─── Scroll Reveal ─────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

/* ─── Project Filter ────────────────────────────────────────────────────── */
function filterProjects(category) {
    const cards   = document.querySelectorAll('.projects-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${category}'`));
    });

    cards.forEach(card => {
        const match = category === 'all' || card.getAttribute('data-category') === category;
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.display = match ? 'flex' : 'none';
            if (match) setTimeout(() => { card.style.opacity = '1'; card.style.transition = 'opacity 0.3s ease'; }, 10);
        }, 100);
    });
}

/* ─── Custom Cursor ─────────────────────────────────────────────────────── */
const dot     = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left     = `${e.clientX}px`;
    dot.style.top      = `${e.clientY}px`;
    outline.style.left = `${e.clientX}px`;
    outline.style.top  = `${e.clientY}px`;
});

document.querySelectorAll('a, button, .filter-btn, .skill-icon, .project-tag, .tech-stack-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.6)';
        outline.style.backgroundColor = 'rgba(0, 255, 65, 0.15)';
    });
    el.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.backgroundColor = 'transparent';
    });
});
