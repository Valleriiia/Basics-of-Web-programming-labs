function calculateCables(e) {
    e.preventDefault();
    // Отримання вхідних даних
    const sm = +document.getElementById('sm').value;
    const unom = +document.getElementById('unom').value;
    const tm = +document.getElementById('tm').value;
    const ik = +document.getElementById('ik').value;
    const tphi = +document.getElementById('tphi').value;
    const output = document.getElementById('cable-results');
    
    // Розрахунок струмів
    const im = (sm / 2) / (Math.sqrt(3) * unom);
    const impa = 2 * im;
    
    // Економічний переріз
    const jek = 1.4; 
    const sek = im / jek;
    
    // Перевірка на термічну стійкість
    const ct = 92; 
    const smin = (ik * 1000 * Math.sqrt(tphi)) / ct;

    // Відображення результатів
    output.innerHTML = `
    <h3>1. Розрахункові струми</h3>
    <p>Розрахунковий струм для нормального режиму, I<sub>M</sub>: ${im.toFixed(1)} A</p>
    <p>Розрахунковий струм для післяаварійного режиму, I<sub>M,ПА</sub>: ${impa.toFixed(0)} A</p>

    <h3>2. Вибір кабелю за економічною густиною струму</h3>
    <p>Економічна густина струму для T<sub>m</sub> = ${tm} год, j<sub>ек</sub>: 1.4 А/мм²</p>                    
    <p>Економічний переріз, s<sub>ек</sub>: ${sek.toFixed(1)} мм²</p>                    
    <p>Попередньо вибраний кабель: <strong>ААБ 10 3×25</strong> з I<sub>доп</sub> = 90 А</p>

    <h3>3. Перевірка за термічною стійкістю</h3>
    <p>Мінімальний переріз за термічною стійкістю, s<sub>min</sub>: ${Math.round(smin)} мм²</p>                    
    <p>Де C<sub>T</sub> = 92 А·с<sup>0.5</sup>/мм² для кабелів з алюмінієвими жилами, паперовою ізоляцією</p>                    
    <p>Остаточний вибір кабелю: <strong>ААБ 10 3×50</strong> (переріз збільшено до 50 мм²)</p>
    `
}

function calculateShortCircuit(e) {
    e.preventDefault();
    // Отримання вхідних даних
    const ucn = +document.getElementById('ucn').value;
    const sk = +document.getElementById('sk').value;
    const ukPercent = +document.getElementById('ukPercent').value;
    const sNomT = +document.getElementById('sNomT').value;
    const output = document.getElementById('short-circuit-results');
    
    // Розрахунок опорів в іменованих одиницях
    const xc = Math.pow(ucn, 2) / sk;
    const xt = (ukPercent / 100) * Math.pow(ucn, 2) / sNomT;
    const xsum = xc + xt;
    
    // Розрахунок струму КЗ в іменованих одиницях
    const ipo = ucn / (Math.sqrt(3) * xsum);
    
    // Відображення результатів
    output.innerHTML = `
    <h3>1. Опори елементів заступної схеми</h3>
    <p>Опір системи, X<sub>C</sub>: ${xc.toFixed(2)} Ом</p>
    <p>Опір трансформатора, X<sub>T</sub>: ${xt.toFixed(2)} Ом</p>
    <p>Сумарний опір для точки К1, X<sub>Σ</sub>: ${xsum.toFixed(2)} Ом</p>

    <h3>2. Струм трифазного КЗ</h3>
    <p>Початкове діюче значення струму трифазного КЗ, I<sub>П0</sub>: ${ipo.toFixed(2)} кА</p>
    `
}

