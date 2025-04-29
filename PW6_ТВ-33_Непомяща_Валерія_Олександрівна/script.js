const eps = [];

document.getElementById('add-ep').addEventListener('click', () => {
  const ep = {
    name: document.getElementById('name').value,
    section: document.getElementById('section').value,
    efficiency: parseFloat(document.getElementById('efficiency').value),
    cosPhi: parseFloat(document.getElementById('cosPhi').value),
    voltage: parseFloat(document.getElementById('voltage').value),
    quantity: parseInt(document.getElementById('quantity').value),
    power: parseFloat(document.getElementById('power').value),
    kv: parseFloat(document.getElementById('kv').value),
    tgPhi: parseFloat(document.getElementById('tgPhi').value)
  };
  eps.push(ep);
  alert(`ЕП "${ep.name}" додано до ${ep.section}`);
//   document.getElementById('ep-form').reset();
});

document.getElementById('calculate').addEventListener('click', () => {
  if (eps.length === 0) {
    alert('Додайте хоча б один ЕП!');
    return;
  }

  const sections = {
    'ШР1': [],
    'ШР2': [],
    'ШР3': [],
    'ТП': []
  };

  eps.forEach(ep => {
    sections[ep.section].push(ep);
  });

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  for (let section in sections) {
    if (sections[section].length > 0) {
      resultsDiv.innerHTML += `<h3>Підрозділ ${section}</h3>`;
      resultsDiv.innerHTML += generateTable(sections[section]);
    }
  }

  // Підрахунок загального навантаження цеху
  let allEps = eps;
  resultsDiv.innerHTML += `<h3>Загальне навантаження цеху</h3>`;
  resultsDiv.innerHTML += generateTable(allEps, true);
});

function generateTable(data, isTotal = false) {
  let totalPnKv = 0;
  let totalPnKvTgPhi = 0;
  let totalPn2 = 0;
  let totalPn = 0;

  data.forEach(ep => {
    totalPnKv += ep.power * ep.quantity * ep.kv;
    totalPnKvTgPhi += ep.power * ep.quantity * ep.kv * (ep?.tgPhi || 1);
    totalPn2 += Math.pow(ep.power, 2) * ep.quantity;
    totalPn += ep.power * ep.quantity;
  });

  const kvGroup = totalPnKv / totalPn;
  const ne = Math.ceil(Math.pow(totalPn, 2) / totalPn2);
  const kr = (isTotal) ? 0.7 : 1.25;
  const pp = kr * totalPnKv;
  const qp = ((isTotal) ? kr : 1) * totalPnKvTgPhi;
  const sp = Math.sqrt(pp ** 2 + qp ** 2);
  const ip = pp / 0.38;

  return `
    <table>
      <tr><th>Показник</th><th>Значення</th></tr>
      <tr><td>Груповий коефіцієнт використання (Kв)</td><td>${kvGroup.toFixed(4)}</td></tr>
      <tr><td>Ефективна кількість ЕП (ne)</td><td>${ne.toFixed(2)}</td></tr>
      <tr><td>Розрахунковий коефіцієнт активної потужності (Kр)</td><td>${kr}</td></tr>
      <tr><td>Розрахункове активне навантаження (Pp), кВт</td><td>${pp.toFixed(2)}</td></tr>
      <tr><td>Розрахункове реактивне навантаження (Qp), квар</td><td>${qp.toFixed(2)}</td></tr>
      <tr><td>Повна потужність (Sp), кВА</td><td>${sp.toFixed(2)}</td></tr>
      <tr><td>Розрахунковий груповий струм (Ip), А</td><td>${ip.toFixed(2)}</td></tr>
    </table>
  `;
}

