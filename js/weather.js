// weather.js - Código específico para a página de previsão do tempo

document.addEventListener('DOMContentLoaded', function() {
    // Dados simulados de previsão do tempo
    const weatherData = {
        'Maceió': {
            current: { temp: 29, min: 27, condition: '☀️' },
            forecast: [
                { day: 'Sáb', temp: 31, min: 25, condition: '🌤️' },
                { day: 'Dom', temp: 30, min: 25, condition: '☀️' },
                { day: 'Seg', temp: 28, min: 24, condition: '🌧️' },
                { day: 'Ter', temp: 29, min: 24, condition: '🌧️' },
                { day: 'Qua', temp: 30, min: 25, condition: '🌤️' },
                { day: 'Qui', temp: 30, min: 26, condition: '☀️' }
            ]
        },
        'Arapiraca': {
            current: { temp: 32, min: 28, condition: '☀️' },
            forecast: [
                { day: 'Sáb', temp: 33, min: 27, condition: '☀️' },
                { day: 'Dom', temp: 32, min: 26, condition: '☀️' },
                { day: 'Seg', temp: 30, min: 25, condition: '🌤️' },
                { day: 'Ter', temp: 31, min: 25, condition: '🌤️' },
                { day: 'Qua', temp: 32, min: 26, condition: '☀️' },
                { day: 'Qui', temp: 33, min: 27, condition: '☀️' }
            ]
        }
    };
    
    let currentCity = 'Maceió';
    
    // Seletor de localização
    const locationSelector = document.querySelector('.location-selector');
    const cityNameElements = document.querySelectorAll('.city-name, .location-selector h2');
    
    if (locationSelector) {
        locationSelector.addEventListener('click', function() {
            // Alternar entre cidades
            currentCity = currentCity === 'Maceió' ? 'Arapiraca' : 'Maceió';
            updateWeatherDisplay();
        });
    }
    
    // Atualizar exibição do tempo
    function updateWeatherDisplay() {
        const data = weatherData[currentCity];
        
        // Atualizar nome da cidade
        cityNameElements.forEach(el => {
            if (el.textContent !== currentCity) {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = currentCity;
                    el.style.opacity = '1';
                }, 200);
            }
        });
        
        // Atualizar temperatura atual
        const tempMain = document.querySelector('.temp-main');
        const tempRange = document.querySelector('.temp-range');
        const weatherIcon = document.querySelector('.weather-icon');
        
        if (tempMain) tempMain.textContent = `${data.current.temp}°`;
        if (tempRange) tempRange.textContent = `${data.current.min}°`;
        if (weatherIcon) weatherIcon.textContent = data.current.condition;
        
        // Atualizar previsão semanal
        const dayForecasts = document.querySelectorAll('.day-forecast');
        dayForecasts.forEach((day, index) => {
            if (data.forecast[index]) {
                const forecast = data.forecast[index];
                day.querySelector('h4').textContent = forecast.day;
                day.querySelector('.weather-small').textContent = forecast.condition;
                day.querySelector('.temp-high').textContent = `${forecast.temp}°`;
                day.querySelector('.temp-low').textContent = `${forecast.min}°`;
            }
        });
    }
    
    // Adicionar animação ao carregar
    const weatherContent = document.querySelector('.weather-content');
    if (weatherContent) {
        weatherContent.style.opacity = '0';
        setTimeout(() => {
            weatherContent.style.transition = 'opacity 0.5s ease';
            weatherContent.style.opacity = '1';
        }, 100);
    }
    
    // Navegação do calendário (reutilizando lógica similar ao tide.js)
    const prevBtn = document.querySelectorAll('.nav-btn')[0];
    const nextBtn = document.querySelectorAll('.nav-btn')[1];
    const monthTitle = document.querySelector('.calendar-header h3');
    
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    let currentMonth = 3; // Abril
    let currentYear = 2025;
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
        
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
    }
    
    function updateCalendar() {
        if (monthTitle) {
            monthTitle.textContent = `${months[currentMonth]} ${currentYear}`;
        }
    }
    
    // Simular atualização em tempo real
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Você poderia adicionar um elemento para mostrar a última atualização
        console.log(`Última atualização: ${timeString}`);
    }, 60000); // Atualizar a cada minuto
});

// Adicionar estilos dinâmicos
const style = document.createElement('style');
style.textContent = `
    .location-selector:hover {
        background-color: #f0f8f9;
        border-radius: 10px;
        padding: 5px 10px;
        margin: -5px -10px;
    }
    
    .day-forecast {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .day-forecast:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .temp-main, .temp-range, .city-name {
        transition: opacity 0.2s ease;
    }
`;
document.head.appendChild(style);