// Tehtävät 2.1, 2.2 a ja b sekä 2.3 a ja b

const työtunnit = (...tunnit) => {
  // Päivät syötetään järjestyksessä -> maanantai, tiistai jne.

  // Keskiarvo for loopilla
  return työtunnitKeskiarvoFor(tunnit);

  // Keskiarvo reduce-funktiolla
  työtunnitKeskiarvoReduce(tunnit);
};

const työtunnitKeskiarvoFor = (tuntilista) => {
  let keskiarvo,
    min,
    max = 0;

  // Selvitä min

  for (let i = 0; i < tuntilista.length; i++) {
    if (i === 0) {
      min = tuntilista[i];
    }
    if (tuntilista[i] < min) {
      min = tuntilista[i];
    }
  }

  // Selvitä max

  for (let i = 0; i < tuntilista.length; i++) {
    if (i === 0) {
      max = tuntilista[i];
    }
    if (tuntilista[i] > max) {
      max = tuntilista[i];
    }
  }

  for (let i = 0; i < tuntilista.length; i++) {
    keskiarvo = keskiarvo + tuntilista[i];
  }

  return keskiarvo / tuntilista.length;
};

const työtunnitKeskiarvoReduce = (tuntilista) => {
  const keskiarvo =
    tuntilista.reduce((acc, curr) => {
      return acc + curr;
    }, 0) / tuntilista.length;

  // Selvitä min

  const min = tuntilista.reduce((acc, curr) => {
    if (acc < curr) {
      return acc;
    } else {
      return curr;
    }
  });

  // Selvitä max

  const max = tuntilista.reduce((acc, curr) => {
    if (acc > curr) {
      return acc;
    } else {
      return curr;
    }
  });

  return min;
};

console.log(työtunnitKeskiarvoReduce([1, 2, 3, 4, 5]));

// Tehtävä 2.4

const vuodenPalkka = (...vuodenPalkat) => {
  return vuodenPalkat.map((kk) => {
    return kk * 1.5;
  });
};

// Tehtävä 2.5

const vuodenPalkkaVeroilla = (palkka, veroprosentti) => {
  if (!Array.isArray(palkka)) return 'Anna palkkatiedot taulukkona!';

  return palkka.map((kk) => kk - kk * (veroprosentti * 0.01));
};

// Tehtävä 2.6

const järjestäTaulukko = () => {
  const arr = [1, 4, 100, 2, 5, 4];

  return arr.sort();
};

// Tehtävä 2.7

const järjestäMerkit = () => {
  const arr = ['1', '4', '100', '2', '5', '4'];

  return arr.sort();
};

// Tehtävä 2.8

/*
  Lyhyesti, ilman compare funktiota kaikki tiedot mitä sort funktiolle annetaan muunetaan ensin merkeiksi ja se lajittelee tiedot UTF-16 merkistön mukaisesti. Tämän vuoksi, esim numeroissa 100, tulee ennen 2, koska 1 on ennen 2 UTF-16.

  Compare funktionin avulla taas voidaan tarkemmin määritellä, minkälaisella algoritmillä voidaan päätellä, mikä tulee ennen mitäkin tiedonpätkää. Ilman tätä, sort muuntaa aina kaiken merkeiksi (string), josta lajittelu sitten tehdään.
*/

// Tehtävä 2.9

const järjestäOlio = () => {
  const päivät = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }];

  return päivät.sort((a, b) => {
    if (Object.values(a)[0] < Object.values(b)[0]) return -1;
    if (Object.values(a)[0] === Object.values(b)[0]) return 0;
    if (Object.values(a)[0] > Object.values(b)[0]) return 1;
  });
};

// Tehtävä 2.10

const järjestäPäivät = () => {
  const päivät = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }];

  const päiväjärjestys = {
    ma: 1,
    ti: 2,
    ke: 3,
    to: 4,
    pe: 5,
    la: 6,
    su: 7,
  };

  return päivät.sort((a, b) => {
    return (
      päiväjärjestys[Object.keys(a)[0]] - päiväjärjestys[Object.keys(b)[0]]
    );
  });
};

// Tehtävä 2.11

const parillisetObjektit = () => {
  const päivät = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }];
  const arr = [];

  for (let i = 0; i < päivät.length; i++) {
    if (Object.values(päivät[i]) % 2 === 0) {
      arr.push(päivät[i]);
    }
  }

  return arr;
};

// Tehtävä 2.12

const toinenKirjainE = () => {
  const päivät = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }];
  const arr = [];

  for (let i = 0; i < päivät.length; i++) {
    if (Object.keys(päivät[i]).toString()[1] === 'e') {
      arr.push(päivät[i]);
    }
  }

  return arr;
};

// Tehtävä 2.13

const objektistaTaulukko = () => {
  const päivät = {
    ma: 44,
    pe: 100,
    ke: 21,
    ti: 66,
    la: 22,
  };

  const arr = [];

  for (const [avain, arvo] of Object.entries(päivät)) {
    arr.push({ [avain]: arvo });
  }

  return arr;
};
