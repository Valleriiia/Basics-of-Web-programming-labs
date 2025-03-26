const coalInput = document.querySelector('#coal');
const oilInput = document.querySelector('#oil');
const gasInput = document.querySelector('#gas');
const btn = document.querySelector("#submit-btn");
const output = document.querySelector('#output');

function isCorrectInput() {
    return (coalInput.value !== '' && oilInput.value !== '' && gasInput.value !== '') 
}

function calculate(e) {
    e.preventDefault();
    if (!isCorrectInput()) {
        output.innerHTML = `<p class="invalid">Поля не повинні бути пустими</p>`;
        return;
    }

    const coal = +coalInput.value;
    const oil = +oilInput.value;
    const gas = +gasInput.value;

    let ktvCoal = Math.pow(10, 6) / 20.47 * 0.8 * 25.20 / (100 - 1.5) * (1 - 0.985);
    let etvCoal = Math.pow(10, -6) * ktvCoal * 20.47 * coal;
    let ktvOil = Math.pow(10, 6) / 39.48 * 1 * 0.15 / (100 - 0) * (1 - 0.985);
    let etvOil = Math.pow(10, -6) * ktvOil * 39.48 * oil;
    let ktvGas = Math.pow(10, 6) / 30.08 * 0 * 0 / (100 - 0) * (1 - 0.985);
    let etvGas = Math.pow(10, -6) * ktvGas * 30.08 * gas;

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
    `
}

btn.addEventListener("click", calculate);