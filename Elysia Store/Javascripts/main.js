// Image Slider
class Slider {
    constructor(options = {}) {
      const defaults = {
        autoPlay: true,
        interval: 5000,
        pauseOnHover: true,
        keyboardNavigation: true
      };
      
      this.options = {...defaults, ...options};
      this.slides = document.querySelectorAll('.slide');
      this.currentIndex = 0;
      this.autoPlayInterval = null;
      this.isHovering = false;
      
      this.init();
      
      if (this.options.autoPlay) {
        this.startAutoPlay();
      }
    }
  
    init() {
      document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
      document.querySelector('.next').addEventListener('click', () => this.nextSlide());

      if (this.options.keyboardNavigation) {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
        });
      }

      if (this.options.pauseOnHover) {
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => {
          this.isHovering = true;
          this.pauseAutoPlay();
        });
        slider.addEventListener('mouseleave', () => {
          this.isHovering = false;
          if (this.options.autoPlay) this.startAutoPlay();
        });
      }
      
      this.setActiveSlide(this.currentIndex);
    }
  
    startAutoPlay() {
      if (this.autoPlayInterval || this.isHovering) return;
      
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.options.interval);
    }
  
    pauseAutoPlay() {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  
    resetAutoPlay() {
      this.pauseAutoPlay();
      if (this.options.autoPlay && !this.isHovering) {
        this.startAutoPlay();
      }
    }
  
    setActiveSlide(index) {

      if (index < 0) index = this.slides.length - 1;
      if (index >= this.slides.length) index = 0;
      
      this.currentIndex = index;
      
      this.slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        
        if (i === index) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.setAttribute('aria-hidden', 'true');
          if (i < index) {
            slide.classList.add('prev');
          } else {
            slide.classList.add('next');
          }
        }
      });
      
      this.updateARIALiveRegion();
    }
  
    updateARIALiveRegion() {
      const activeSlide = this.slides[this.currentIndex];
      const slideText = activeSlide.querySelector('.slide-content').textContent;

      let liveRegion = document.getElementById('slider-live-region');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'slider-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.overflow = 'hidden';
        liveRegion.style.clip = 'rect(0 0 0 0)';
        liveRegion.style.height = '1px';
        liveRegion.style.width = '1px';
        liveRegion.style.margin = '-1px';
        liveRegion.style.padding = '0';
        liveRegion.style.border = '0';
        document.body.appendChild(liveRegion);
      }
      
      liveRegion.textContent = `Current slide: ${slideText}`;
    }
  
    nextSlide() {
      this.setActiveSlide((this.currentIndex + 1) % this.slides.length);
      this.resetAutoPlay();
    }
  
    prevSlide() {
      this.setActiveSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
      this.resetAutoPlay();
    }
  
    goToSlide(index) {
      if (index >= 0 && index < this.slides.length) {
        this.setActiveSlide(index);
        this.resetAutoPlay();
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new Slider({
      autoPlay: true,
      interval: 5000,
      pauseOnHover: true,
      keyboardNavigation: true
    });
});

/*video-slider*/
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.video-slider-track');
    const slides = document.querySelectorAll('.video-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        const currentSlide = slides[currentIndex];
        const currentVideo = currentSlide.querySelector('video');
        if (currentVideo) {
            currentVideo.play();
        }
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
});

function preventAnchorJump() {
    document.querySelectorAll(
        'a[href="#"], a[href=""], [data-prevent-default]'
    ).forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }, true);
    });
}

document.addEventListener('DOMContentLoaded', preventAnchorJump);
window.addEventListener('load', preventAnchorJump);
// Nut Chat Va To Top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
}

function sendMessage() {
  const input = document.getElementById('chatMessage');
  const message = input.value.trim();
  
  if (message !== '') {
      const chatBody = document.getElementById('chatBody');
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message sent';
      
      const p = document.createElement('p');
      p.textContent = message;
      messageDiv.appendChild(p);
      
      chatBody.appendChild(messageDiv);
      input.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;
      
      setTimeout(() => {
          const replyDiv = document.createElement('div');
          replyDiv.className = 'message received';
          const replyP = document.createElement('p');
          replyP.textContent = 'Cảm ơn tin nhắn của bạn!';
          replyDiv.appendChild(replyP);
          chatBody.appendChild(replyDiv);
          chatBody.scrollTop = chatBody.scrollHeight;
      }, 1000);
  }
}

document.getElementById('chatMessage').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

window.addEventListener('scroll', function() {
  const toTopButton = document.querySelector('.to-top');
  if (window.pageYOffset > 100) {
      toTopButton.classList.add('visible');
  } else {
      toTopButton.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}