const capacityInput = document.getElementById('capacity');
const marginErrorInput = document.getElementById('margin-error');
const priceInput = document.getElementById('price');
const btn = document.querySelector("#submit-btn");
const output = document.querySelector('#output');

function isCorrectInput() {
    return (capacityInput.value !== '' && marginErrorInput.value !== '' && priceInput.value !== '');
}

function calculate(e) {
    e.preventDefault(); 
    
    if (!isCorrectInput()) {
        output.innerHTML = `<p class="invalid">Поля не повинні бути пустими</p>`;
        return;
    }

    const capacity = +capacityInput.value;
    const marginError = +marginErrorInput.value;
    const price = +priceInput.value;
    
    let p1 = jStat.normal.cdf(5.25, capacity, marginError);
    let p2 = jStat.normal.cdf(4.75, capacity, marginError);

    let balancedEnergy = +(p1 - p2).toFixed(2);

    let w1 = capacity * 24 * balancedEnergy;
    let profit = w1 * price;
    let w2 = capacity * 24 * (1 - balancedEnergy);
    let loss = w2 * price;

    let finalProfit = profit - loss;

    output.innerHTML = `
    <p>Для сонячної електростанції з середньодобовою потужністю ${capacity} МВт та похибкою прогнозування потужності ${marginError} МВт, при вартості палива ${price} грн/кВт<sup>.</sup>год</p>
    <p>Прибуток: ${finalProfit.toFixed(2)} тис. грн</p>
    `
}

btn.addEventListener("click", calculate);