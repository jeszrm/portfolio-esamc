document.addEventListener('DOMContentLoaded', () => {
            const html = document.documentElement;
            const themeToggle = document.getElementById('themeToggle');
            const sunIcon = document.getElementById('sunIcon');
            const moonIcon = document.getElementById('moonIcon');
            const mobileMenu = document.getElementById('mobileMenu');
            const menuButton = document.getElementById('menuButton');
            const menuLinks = document.querySelectorAll('#mobileMenu .menu-link');
            const scrollTopBtn = document.getElementById('scrollTopBtn');
            const contactForm = document.getElementById('contactForm');
            const statusMessage = document.getElementById('statusMessage');
            const currentYear = document.getElementById('currentYear');

            // 1. Inicializa o ano no rodapé
            currentYear.textContent = new Date().getFullYear();

            // ====================================
            // 2. TEMA CLARO / ESCURO
            // ====================================

            // Checa a preferência do sistema ou o localStorage
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                html.classList.add('dark');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                html.classList.remove('dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }

            themeToggle.addEventListener('click', () => {
                html.classList.toggle('dark');
                const isDark = html.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                sunIcon.style.display = isDark ? 'block' : 'none';
                moonIcon.style.display = isDark ? 'none' : 'block';
            });

            // ====================================
            // 3. MENU MOBILE
            // ====================================
            
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
            });

            // Fecha o menu móvel ao clicar em um link
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                });
            });


            // ====================================
            // 4. SCROLL TO TOP
            // ====================================

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            });

            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // ====================================
            // 5. VALIDAÇÃO DO FORMULÁRIO
            // ====================================

            const inputs = {
                name: document.getElementById('name'),
                email: document.getElementById('email'),
                subject: document.getElementById('subject'),
                message: document.getElementById('message')
            };

            const errorMessages = {
                name: document.getElementById('nameError'),
                email: document.getElementById('emailError'),
                subject: document.getElementById('subjectError'),
                message: document.getElementById('messageError')
            };

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            function validateField(input, errorElement, customValidation = null) {
                const value = input.value.trim();
                let isValid = true;
                
                input.classList.remove('input-error');
                errorElement.style.display = 'none';

                if (value === '') {
                    isValid = false;
                    errorElement.textContent = `O campo ${input.id === 'email' ? 'Email' : 'é obrigatório'}.`;
                } else if (input.id === 'email' && !emailRegex.test(value)) {
                    isValid = false;
                    errorElement.textContent = 'Por favor, insira um email válido.';
                } else if (customValidation && !customValidation(value)) {
                    isValid = false;
                }

                if (!isValid) {
                    input.classList.add('input-error');
                    errorElement.style.display = 'block';
                }
                
                return isValid;
            }

            // Adiciona validação em tempo real (on blur)
            inputs.name.addEventListener('blur', () => validateField(inputs.name, errorMessages.name));
            inputs.email.addEventListener('blur', () => validateField(inputs.email, errorMessages.email));
            inputs.subject.addEventListener('blur', () => validateField(inputs.subject, errorMessages.subject));
            inputs.message.addEventListener('blur', () => validateField(inputs.message, errorMessages.message));

            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                statusMessage.style.display = 'none';
                let isFormValid = true;

                // Valida todos os campos
                isFormValid &= validateField(inputs.name, errorMessages.name);
                isFormValid &= validateField(inputs.email, errorMessages.email);
                isFormValid &= validateField(inputs.subject, errorMessages.subject);
                isFormValid &= validateField(inputs.message, errorMessages.message);

                if (isFormValid) {
                    // Simulação de envio bem-sucedido
                    console.log('Dados do formulário:', {
                        name: inputs.name.value.trim(),
                        email: inputs.email.value.trim(),
                        subject: inputs.subject.value.trim(),
                        message: inputs.message.value.trim()
                    });

                    statusMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                    statusMessage.classList.remove('status-error');
                    statusMessage.classList.add('status-success');
                    statusMessage.style.display = 'block';
                    
                    contactForm.reset();
                    
                } else {
                    // Feedback de erro (já coberto pela validação de campo)
                    statusMessage.textContent = 'Por favor, corrija os erros no formulário antes de enviar.';
                    statusMessage.classList.remove('status-success');
                    statusMessage.classList.add('status-error');
                    statusMessage.style.display = 'block';
                }
            });
        });