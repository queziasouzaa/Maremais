// Código para a página de tábua de marés

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade do calendário
    const prevBtn = document.querySelectorAll('.nav-btn')[0];
    const nextBtn = document.querySelectorAll('.nav-btn')[1];
    const monthTitle = document.querySelector('.calendar-header h3');
    
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    let currentMonth = 3; // Abril (0-indexed)
    let currentYear = 2025;
    
    // Navegação do calendário
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
        // Aqui você poderia adicionar lógica para atualizar os dias do calendário
    }
    
    // Destacar próxima maré
    function highlightNextTide() {
        const now = new Date();
        const tideRows = document.querySelectorAll('.tide-table tbody tr');
        
        tideRows.forEach(row => {
            row.classList.remove('next-tide');
        });
        
        // Simular destaque da próxima maré (em um app real, isso seria baseado no horário atual)
        if (tideRows.length > 0) {
            tideRows[0].classList.add('next-tide');
        }
    }
    
    highlightNextTide();
    
    // Adicionar clique nos dias do calendário
    const calendarDays = document.querySelectorAll('.calendar td');
    calendarDays.forEach(day => {
        if (day.textContent.trim() !== '') {
            day.addEventListener('click', function() {
                // Remover seleção anterior
                calendarDays.forEach(d => d.classList.remove('selected'));
                // Adicionar seleção ao dia clicado
                this.classList.add('selected');
                
                // Aqui você poderia carregar as marés do dia selecionado
                console.log(`Dia selecionado: ${this.textContent}`);
            });
        }
    });
    
    // Adicionar tooltip com informações extras
    const tideTypes = document.querySelectorAll('.high-tide, .low-tide');
    tideTypes.forEach(tide => {
        tide.style.cursor = 'help';
        tide.title = tide.classList.contains('high-tide') ? 
            'Maré alta - Ideal para navegação' : 
            'Maré baixa - Ideal para piscinas naturais';
    });
});

// Adicionar estilo para próxima maré
const style = document.createElement('style');
style.textContent = `
    .next-tide {
        background-color: #e6f7f9;
        font-weight: bold;
    }
    
    .tide-table tbody tr {
        transition: background-color 0.3s ease;
    }
    
    .tide-table tbody tr:hover {
        background-color: #f0f8f9;
    }
`;
document.head.appendChild(style);