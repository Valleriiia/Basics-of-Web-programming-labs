// Отримання посилань на елементи введення та кнопку
const capacityInput = document.getElementById('capacity'); 
const marginErrorInput = document.getElementById('margin-error');
const priceInput = document.getElementById('price'); 
const btn = document.querySelector("#submit-btn"); 
const output = document.querySelector('#output');

// Функція перевірки, чи всі поля введення заповнені
function isCorrectInput() {
    return (capacityInput.value !== '' && marginErrorInput.value !== '' && priceInput.value !== '');
}

// Основна функція розрахунку прибутку
function calculate(e) {
    e.preventDefault(); // Забороняємо стандартну поведінку форми (перезавантаження сторінки)

    // Перевіряємо, чи всі поля заповнені
    if (!isCorrectInput()) {
        output.innerHTML = `<p class="invalid">Поля не повинні бути пустими</p>`;
        return;
    }

    // Зчитування введених значень та приведення їх до числового формату
    const capacity = +capacityInput.value;
    const marginError = +marginErrorInput.value;
    const price = +priceInput.value;

    // Розрахунок частки енергіїї, що генерується без небалансів
    let p1 = jStat.normal.cdf(5.25, capacity, marginError); // Функція розподілу нормального закону (верхня межа)
    let p2 = jStat.normal.cdf(4.75, capacity, marginError); // Функція розподілу нормального закону (нижня межа)
    let balancedEnergy = +(p1 - p2).toFixed(2); // Різниця між ймовірностями визначає частку енергії без небалансів

    // Обчислення енергії та прибутку
    let w1 = capacity * 24 * balancedEnergy; // Енергія без небалансів (МВт·год)
    let profit = w1 * price; // Дохід 

    let w2 = capacity * 24 * (1 - balancedEnergy); // Енергія з небалансами
    let loss = w2 * price; // Штраф

    let finalProfit = profit - loss; // Чистий прибуток

    // Виведення результатів у HTML
    output.innerHTML = `
    <p>Для сонячної електростанції з середньодобовою потужністю ${capacity} МВт та похибкою прогнозування потужності 
    ${marginError} МВт, при вартості палива ${price} грн/кВт<sup>.</sup>год</p>
    <p>Прибуток: ${finalProfit.toFixed(2)} тис. грн</p>
    `;
}

// Додаємо обробник події на кнопку
btn.addEventListener("click", calculate);
