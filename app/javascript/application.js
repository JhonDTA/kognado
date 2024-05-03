// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "flowbite"
import "flowbite-datepicker"

window.document.addEventListener('turbo:render', (_event) => {
    window.initFlowbite();
    themeToggle();
    showSidebar();
});

// Usar themeToggle en la recarga de la página
document.addEventListener('DOMContentLoaded', function () {
    themeToggle();
    showSidebar();
});

// Function to toggle between dark and light theme
function themeToggle() {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', function () {

        // toggle icons inside button
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }

    })
}

// Function to show the sidebar if the screen is larger than 768px
function showSidebar() {
    const sidebar = document.getElementById('drawer-navigation');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('-translate-x-full');
    }
    if (window.innerWidth <= 768) {
        sidebar.classList.add('-translate-x-full');
    }
}
