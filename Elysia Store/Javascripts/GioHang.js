function calculateGrandTotal() {
    let grandTotal = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const checkbox = item.querySelector('.select-product');
        const totalText = item.querySelector('.total').innerText.replace(/[^\d]/g, '');
        const total = parseFloat(totalText) || 0;

        if (checkbox.checked) {
            grandTotal += total;
        }
    });
    document.getElementById('cart-grand-total').innerText = 'Tổng cộng: ' + grandTotal.toLocaleString() + ' VND';
}

document.querySelectorAll('.cart-item').forEach(item => {
    const minusBtn = item.querySelector('.minus');
    const plusBtn = item.querySelector('.plus');
    const input = item.querySelector('.quantity-input');
    const priceElement = item.querySelector('.price');
    const totalElement = item.querySelector('.total');
    const checkbox = item.querySelector('.select-product');

    const price = parseFloat(priceElement.innerText.replace(/[^\d]/g, ''));

    function updateTotal() {
        let quantity = parseInt(input.value);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
            input.value = 1;
        }
        let total = price * quantity;
        totalElement.innerText = total.toLocaleString() + ' VND';
        calculateGrandTotal();  // tính tổng mỗi khi số lượng thay đổi
    }

    minusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        if (value > parseInt(input.min)) {
            input.value = value - 1;
        }
        updateTotal();
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        input.value = value + 1;
        updateTotal();
    });

    input.addEventListener('change', () => {
        if (input.value < input.min) {
            input.value = input.min;
        }
        updateTotal();
    });

    checkbox.addEventListener('change', calculateGrandTotal);

    updateTotal();
});



// Nut ToTop And ChatBox
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