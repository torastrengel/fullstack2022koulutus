import Tentti from './Tentti';

const MainContent = () => {
  const tentit = [
    {
      tentti1: [
        {
          kysymys: 'Suomen pääkaupunki on...',
          vaihtoehdot: [
            { vastaus: 'Helsinki', onkoOikea: true },
            { vastaus: 'Turku', onkoOikea: false },
            { vastaus: 'Jyväskylä', onkoOikea: false },
            { vastaus: 'Rovaniemi', onkoOikea: false },
          ],
        },
        {
          kysymys: 'Japanin pääkaupunki on...',
          vaihtoehdot: [
            { vastaus: 'Osaka', onkoOikea: false },
            { vastaus: 'Hiroshima', onkoOikea: false },
            { vastaus: 'Kyoto', onkoOikea: false },
            { vastaus: 'Tokyo', onkoOikea: true },
          ],
        },
        {
          kysymys: 'Maapallo on litteä. Totta vai tarua?',
          vaihtoehdot: [
            { vastaus: 'Totta', onkoOikea: false },
            { vastaus: 'Tarua', onkoOikea: true },
          ],
        },
      ],
    },
    {
      tentti2: [
        {
          kysymys: 'Hauki on kala.',
          vaihtoehdot: [
            { vastaus: 'Kyllä', onkoOikea: true },
            { vastaus: 'Ei', onkoOikea: false },
          ],
        },
        {
          kysymys: 'Avaruus on ääretön. Totta vai ei?',
          vaihtoehdot: [
            { vastaus: 'Kyllä', onkoOikea: true },
            { vastaus: 'Ei', onkoOikea: false },
          ],
        },
        {
          kysymys: 'Ääni kulkee valoa nopeammin.',
          vaihtoehdot: [
            { vastaus: 'Kyllä', onkoOikea: false },
            { vastaus: 'Ei', onkoOikea: true },
          ],
        },
      ],
    },
  ];

  return (
    <div className="main-content">
      <h1>Tentti</h1>
      <Tentti tenttiData={tentit[0]} />
    </div>
  );
};

export default MainContent;