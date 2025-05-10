
document.addEventListener('DOMContentLoaded', function() {
    const applyBtn = document.querySelector('.discount-code button');
    const discountInput = document.querySelector('.discount-code input');
    
    applyBtn.addEventListener('click', function() {
        if (discountInput.value.trim() === '') {
            alert('Please enter a discount code');
        } else {
            alert('Discount code applied: ' + discountInput.value);
        }
    });
    window.addEventListener('scroll', function() {
        const cartColumn = document.querySelector('.cart-column');
        const container = document.querySelector('.container');
        const footerHeight = 50; 
        
        const containerRect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const maxTop = viewportHeight - cartColumn.offsetHeight - footerHeight;
        
        if (containerRect.bottom < viewportHeight) {
            cartColumn.style.top = 'auto';
            cartColumn.style.bottom = '20px';
        } else {
            cartColumn.style.top = '20px';
            cartColumn.style.bottom = 'auto';
        }
    });
});