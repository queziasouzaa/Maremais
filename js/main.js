// Código comum a todas as páginas

// Função para destacar o link ativo no menu
document.addEventListener('DOMContentLoaded', function() {
    // Obter o nome do arquivo atual
    let currentPage = window.location.pathname.split('/').pop() || 'index';
    
    // Remover extensão se houver
    currentPage = currentPage.replace('.html', '');
    
    // Se estiver na raiz, assumir que é index
    if (currentPage === '') {
        currentPage = 'index';
    }
    
    // Encontrar todos os links do menu
    const navLinks = document.querySelectorAll('nav a');
    
    // Remover classe active de todos os links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Obter href do link e remover extensão se houver
        let linkHref = link.getAttribute('href').replace('.html', '');
        
        // Adicionar classe active ao link correspondente
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Caso especial para a página inicial
        if (currentPage === 'index' && (linkHref === 'index' || linkHref === '/' || linkHref === '')) {
            link.classList.add('active');
        }
    });
    
    // Adicionar efeito smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Função utilitária para formatar datas
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

// Função para adicionar animação de fade-in aos elementos
function addFadeInAnimation() {
    const elements = document.querySelectorAll('.card, .location-card, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar animações quando a página carregar
window.addEventListener('load', addFadeInAnimation);