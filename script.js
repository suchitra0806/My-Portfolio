const sidemenu = document.querySelector('#sidemenu');

function open_menu() {
    sidemenu.style.transform = 'translateX(-16rem)';
}

function close_menu() {
    sidemenu.style.transform = 'translateX(16rem)';
}