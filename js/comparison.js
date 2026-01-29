document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    const tableHeaders = document.querySelectorAll('.comparison-table th[data-sort]');
    const tableBody = document.querySelector('.comparison-table tbody');
    let sortDirection = 1;
    
    tableHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const sortBy = this.dataset.sort;
            const rows = Array.from(tableBody.querySelectorAll('tr'));
            
            rows.sort((a, b) => {
                let aValue, bValue;
                
                if (sortBy === 'score') {
                    aValue = parseFloat(a.querySelector('.score-number').textContent);
                    bValue = parseFloat(b.querySelector('.score-number').textContent);
                } else if (sortBy === 'protection') {
                    aValue = parseFloat(a.querySelectorAll('.rating-text')[0].textContent);
                    bValue = parseFloat(b.querySelectorAll('.rating-text')[0].textContent);
                } else if (sortBy === 'performance') {
                    aValue = parseFloat(a.querySelectorAll('.rating-text')[1].textContent);
                    bValue = parseFloat(b.querySelectorAll('.rating-text')[1].textContent);
                } else if (sortBy === 'usability') {
                    aValue = parseFloat(a.querySelectorAll('.rating-text')[2].textContent);
                    bValue = parseFloat(b.querySelectorAll('.rating-text')[2].textContent);
                }
                
                return (aValue - bValue) * sortDirection;
            });
            
            // Переворачиваем направление сортировки
            sortDirection *= -1;
            
            // Обновляем порядок строк
            rows.forEach(row => tableBody.appendChild(row));
            
            // Обновляем номера мест
            updateRankings();
        });
    });
    
    function updateRankings() {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const rankNumber = row.querySelector('.rank-number');
            const rankMedal = row.querySelector('.rank-medal');
            
            rankNumber.textContent = index + 1;
            
            // Обновляем медали
            if (rankMedal) {
                if (index === 0) {
                    rankMedal.className = 'rank-medal gold';
                    rankMedal.textContent = '🥇';
                } else if (index === 1) {
                    rankMedal.className = 'rank-medal silver';
                    rankMedal.textContent = '🥈';
                } else if (index === 2) {
                    rankMedal.className = 'rank-medal bronze';
                    rankMedal.textContent = '🥉';
                } else {
                    rankMedal.className = 'rank-medal';
                    rankMedal.textContent = '';
                }
            }
        });
    }
    
    // Анимация графиков
    const barFills = document.querySelectorAll('.bar-fill');
    
    function animateBars() {
        barFills.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Запускаем анимацию при загрузке
    setTimeout(animateBars, 500);
    
    // Анимация при скролле к графикам
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const charts = document.querySelector('.test-charts');
    if (charts) observer.observe(charts);
});