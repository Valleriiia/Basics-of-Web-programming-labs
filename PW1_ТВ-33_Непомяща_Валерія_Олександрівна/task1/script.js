// Отримання елементів форми за їхніми ідентифікаторами
const hydrogenRInput = document.querySelector("#hydrogen-r");
const carbonRInput = document.querySelector("#carbon-r");
const sulfurRInput = document.querySelector("#sulfur-r");
const nitrogenRInput = document.querySelector("#nitrogen-r");
const oxygenRInput = document.querySelector("#oxygen-r");
const wetRInput = document.querySelector("#wet-r");
const ashRInput = document.querySelector("#ash-r");
const btn = document.querySelector("#submit-btn");
const output = document.querySelector("#output");

// Функція перевіряє, чи сума всіх компонентів дорівнює 100%
function isCorrectInput() {
    return +hydrogenRInput.value + +carbonRInput.value + +sulfurRInput.value + 
    +nitrogenRInput.value + +oxygenRInput.value + +wetRInput.value + +ashRInput.value == 100;
}

// Основна функція розрахунку
function calculate(e) {
    e.preventDefault();// Відміна стандартної поведінки форми

    // Якщо сума компонентів не 100%, виводимо повідомлення про помилку
    if (!isCorrectInput()) {
        output.innerHTML = `<p class="invalid">Сума введених значень повинна дорівнювати 100%</p>`
        return;
    }

    // Зчитування значень з інпутів і перетворення їх у числа
    const hydrogenR = +hydrogenRInput.value;
    const carbonR = +carbonRInput.value;
    const sulfurR = +sulfurRInput.value;
    const nitrogenR = +nitrogenRInput.value;
    const oxygenR = +oxygenRInput.value;
    const wetR = +wetRInput.value;
    const ashR = +ashRInput.value;

    // Обчислення коефіцієнтів переходу до сухої та горючої маси
    let coefRC = +(100 / (100 - wetR)).toFixed(2);
    let coefRG = +(100 / (100 - wetR - ashR)).toFixed(2);

    // Обчислення складу сухої маси палива
    let hydrogenC = (hydrogenR * coefRC).toFixed(2);
    let carbonC = (carbonR * coefRC).toFixed(2);
    let sulfurC = (sulfurR * coefRC).toFixed(2);
    let nitrogenC = (nitrogenR * coefRC).toFixed(3);
    let oxygenC = (oxygenR * coefRC).toFixed(2);
    let ashC = (ashR * coefRC).toFixed(2);

    // Обчислення складу горючої маси палива
    let hydrogenG = (hydrogenR * coefRG).toFixed(2);
    let carbonG = (carbonR * coefRG).toFixed(2);
    let sulfurG = (sulfurR * coefRG).toFixed(2);
    let nitrogenG = (nitrogenR * coefRG).toFixed(3);
    let oxygenG = (oxygenR * coefRG).toFixed(2);

    // Розрахунок теплоти згоряння
    let warmthR = +((339 * carbonR + 1030 * hydrogenR - 108.8 * (oxygenR - sulfurR) - 25 * wetR) / 1000).toFixed(4);
    let warmthC = ((warmthR + 0.025 * wetR) * 100 / (100 - wetR)).toFixed(2);
    let warmthG = ((warmthR + 0.025 * wetR) * 100 / (100 - wetR - ashR)).toFixed(2);

    // Вивід результатів на сторінку
    output.innerHTML = `
        <hr>
        <p>Для палива з компонентним складом: 
            H<sup>р</sup>=${hydrogenR}%; C<sup>р</sup>=${carbonR}%; S<sup>р</sup>=${sulfurR}%; 
            N<sup>р</sup>=${nitrogenR}%; O<sup>р</sup>=${oxygenR}%; W<sup>р</sup>=${wetR}%; A<sup>р</sup>=${ashR}%:</p>
        <h2>Коефіцієнти переходу</h2>
        <p>Від робочої до сухої маси: ${coefRC}</p>
        <p>Від робочої до горючої маси: ${coefRG}</p>
        <h2>Склад сухої маси палива</h2>
        <p>Водень, H<sup>с</sup>: ${hydrogenC}%</p>
        <p>Вуглець, C<sup>с</sup>: ${carbonC}%</p>
        <p>Сірка, S<sup>с</sup>: ${sulfurC}%</p>
        <p>Азот, N<sup>с</sup>: ${nitrogenC}%</p>
        <p>Кисень, O<sup>с</sup>: ${oxygenC}%</p>
        <p>Зола, A<sup>с</sup>: ${ashC}%</p>
        <h2>Склад горючої маси палива</h2>
        <p>Водень, H<sup>г</sup>: ${hydrogenG}%</p>
        <p>Вуглець, C<sup>г</sup>: ${carbonG}%</p>
        <p>Сірка, S<sup>г</sup>: ${sulfurG}%</p>
        <p>Азот, N<sup>г</sup>: ${nitrogenG}%</p>
        <p>Кисень, O<sup>г</sup>: ${oxygenG}%</p>
        <h2>Теплота згоряння</h2>
        <p>Для робочої маси: ${warmthR} МДж/к</p>
        <p>Для сухої маси: ${warmthC} МДж/к</p>
        <p>Для горючої маси: ${warmthG} МДж/к</p>
    `;
}

// Обробник події на кнопку
btn.addEventListener("click", calculate);