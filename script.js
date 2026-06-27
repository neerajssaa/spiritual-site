document.getElementById('year').textContent = new Date().getFullYear();

function initCarousel(options) {
  const { containerSelector, slideSelector, dotSelector, prevSelector, nextSelector, interval = 6000 } = options;
  const container = document.querySelector(containerSelector);

  if (!container) {
    return;
  }

  const slides = Array.from(container.querySelectorAll(slideSelector));
  const dots = Array.from(container.querySelectorAll(dotSelector));
  const prev = container.querySelector(prevSelector);
  const next = container.querySelector(nextSelector);
  let currentIndex = 0;
  let timer;

  function showSlide(index, shouldScroll = false) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle('active', isActive);

      if (shouldScroll && isActive) {
        slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentIndex);
    });
  }

  function startAutoPlay() {
    clearInterval(timer);
    timer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, interval);
  }

  if (prev && next) {
    prev.addEventListener('click', () => {
      showSlide(currentIndex - 1, true);
      startAutoPlay();
    });

    next.addEventListener('click', () => {
      showSlide(currentIndex + 1, true);
      startAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index, true);
      startAutoPlay();
    });
  });

  showSlide(0);
  startAutoPlay();
}

initCarousel({
  containerSelector: '#heroCarousel',
  slideSelector: '.hero-slide',
  dotSelector: '.hero-dots .dot',
  prevSelector: '#heroPrev',
  nextSelector: '#heroNext',
  interval: 6000
});

initCarousel({
  containerSelector: '#imageGallery',
  slideSelector: '.gallery-slide',
  dotSelector: '#galleryDots .dot',
  prevSelector: '#galleryPrev',
  nextSelector: '#galleryNext',
  interval: 7000
});

initCarousel({
  containerSelector: '#videoGallery',
  slideSelector: '.video-slide',
  dotSelector: '#videoDots .dot',
  prevSelector: '#videoPrev',
  nextSelector: '#videoNext',
  interval: 8000
});

const featuredStories = document.querySelectorAll('#featuredStoriesSlider .featured-slide');
const storiesPrev = document.getElementById('storiesPrev');
const storiesNext = document.getElementById('storiesNext');
let featuredIndex = 0;

function showFeaturedStory(index) {
  featuredIndex = (index + featuredStories.length) % featuredStories.length;
  featuredStories.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === featuredIndex);
  });
}

if (storiesPrev && storiesNext && featuredStories.length) {
  storiesPrev.addEventListener('click', () => showFeaturedStory(featuredIndex - 1));
  storiesNext.addEventListener('click', () => showFeaturedStory(featuredIndex + 1));
  showFeaturedStory(0);
}
