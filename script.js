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