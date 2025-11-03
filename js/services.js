 document.addEventListener('DOMContentLoaded', function() {
            // FAQ Functionality
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                question.addEventListener('click', function() {
                    const isOpen = item.classList.contains('open');
                    
                    // Cerrar todos los otros items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                            otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                            otherItem.querySelector('i').style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle current item
                    if (isOpen) {
                        item.classList.remove('open');
                        answer.style.maxHeight = '0';
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        item.classList.add('open');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            });
            
            // Service Detail Modals (placeholder - can be expanded)
            const detailButtons = document.querySelectorAll('[data-service]');
            detailButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const service = this.getAttribute('data-service');
                    // Here you can implement modal functionality or navigation
                    console.log('Show details for:', service);
                });
            });
            
            // Form Enhancement
            const form = document.getElementById('serviceQuoteForm');
            const formInputs = form.querySelectorAll('.form-input');
            
            // Add focus/blur effects
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if already has value
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
                // Add loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitButton.disabled = true;
                
                // Simulate delay (in real implementation, this would be handled by email service)
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado';
                    
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                }, 1000);
            });
            
            // Smooth scroll to form when clicking quote buttons
            const quoteButtons = document.querySelectorAll('a[href="#quote-form"]');
            quoteButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const form = document.getElementById('quote-form');
                    form.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pre-select service type if button has data-service
                    const serviceType = this.closest('.service-card')?.id;
                    if (serviceType) {
                        const serviceSelect = document.getElementById('serviceType');
                        serviceSelect.value = serviceType;
                        serviceSelect.parentElement.classList.add('focused');
                    }
                });
            });
        });