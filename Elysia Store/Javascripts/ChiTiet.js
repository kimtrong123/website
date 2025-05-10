// Thumbnail
document.addEventListener('DOMContentLoaded', function() {
  const mainImage = document.querySelector('.main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('mouseenter', function() {

          thumbnails.forEach(t => t.classList.remove('active'));
          
          this.classList.add('active');
          
          mainImage.src = this.dataset.full;
          
          mainImage.style.opacity = 0;
          setTimeout(() => {
              mainImage.style.opacity = 1;
          }, 300);
      });
  });
});
// Tăng Giảm Số Lượng
document.querySelectorAll('.quantity-selector').forEach(selector => {
  const minusBtn = selector.querySelector('.quantity-btn:first-of-type'); 
  const plusBtn = selector.querySelector('.quantity-btn:last-of-type'); 
  const input = selector.querySelector('.quantity-input'); 

  function updateQuantity() {
      let quantity = parseInt(input.value);
      if (isNaN(quantity) || quantity < 1) {
          input.value = 1;
      }
  }

  minusBtn.addEventListener('click', () => {
      let value = parseInt(input.value);
      if (value > parseInt(input.min)) {
          input.value = value - 1;
      }
      updateQuantity();
  });

  plusBtn.addEventListener('click', () => {
      let value = parseInt(input.value);
      input.value = value + 1;
      updateQuantity();
  });

  input.addEventListener('change', updateQuantity);
});



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