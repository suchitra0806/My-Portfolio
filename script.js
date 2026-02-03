function filterProjects(category) {
    const cards = document.querySelectorAll('.projects-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });
    cards.forEach(card => {
        card.style.opacity = '0';
        setTimeout(() => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.display = 'none';
            }
        }, 100);
    });
}

const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.style.left = `${posX}px`;
    outline.style.top = `${posY}px`;
});

const links = document.querySelectorAll('a, button, .tech-stack i, .filter-btn');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.backgroundColor = 'white';
    });
    link.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.backgroundColor = 'transparent';
    });
});