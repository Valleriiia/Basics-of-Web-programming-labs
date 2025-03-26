// Отримуємо посилання на всі елементи форми
const coalInput = document.querySelector('#coal');
const oilInput = document.querySelector('#oil');
const gasInput = document.querySelector('#gas');
const btn = document.querySelector("#submit-btn");
const output = document.querySelector('#output');

// Функція перевірки: чи всі поля заповнені
function isCorrectInput() {
    // Перевіряє, що жодне з полів не є порожнім
    return (coalInput.value !== '' && oilInput.value !== '' && gasInput.value !== '');
}

// Основна функція розрахунку
function calculate(e) {
    e.preventDefault(); // Забороняємо перезавантаження сторінки при натисканні кнопки

    // Якщо поля не заповнені – виводимо попередження і зупиняємо виконання
    if (!isCorrectInput()) {
        output.innerHTML = `<p class="invalid">Поля не повинні бути пустими</p>`;
        return;
    }

    // Отримуємо числові значення з полів вводу
    const coal = +coalInput.value;
    const oil = +oilInput.value;
    const gas = +gasInput.value;

    // Розрахунок коефіцієнтів та валових викидів (формули згідно методики)
    let ktvCoal = Math.pow(10, 6) / 20.47 * 0.8 * 25.20 / (100 - 1.5) * (1 - 0.985);
    let etvCoal = Math.pow(10, -6) * ktvCoal * 20.47 * coal;

    let ktvOil = Math.pow(10, 6) / 39.48 * 1 * 0.15 / (100 - 0) * (1 - 0.985);
    let etvOil = Math.pow(10, -6) * ktvOil * 39.48 * oil;

    let ktvGas = Math.pow(10, 6) / 30.08 * 0 * 0 / (100 - 0) * (1 - 0.985); // Фактично дає 0, бо при спалюванні природного газу тверді частинки відсутні
    let etvGas = Math.pow(10, -6) * ktvGas * 30.08 * gas;

    // Виводимо результати на сторінку
    output.innerHTML = `
    <h2>При спалюванні вугілля масою ${coal} т.:</h2>
    <p>Показник емісії твердих частинок: ${ktvCoal.toFixed(2)} г/ГДж</p>
    <p>Валовий викид: ${etvCoal.toFixed(2)} т.</p>

    <h2>При спалюванні мазуту масою ${oil} т.</h2>
    <p>Показник емісії твердих частинок: ${ktvOil.toFixed(2)} г/ГДж</p>
    <p>Валовий викид: ${etvOil.toFixed(2)} т.</p>

    <h2>При спалюванні природного газу об'ємом ${gas} тис. м<sup>3</sup></h2>
    <p>Показник емісії твердих частинок: ${ktvGas.toFixed(2)} г/ГДж</p>
    <p>Валовий викид: ${etvGas.toFixed(2)} т.</p>
    `;
}

// Додаємо обробник події кліку на кнопку
btn.addEventListener("click", calculate);
