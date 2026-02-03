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

function setMode(mode) {
    const track = document.querySelector('.toggle-track');
    const btns = document.querySelectorAll('.toggle-btn');
    
    // these are the sections we want to swap
    const techContent = document.querySelectorAll('.experience, .projects');
    const personalContent = document.querySelector('#personal-section');

    if (mode === 'dark' || mode === 'non-tech') {
        // ui toggle state
        track.classList.add('non-tech-active');
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
        
        // hide tech, show personal
        techContent.forEach(el => el.style.display = 'none');
        if (personalContent) {
            personalContent.style.display = 'block';
        }
    } else {
        // ui toggle state
        track.classList.remove('non-tech-active');
        btns[1].classList.remove('active');
        btns[0].classList.add('active');
        
        // show tech, hide personal
        techContent.forEach(el => el.style.display = 'block');
        if (personalContent) {
            personalContent.style.display = 'none';
        }
    }
}

// this ensures the cursor reacts to the new toggle buttons too
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.backgroundColor = 'white';
    });
    btn.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.backgroundColor = 'transparent';
    });
});