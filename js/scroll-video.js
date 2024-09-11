/**
 * Highly inspired by iEeatWebsites: https://www.youtube.com/watch?v=4OcAAj8aqS8
 */

const html = document.documentElement;
const contentElements = document.querySelectorAll('.content');
const canvas = document.querySelector('.video-scrolling');
const arrow = document.querySelector('.arrow-holder');
const context = canvas.getContext('2d');

const currentFrame = index => "resources/frames/video-4k-" + index.toString().padStart(3, '0') + ".jpg";

const framesLastIndex = 336;

let lastLoadedIndex = 0;

/**
 * Initializes the canvas and loads the first frame.
 */
canvas.height = 2160;
canvas.width = 3840;
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
 * If there are only less than 10% of frames left, this function will load the next 17 (5%) frames.
 */
const preloadImages = (currentIndex) => {
    if (!(currentIndex >= lastLoadedIndex * 0.9) || lastLoadedIndex >= framesLastIndex) return;

    for (let i = lastLoadedIndex + 1; i < lastLoadedIndex + 17; i++) {
        const img = new Image();
        if (i > framesLastIndex) {
            lastLoadedIndex = framesLastIndex;
            return;
        }
        img.src = currentFrame(i);
    }

    lastLoadedIndex += 33;
}

preloadImages(0);