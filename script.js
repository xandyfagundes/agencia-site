document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // AI Widget Interaction
    const widgetTrigger = document.getElementById('ai-widget-trigger');
    const demoTrigger = document.getElementById('demo-trigger');
    const widgetWindow = document.querySelector('.ai-widget-window');
    const widgetClose = document.getElementById('ai-widget-close');
    const chatInput = document.getElementById('ai-input');
    const sendButton = document.getElementById('ai-send');
    const chatMessages = document.getElementById('ai-chat-messages');

    // Toggle Widget
    function toggleWidget() {
        widgetWindow.classList.toggle('open');
        const alertBadge = widgetTrigger.querySelector('.files-alert');
        if (alertBadge) {
            alertBadge.style.display = 'none'; // Hide notification badge on open
        }
    }

    if (widgetTrigger) widgetTrigger.addEventListener('click', toggleWidget);
    if (demoTrigger) demoTrigger.addEventListener('click', toggleWidget);
    if (widgetClose) widgetClose.addEventListener('click', toggleWidget);

    // Chat functionality
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleSendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, true);
        chatInput.value = '';

        // Simulate AI Thinking
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'ai-message');
        loadingDiv.textContent = 'Digitando...';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Placeholder for n8n Webhook
            // const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ message: text })
            // });
            // const data = await response.json();

            // Simulation response for now
            setTimeout(() => {
                loadingDiv.remove();
                addMessage("Esta é uma demonstração. Em breve estarei conectado ao seu cérebro de IA no n8n para responder com dados reais da sua agência!");
            }, 1500);

        } catch (error) {
            loadingDiv.remove();
            addMessage("Desculpe, tive um erro de conexão momentâneo.");
        }
    }

    if (sendButton) {
        sendButton.addEventListener('click', handleSendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to elements
    document.querySelectorAll('.feature-card, .solution-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});