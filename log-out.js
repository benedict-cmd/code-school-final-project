const LOGGED_IN_KEY = 'loggedIn';

function logoutUser() {
    localStorage.removeItem(LOGGED_IN_KEY);
    window.location.href = 'sign.html';
}

window.logoutUser = logoutUser;

const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
} else {
    console.warn('Logout button not found');
}
