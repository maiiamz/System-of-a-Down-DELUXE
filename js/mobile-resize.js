// Handle window resize for responsive background image
window.addEventListener('resize', () => {
    if (typeof calculateResponsiveImage === 'function') {
        calculateResponsiveImage();
        if (typeof resizeCanvas === 'function') {
            resizeCanvas(windowWidth, windowHeight);
        }
    }
});