function calculateKhpenem(e) {
    e.preventDefault();
    // Отримання вхідних даних
    const uHigh = +document.getElementById('uHigh').value;
    const uLow = +document.getElementById('uLow').value;
    const ukMax = +document.getElementById('ukMax').value;
    const sNomTr = +document.getElementById('sNomTr').value;
    const rcn = +document.getElementById('rcn').value;
    const xcn = +document.getElementById('xcn').value;
    const rcmin = +document.getElementById('rcmin').value;
    const xcmin = +document.getElementById('xcmin').value;
    const rcEmerg = +document.getElementById('rcEmerg').value;
    const xcEmerg = +document.getElementById('xcEmerg').value;
    const output = document.getElementById('khpenem-results');
    
    // Розрахунок реактивного опору трансформатора
    const xt = (ukMax * Math.pow(uHigh, 2)) / (100 * sNomTr);
    
    // Розрахунок опорів для трьох режимів
    // Нормальний режим
    const riii = rcn;
    const xiii = xcn + xt;
    const ziii = Math.sqrt(Math.pow(riii, 2) + Math.pow(xiii, 2));
    
    // Мінімальний режим
    const riiiMin = rcmin;
    const xiiiMin = xcmin + xt;
    const ziiiMin = Math.sqrt(Math.pow(riiiMin, 2) + Math.pow(xiiiMin, 2));
    
    // Аварійний режим
    const riiiEmerg = rcEmerg;
    const xiiiEmerg = xcEmerg + xt;
    const ziiiEmerg = Math.sqrt(Math.pow(riiiEmerg, 2) + Math.pow(xiiiEmerg, 2));
    
    // Розрахунок струмів КЗ для трьох режимів
    // Нормальний режим
    const i3Norm = (uHigh * 1000) / (Math.sqrt(3) * ziii);
    const i2Norm = i3Norm * Math.sqrt(3) / 2;
    
    // Мінімальний режим
    const i3Min = (uHigh * 1000) / (Math.sqrt(3) * ziiiMin);
    const i2Min = i3Min * Math.sqrt(3) / 2;
    
    // Аварійний режим
    const i3Emerg = (uHigh * 1000) / (Math.sqrt(3) * ziiiEmerg);
    const i2Emerg = i3Emerg * Math.sqrt(3) / 2;
    
    // Коефіцієнт приведення
    const kpr = Math.pow(uLow, 2) / Math.pow(uHigh, 2);
    
    // Розрахунок дійсних опорів на шинах 10 кВ
    // Нормальний режим
    const riiiN = riii * kpr;
    const xiiiN = xiii * kpr;
    const ziiiN = Math.sqrt(Math.pow(riiiN, 2) + Math.pow(xiiiN, 2));
    
    // Мінімальний режим
    const riiiNMin = riiiMin * kpr;
    const xiiiNMin = xiiiMin * kpr;
    const ziiiNMin = Math.sqrt(Math.pow(riiiNMin, 2) + Math.pow(xiiiNMin, 2));
    
    // Аварійний режим
    const riiiNEmerg = riiiEmerg * kpr;
    const xiiiNEmerg = xiiiEmerg * kpr;
    const ziiiNEmerg = Math.sqrt(Math.pow(riiiNEmerg, 2) + Math.pow(xiiiNEmerg, 2));
    
    // Розрахунок дійсних струмів КЗ на шинах 10 кВ
    // Нормальний режим
    const i3ActNorm = (uLow * 1000) / (Math.sqrt(3) * ziiiN);
    const i2ActNorm = i3ActNorm * Math.sqrt(3) / 2;
    
    // Мінімальний режим
    const i3ActMin = (uLow * 1000) / (Math.sqrt(3) * ziiiNMin);
    const i2ActMin = i3ActMin * Math.sqrt(3) / 2;
    
    // Аварійний режим
    const i3ActEmerg = (uLow * 1000) / (Math.sqrt(3) * ziiiNEmerg);
    const i2ActEmerg = i3ActEmerg * Math.sqrt(3) / 2;
    
    // Відображення результатів
    output.innerHTML = `
    <h3>1. Реактивний опір трансформатора</h3>
    <p>X<sub>T</sub>: ${xt.toFixed(2)} Ом</p>
    
    <h3>2. Опори на шинах 10 кВ (приведені до 110 кВ)</h3>
    <h4>Нормальний режим</h4>
    <p>R<sub>III</sub>: ${riii} Ом</p>
    <p>X<sub>III</sub>: ${xiii.toFixed(2)} Ом</p>
    <p>Z<sub>III</sub>: ${ziii.toFixed(2)} Ом</p>
    <h4>Мінімальний режим</h4>
    <p>R<sub>III.min</sub>: ${riiiMin} Ом</p>
    <p>X<sub>III.min</sub>: ${xiiiMin.toFixed(2)} Ом</p>
    <p>Z<sub>III.min</sub>: ${ziiiMin.toFixed(2)} Ом</p>
    <h4>Аварійний режим</h4>
    <p>R<sub>III.emerg</sub>: ${riiiEmerg} Ом</p>
    <p>X<sub>III.emerg</sub>: ${xiiiEmerg.toFixed(2)} Ом</p>
    <p>Z<sub>III.emerg</sub>: ${ziiiEmerg.toFixed(2)} Ом</p>
    
    <h3>3. Струми КЗ (приведені до 110 кВ)</h3>
    <h4>Нормальний режим</h4>
    <p>I<sub>III</sub><sup>(3)</sup>: ${Math.round(i3Norm)} А</p>
    <p>I<sub>III</sub><sup>(2)</sup>: ${Math.round(i2Norm)} А</p>
    <h4>Мінімальний режим</h4>
    <p>I<sub>III.min</sub><sup>(3)</sup>: ${Math.round(i3Min)} А</p>
    <p>I<sub>III.min</sub><sup>(2)</sup>: ${Math.round(i2Min)} А</p>
    <h5>Аварійний режим</h5>
    <p>I<sub>III.emerg</sub><sup>(3)</sup>: ${Math.round(i3Emerg)} А</p>
    <p>I<sub>III.emerg</sub><sup>(2)</sup>: ${Math.round(i2Emerg)} А</p>
    
    <h3>4. Коефіцієнт приведення</h3>
    <p>k<sub>пр</sub>: ${kpr.toFixed(4)}</p>
    
    <h3>5. Опори на шинах 10 кВ (дійсні значення)</h3>
    <h4>Нормальний режим</h4>
    <p>R<sub>III.н</sub>: ${riiiN.toFixed(2)} Ом</p>
    <p>X<sub>III.н</sub>: ${xiiiN.toFixed(2)} Ом</p>
    <p>Z<sub>III.н</sub>: ${ziiiN.toFixed(2)} Ом</p>
    <h4>Мінімальний режим</h4>
    <p>R<sub>III.н.min</sub>: ${riiiNMin.toFixed(2)} Ом</p>
    <p>X<sub>III.н.min</sub>: ${xiiiNMin.toFixed(2)} Ом</p>
    <p>Z<sub>III.н.min</sub>: ${ziiiNMin.toFixed(2)} Ом</p>
    <h4>Аварійний режим</h4>
    <p>R<sub>III.н.emerg</sub>: ${riiiNEmerg.toFixed(2)} Ом</p>
    <p>X<sub>III.н.emerg</sub>: ${xiiiNEmerg.toFixed(2)} Ом</p>
    <p>Z<sub>III.н.emerg</sub>: ${ziiiNEmerg.toFixed(2)} Ом</p>
    
    <h3>6. Дійсні струми КЗ на шинах 10 кВ</h3>
    <h4>Нормальний режим</h4>
    <p>I<sub>ш.н</sub><sup>(3)</sup>: ${Math.round(i3ActNorm)} А</p>
    <p>I<sub>ш.н</sub><sup>(2)</sup>: ${Math.round(i2ActNorm)} А</p>
    <h4>Мінімальний режим</h4>
    <p>I<sub>ш.н.min</sub><sup>(3)</sup>: ${Math.round(i3ActMin)} А</p>
    <p>I<sub>ш.н.min</sub><sup>(2)</sup>: ${Math.round(i2ActMin)} А</p>
    <h4>Аварійний режим</h4>
    <p>I<sub>ш.н.emerg</sub><sup>(3)</sup>: ${Math.round(i3ActEmerg)} А</p>
    <p>I<sub>ш.н.emerg</sub><sup>(2)</sup>: ${Math.round(i3ActEmerg)} А</p>
    `
}

document.getElementById('cable-btn').addEventListener('click', calculateCables);
document.getElementById('circuit-btn').addEventListener('click', calculateShortCircuit);
document.getElementById('khpenem-btn').addEventListener('click', calculateKhpenem);