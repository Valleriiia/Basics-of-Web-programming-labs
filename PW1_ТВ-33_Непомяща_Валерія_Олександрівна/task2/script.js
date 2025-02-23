// Отримуємо посилання на елементи введення
const carbonGInput = document.querySelector("#carbon");
const hydrogenGInput = document.querySelector("#hydrogen");
const oxygenGInput = document.querySelector("#oxygen");
const sulfurGInput = document.querySelector("#sulfur");
const warmthGInput = document.querySelector("#warmth");
const wetInput = document.querySelector("#wet");
const ashCInput = document.querySelector("#ash");
const vanadiumGInput = document.querySelector("#vanadium");
const btn = document.querySelector("#submit-btn");
const output = document.querySelector("#output");

// Функція перевіряє коректність введених даних
function isCorrectInput() {
    return (+hydrogenGInput.value + +carbonGInput.value + +sulfurGInput.value + +oxygenGInput.value == 100) &&
            wetInput.value != "" && ashCInput.value != "" && vanadiumGInput.value != "";
}

// Основна функція розрахунку
function calculate(e) {
    e.preventDefault();// Відміна стандартної поведінки форми

    // Якщо дані введені некоректно, виводимо повідомлення про помилку
    if (!isCorrectInput()) {
        output.innerHTML = `<p class="invalid">Поля не повинні бути пустими</p>
                            <p class="invalid">Сума вуглецю, водню, кисню та сірки повинна дорівнювати 100%</p>`
        return;
    }

    // Отримуємо числові значення з інпутів
    const carbonG = +carbonGInput.value;
    const hydrogenG = +hydrogenGInput.value;
    const oxygenG = +oxygenGInput.value;
    const sulfurG = +sulfurGInput.value;
    const warmthG = +warmthGInput.value;
    const wet = +wetInput.value;
    const ashC = +ashCInput.value;
    const vanadiumG = +vanadiumGInput.value;
    
    // Розрахунок зольності робочої маси
    let ashR = ashC * (100 - wet) / 100;

    // Коефіцієнт переходу від горючої до робочої маси
    let coefGR = (100 - wet - ashR) / 100;

    // Розрахунок складу робочої маси
    let carbonR = (carbonG * coefGR).toFixed(2);
    let hydrogenR = (hydrogenG * coefGR).toFixed(2);
    let oxygenR = (oxygenG * coefGR).toFixed(2);
    let sulfurR = (sulfurG * coefGR).toFixed(2);
    let vanadiumR = (vanadiumG * (100 - wet) / 100).toFixed(2);

    // Розрахунок теплоти згоряння для робочої маси
    let warmthR = (warmthG * coefGR - 0.025 * wet).toFixed(2);

    // Виведення результатів у блок output
    output.innerHTML = `
        <hr>
        <p>Для складу горючої маси мазуту: H<sup>г</sup>=${hydrogenG}%; C<sup>г</sup>=${carbonG}%; 
            S<sup>г</sup>=${sulfurG}%; O<sup>г</sup>=${oxygenG}%; V<sup>г</sup>=${vanadiumG} мг/кг; 
            W<sup>р</sup>=${wet}%; A<sup>с</sup>=${ashC}%; та нижчою теплотою згоряння горючої маси мазуту 
            Q<sub>i</sub><sup>daf</sup>=${warmthG} МДж/кг:</p>
        <h2>Склад робочої маси мазуту</h2>
        <p>Водень, H<sup>р</sup>: ${hydrogenR}%</p>
        <p>Вуглець, C<sup>р</sup>: ${carbonR}%</p>
        <p>Сірка, S<sup>р</sup>: ${sulfurR}%</p>
        <p>Кисень, O<sup>р</sup>: ${oxygenR}%</p>
        <p>Ванадій, V<sup>р</sup>: ${vanadiumR} мг/кг</p>
        <p>Зола, A<sup>р</sup>: ${ashR.toFixed(2)}%</p>
        <h2>Теплота згоряння</h2>
        <p>Для робочої маси: ${warmthR} МДж/к</p>
    `;
}

// Обробник події на кнопку
btn.addEventListener("click", calculate);