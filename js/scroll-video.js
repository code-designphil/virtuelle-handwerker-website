/**
 * Highly inspired by iEeatWebsites: https://www.youtube.com/watch?v=4OcAAj8aqS8
 */

const html = document.documentElement;
const contentElements = document.querySelectorAll('.content');
const canvas = document.querySelector('.video-scrolling');
const arrow = document.querySelector('.arrow');
const progressBar = document.querySelector('.progress-bar');
const context = canvas.getContext('2d');

const currentFrame = index => "resources/frames/video-4k-" + index.toString().padStart(3, '0') + ".webp";

const framesLastIndex = 168;

/**
 * Initializes the canvas and loads the first frame.
 */
canvas.height = 1080;
canvas.width = 1920;
const img = new Image();
img.src = currentFrame(0);
img.onload = () => {
    context.drawImage(img, 0, 0);
}

/**
 * Draws the new frame as an image on the canvas. 
 */
const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
    preloadImages(index);
}

/**
 * Calculates the next frame based on the scroll position and loads it.
 */
window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(framesLastIndex, Math.floor(scrollFraction * framesLastIndex));

    contentElements.forEach(content => {
        const alpha = 1 - frameIndex * 10 / framesLastIndex;
        content.style.backgroundColor = `rgba(0, 0, 0, ${(alpha > 0.4) ? alpha : 0.4})`;
    });

    if (scrollFraction > 0.015) {
        arrow.classList.add('hidden-opacity');
    }

    requestAnimationFrame(() => updateImage(frameIndex));
});

/**
 * Preload all images.
 */
const preloadImages = () => {
    for (let i = 0; i < framesLastIndex; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        
        progressBar.style.width = `${Math.ceil(i / framesLastIndex * 100)}%`;
        setTimeout(() => progressBar.parentElement.classList.add("hidden-opacity"), 1000);
    }
}

preloadImages();