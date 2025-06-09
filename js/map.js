// map.js - Código específico para a página com mapa

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar funcionalidade ao botão "Ver mapa ampliado"
    const mapLink = document.querySelector('.directions');
    if (mapLink) {
        mapLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Abrir o Google Maps em uma nova aba
            window.open('https://www.google.com/maps/place/Piscinas+Naturais+de+Paju%C3%A7ara/@-9.700963764494535,-35.008089423403595,17z', '_blank');
        });
    }
    
    // Ajustar altura do iframe do mapa em dispositivos móveis
    function adjustMapHeight() {
        const mapIframe = document.querySelector('.mapa iframe');
        if (mapIframe && window.innerWidth <= 768) {
            mapIframe.style.height = '250px';
        } else if (mapIframe) {
            mapIframe.style.height = '300px';
        }
    }
    
    // Chamar função no carregamento e redimensionamento
    adjustMapHeight();
    window.addEventListener('resize', adjustMapHeight);
    
    // Adicionar informações dinâmicas sobre as piscinas naturais
    const infoCards = document.querySelectorAll('.info-card');
    
    // Simular carregamento de notícias
    if (infoCards.length > 1) {
        const newsCard = infoCards[1];
        const newsContent = [
            "Maré baixa ideal para visitar as piscinas naturais hoje às 12:30",
            "Condições perfeitas para mergulho nas próximas 3 horas",
            "Ventos fracos garantem mar calmo durante toda a tarde"
        ];
        
        // Rotacionar notícias
        let currentNews = 0;
        setInterval(() => {
            const p = newsCard.querySelector('p');
            if (p) {
                currentNews = (currentNews + 1) % newsContent.length;
                p.style.opacity = '0';
                setTimeout(() => {
                    p.textContent = newsContent[currentNews];
                    p.style.opacity = '1';
                }, 300);
            }
        }, 5000);
    }
});