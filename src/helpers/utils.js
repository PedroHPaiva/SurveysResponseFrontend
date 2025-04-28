export function normalizeDataForChart(data) {
  const grouped = {};
  const originsSet = new Set();

  // Primeiro: pega todos os origins possíveis
  data.forEach((item) => {
    originsSet.add(item.origin.toLowerCase());
  });

  const allOrigins = Array.from(originsSet);

  // Depois agrupa garantindo todos os campos
  data.forEach((item) => {
    const key = item.period;

    if (!grouped[key]) {
      grouped[key] = { period: item.period };

      // inicializa todos os origins como 0
      allOrigins.forEach((origin) => {
        grouped[key][origin] = 0;
      });
    }

    grouped[key][item.origin.toLowerCase()] = item.conversionRate; // agora preenche certinho
  });

  return Object.values(grouped);
}

export function generateOriginsConfig(data) {
  const origins = Array.from(new Set(data.map((item) => item.origin)));

  return origins.map((origin) => ({
    id: origin.toLowerCase(), // id minúsculo
    name: origin.toUpperCase(), // ou pode deixar como quiser
    color: getRandomColor(),
  }));
}

function getRandomColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}
