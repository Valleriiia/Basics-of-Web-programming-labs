function calculateReliability(e) {
    e.preventDefault();
    // Отримання вхідних даних для одноколової системи
    const w_breaker110 = +document.getElementById('breaker110').value;
    const w_line110 = +document.getElementById('line110').value;
    const w_transformer = +document.getElementById('transformer').value;
    const w_breaker10 = +document.getElementById('breaker10').value;
    const w_connection = +document.getElementById('connections').value;
    const numConnections = +document.getElementById('numConnections').value;
    
    // Час відновлення
    const t_breaker110 = +document.getElementById('t_breaker110').value;
    const t_line110 = +document.getElementById('t_line110').value;
    const t_transformer = +document.getElementById('t_transformer').value;
    const t_breaker10 = +document.getElementById('t_breaker10').value;
    const t_connection = +document.getElementById('t_connections').value;
    
    // Плановий простій
    const plannedOutage = +document.getElementById('plannedOutage').value;
    
    // Параметри двоколової системи
    const w_sectionBreaker = +document.getElementById('sectionBreaker').value;

    //Вивід
    const output = document.getElementById('reliability-result');
    
    // Розрахунок параметрів одноколової системи
    const w_oc = w_breaker110 + w_line110 + w_transformer + w_breaker10 + (w_connection * numConnections);
    const t_oc = (w_breaker110 * t_breaker110 + w_line110 * t_line110 + w_transformer * t_transformer + 
                 w_breaker10 * t_breaker10 + (w_connection * numConnections * t_connection)) / w_oc;
    const k_emergency_oc = (w_oc * t_oc) * Math.pow(10, -3);
    const k_planned_oc = 1.2 * (plannedOutage) * Math.pow(10, -3);
    
    // Розрахунок параметрів двоколової системи
    const w_dk = 2 * w_oc * (k_emergency_oc + k_planned_oc);
    const w_ds = w_dk + w_sectionBreaker;
    const t_ds = t_oc * 0.7; // Припущення
    const k_emergency_ds = (w_ds * t_ds) * Math.pow(10, -3);
    const k_planned_ds = k_planned_oc * 0.8; // Припущення

    output.innerHTML = `
    <h3>Одноколова система</h3>
    <p>Частота відмов: ${w_oc.toFixed(3)} рік⁻¹</p>
    <p>Середній час відновлення: ${t_oc.toFixed(1)} год</p>
    <p>Коефіцієнт аварійного простою: ${k_emergency_oc.toExponential(2)}</p>
    <p>Коефіцієнт планового простою: ${k_planned_oc.toExponential(2)}</p>

    <h3>Двоколова система</h3>
    <p>Частота відмов:  ${w_ds.toFixed(4)} рік⁻¹</p>
    <p>Середній час відновлення: ${t_ds.toFixed(1)} год</p>
    <p>Коефіцієнт аварійного простою: ${k_emergency_ds.toExponential(2)}</p>
    <p>Коефіцієнт планового простою: ${k_planned_ds.toExponential(2)}</p>
    `

    if (w_ds < w_oc) {
        output.innerHTML += '<p class="conclusion"><strong>Висновок:</strong> Двоколова система електропередачі є значно надійнішою за одноколову</p>';
    } else {
        output.innerHTML += '<p class="conclusion"><strong>Висновок:</strong> Одноколова система демонструє кращі показники надійності за двоколову</p>';
    }
}

function calculateLosses(e) {
    e.preventDefault();
    // Отримання вхідних даних
    const failureRate = +document.getElementById('failureRate').value;
    const recoveryTime = +document.getElementById('recoveryTime').value;
    const plannedOutageTime = +document.getElementById('plannedOutageTime').value;
    const maxLoad = +document.getElementById('maxLoad').value;
    const usageTime = +document.getElementById('usageTime').value;
    const emergencyLossRate = +document.getElementById('emergencyLossRate').value;
    const plannedLossRate = +document.getElementById('plannedLossRate').value;
    const output = document.getElementById('losses-result');
    
    // Розрахунок аварійного недовідпущення
    const emergencyUndersupply = failureRate * recoveryTime * maxLoad * usageTime;
    
    // Розрахунок планового недовідпущення
    const plannedUndersupply = plannedOutageTime * maxLoad * usageTime;
    
    // Розрахунок збитків
    const emergencyLosses = emergencyLossRate * emergencyUndersupply;
    const plannedLosses = plannedLossRate * plannedUndersupply;
    const totalLosses = emergencyLosses + plannedLosses;
    
    // Відображення результатів
    output.innerHTML = `
    <p>Аварійне недовідпущення електроенергії: ${emergencyUndersupply.toFixed(0)} кВт·год/рік</p>
    <p>Планове недовідпущення електроенергії: ${plannedUndersupply.toFixed(0)} кВт·год/рік</p>
    <p>Загальні збитки від перерв: ${totalLosses.toFixed(0)} грн/рік</p>
    `
}

document.getElementById('reliability-btn').addEventListener('click', calculateReliability);
document.getElementById('losses-btn').addEventListener('click', calculateLosses);