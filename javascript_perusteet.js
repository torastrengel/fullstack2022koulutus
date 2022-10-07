// Tehtävät 1.1 - 1.3

const pienempiKuinSata = (luku) => {
  if (luku < 100) {
    return 'Syötit luvun, joka on pienempi kuin 100';
  }

  if (luku === 100) {
    return 'Luku on 100';
  }

  return 'Syötit luvun, joka on suurempi kuin 100';
};

// Tehtävä 1.4 - laskettu aika sekunteina

const aikaSekunteina = (tunnit, minuutit, sekunnit) => {
  let lasketutSekunnit = 0;
  if (tunnit) {
    lasketutSekunnit += tunnit * 60 * 60;
  }

  if (minuutit) {
    lasketutSekunnit += minuutit * 60;
  }

  if (sekunnit) {
    lasketutSekunnit += sekunnit;
  }

  return lasketutSekunnit;
};

console.log('Aika sekunteina', aikaSekunteina(20, 2, 300));

// Tehtävä 1.4 b

const markatEuroiksi = (markat) => {
  return markat * 0.16818793;
};

console.log('Markat euroina', markatEuroiksi(200));

// Tehtävä 1.4 c

const eurotMarkoiksi = (eurot) => {
  return eurot / 0.16818793;
};

console.log('Eurot markkoina', eurotMarkoiksi(1));

// Tehtävä 1.5

const viikonpaiva = (viikonpaivanNumero) => {
  switch (viikonpaivanNumero) {
    case 1:
      return 'maanantai';
    case 2:
      return 'tiistai';
    case 3:
      return 'keskiviikko';
    case 4:
      return 'torstai';
    case 5:
      return 'perjantai';
    case 6:
      return 'lauantai';
    case 7:
      return 'sunnuntai';
    default:
      console.log(
        'Viikonpäivän numero ei tunnistettavissa. Anna luku väliltä 1-7'
      );
  }
};

console.log('Viikonpäivä', viikonpaiva(2));

// Tehtävä 1.6

const tarkistaIka = (ika) => {
  if (ika >= 1 && ika <= 17) {
    return 'olet alaikäinen';
  } else if (ika >= 18 && ika <= 33) {
    return 'olet nuori';
  } else if (ika >= 34 && ika <= 50) {
    return 'olet keski-ikäinen';
  } else {
    return 'olet vanha';
  }
};

console.log('Tarkista ikä', tarkistaIka(34));

// Tehtävä 1.7

const tervehdi = (etunimi, sukunimi, ikä) => {
  return `Terve ${etunimi} ${sukunimi}, olet ${ikä} vuotias`;
};

console.log('Tervehdi', tervehdi('Rauno', 'Isotalo', 54));

// Tehtävä 1.8

const onnenpekka = (vuosi, numero) => {
  if (vuosi === 1970 && numero === 77) {
    return 'Olet onnenpekka!';
  }
};

console.log('Onnenpekka', onnenpekka(1970, 77));

// Tehtävä 1.9

const listaluvut = () => {
  const array = [];

  for (let i = 7; i <= 131; i++) {
    array.push(i);
  }

  return array;
};

// Tehtävä 1.10 a

const lukujenSumma = () => {
  const arr = [];

  for (let i = 7; i <= 131; i++) {
    arr.push(i);
  }

  return arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

console.log(lukujenSumma());

// Tehtävä 1.10 a

const lukuväli = (a, b) => {
  if (b < a) {
    return 'Kakkosluvun tulee olla suurempi, kuin ekan luvun!';
  }

  const arr = [];

  for (let i = a; i <= b; i++) {
    arr.push(i);
  }

  return arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

console.log(lukuväli(1, 5));

// Tehtävä 1.12

const parilliset = () => {
  const arr = [];

  for (let i = 1; i <= 100; i++) {
    if (i % 2 === 0) {
      arr.push(i);
    }
  }

  return arr;
};

// Tehtävä 1.13

const tuhatSumma = () => {
  const arr = [];

  for (let i = 1; i <= 1000; i++) {
    if (i % 2 === 0) {
      arr.push(i);
    }
  }

  return arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

// Tehtävä 1.16

const painoindeksi = (paino, pituus) => {
  return +(paino / (pituus * pituus)).toFixed(1);
};

console.log(painoindeksi(78, 1.745));

// Tehtävä 1.17

const karkausvuosi = (vuosi) => {
  if (vuosi % 400 === 0) {
    return 'on';
  } else if (vuosi % 4 === 0 && vuosi % 100 !== 0) {
    return 'on';
  }

  return 'ei';
};

// Tehtävä 1.18

const onkoLukuYksi = (luku) => {
  if (luku !== 1) {
    return 'Syöte ei ole 1';
  }
};

// Tehtävä 1.19

const muunnaLämpöaste = (asteikko, lukema) => {
  let tulos = 0;
  if (
    asteikko === 'c' ||
    asteikko === 'C' ||
    asteikko === 'f' ||
    asteikko === 'F'
  ) {
    if (lukema <= 100 && lukema > -101) {
      if (asteikko === 'c' || asteikko === 'C') {
        tulos = (9 / 5) * lukema + 32;
      } else {
        tulos = (5 / 9) * (lukema - 32);
      }
      return tulos;
    } else {
      return 'lukema virheellinen';
    }
  } else {
    return 'asteikko tuntematon';
  }
};

// Tehtävä 1.20

const kulutus = (litrat, kilometrit) => {
  let sadalla = 0;
  if (litrat > 0) {
    if (litrat > 0) {
      if (kilometrit > 0) {
        sadalla = (litrat * 100) / kilometrit;
        return sadalla;
      } else {
        return 'virhesyöttö';
      }
    } else {
      return 'virhesyöttö';
    }
  }
};

console.log(kulutus(15, 300));

// Tehtävä 1.21

const kivaIhminen = (nimi) => {
  switch (nimi.toLowerCase()) {
    case 'pekka':
      return 'Minunkin mielestäni Pekka on kiva';
    case 'liisa':
      return 'Minunkin mielestäni Liisa on kiva';
    case 'jorma':
      return 'Minunkin mielestäni Jorma on kiva';
    default:
      return 'En tunne henkilöä';
  }
};

// Tehtävä 1.22

/*

a) epätosi
b) tosi
c) tosi
d) epätosi
e) tosi
f) tosi

*/

// Tehtävä 1.23

const montakoKuormaa = () => {
  const kappalemäärä = 50;
  const arr = [];
  let kuormat = 0;
  const mitat = {
    pituus: 0.3,
    leveys: 0.5,
    korkeus: 0.5,
  };

  for (let i = 1; i <= kappalemäärä; i++) {
    arr.push(
      2.5 * (mitat.pituus * 10 * (mitat.leveys * 10) * (mitat.korkeus * 10))
    );
    mitat.pituus = mitat.pituus * 1.02;
    mitat.leveys = mitat.leveys * 1.03;
    mitat.korkeus = mitat.korkeus * 1.015;
  }

  let yhteispaino = arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  for (let i = yhteispaino; i > 0;) {
    i -= 10500;
    kuormat++;
  }

  return kuormat;
};

console.log('Kuormien määrä:', montakoKuormaa());
