document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    });

    document.querySelectorAll('[class^="fade-in-"]').forEach(el => {
        observer.observe(el);
    });
});