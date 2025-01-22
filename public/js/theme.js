document.addEventListener('DOMContentLoaded', function() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    window.toggleTheme = function() {
        const newTheme = (document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
        setTheme(newTheme);
    };

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
});