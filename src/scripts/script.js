const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        const form = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');
        const typingElement = document.getElementById('typing-text');
        const scrollToTopBtn = document.getElementById('scroll-to-top');

        // Conteúdo para o Efeito Digitação
        const typingContent = "Desenvolvimento Front-end, Design e Inovação.";

        // --- FUNCIONALIDADE 1: EFEITO DIGITAÇÃO (Typing Animation) ---
        function typeWriter() {
            typingElement.textContent = typingContent;
        }
        window.onload = typeWriter;


        // --- FUNCIONALIDADE 2: ALTERNAR TEMA CLARO/ESCURO ---
        
        // Verifica a preferência do usuário ou o que foi salvo no localStorage
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        // Inicializa o tema baseado na preferência salva ou do sistema
        if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
            body.classList.add('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            body.classList.remove('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            
            // Alterna ícones
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');

            // Salva a preferência no localStorage
            if (body.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        // --- FUNCIONALIDADE 3: VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let errors = [];

            if (name === '') {
                errors.push('O campo Nome Completo é obrigatório.');
            }
            if (email === '') {
                errors.push('O campo Email é obrigatório.');
            } 
            else if (!email.includes('@') || !email.includes('.')) {
                errors.push('Por favor, insira um email válido.');
            }
            if (message === '') {
                errors.push('O campo Mensagem é obrigatório.');
            }

            // Exibir resultado da validação
            formMessage.classList.remove('hidden');
            
            if (errors.length > 0) {
                formMessage.className = 'form-message error';
                formMessage.innerHTML = 'Houve erros de validação:<br>' + errors.join('<br>');
            } else {
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Mensagem enviada com sucesso! (Apenas simulação)';
                form.reset(); // Limpa o formulário após o "envio"
            }
        });


        // --- FUNCIONALIDADE 4: EXIBIR/ESCONDER DETALHES DO PROJETO ---
        function toggleDetails(projectId) {
            const details = document.getElementById(projectId + '-details');
            if (details.classList.contains('hidden')) {
                details.classList.remove('hidden');
            } else {
                details.classList.add('hidden');
            }
        }
        window.toggleDetails = toggleDetails;


        // --- FUNCIONALIDADE 5: BOTÃO VOLTAR AO TOPO ---
        
        // Mostrar/Esconder o botão ao rolar a página
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        // Funcionalidade de rolagem suave
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Correção para classes hidden no CSS puro
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach(el => {
            if (el.id !== 'sun-icon') {
                 // Deixa o JS gerenciar a visibilidade do botão 'sun-icon'
                el.classList.remove('hidden');
                el.style.display = 'none';
            }
        });
        