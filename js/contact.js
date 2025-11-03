        document.addEventListener('DOMContentLoaded', function() {
            // Form enhancements
            const form = document.getElementById('contactForm');
            const formInputs = form.querySelectorAll('.form-input');
            
            // Add focus effects
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
            
            // Project type selection
            const projectTypes = document.querySelectorAll('input[name="projectType"]');
            projectTypes.forEach(radio => {
                radio.addEventListener('change', function() {
                    // Remove selected class from all cards
                    document.querySelectorAll('.project-type-card').forEach(card => {
                        card.classList.remove('selected');
                    });
                    
                    // Add selected class to current card
                    if (this.checked) {
                        this.closest('.project-type-card').classList.add('selected');
                    }
                });
            });
            
            // Contact preference selection
            const contactPrefs = document.querySelectorAll('input[name="contactPreference"]');
            contactPrefs.forEach(radio => {
                radio.addEventListener('change', function() {
                    document.querySelectorAll('.preference-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    
                    if (this.checked) {
                        this.closest('.preference-item').classList.add('selected');
                    }
                });
            });
            
            // Set default selections
            document.querySelector('input[name="contactPreference"][value="email"]').closest('.preference-item').classList.add('selected');
            
            // Form submission
            form.addEventListener('submit', function(e) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Simulate processing
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado Exitosamente';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <div class="success-content">
                            <i class="fas fa-check-circle"></i>
                            <h3>¡Mensaje Enviado!</h3>
                            <p>Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>
                        </div>
                    `;
                    
                    form.insertBefore(successMessage, form.firstChild);
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        successMessage.remove();
                        form.reset();
                        
                        // Reset form states
                        document.querySelectorAll('.project-type-card').forEach(card => {
                            card.classList.remove('selected');
                        });
                        document.querySelectorAll('.preference-item').forEach(item => {
                            item.classList.remove('selected');
                        });
                        document.querySelector('input[name="contactPreference"][value="email"]').closest('.preference-item').classList.add('selected');
                        
                    }, 3000);
                }, 1500);
            });
            
            // Smooth scroll for internal links
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });