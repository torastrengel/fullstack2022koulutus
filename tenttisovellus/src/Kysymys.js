const Kysymys = ({ kysymys, valittuTentti, dispatch, index: tenttiIndex }) => {
  const vastausvaihtoehdot = kysymys.vaihtoehdot.map((vaihtoehto, index) => {
    return (
      <label key={index}>
        <input type="radio" value={vaihtoehto.vastaus} name="kysymys" />{' '}
        {vaihtoehto.vastaus}
        <input
          type="text"
          value={vaihtoehto.vastaus}
          onChange={(event) => {
            dispatch({
              type: 'VASTAUS_MUUTETTIIN',
              payload: {
                uusiVastaus: event.target.value,
                tenttiIndex: tenttiIndex,
                index: index,
                valittuTentti: valittuTentti,
              },
            });
          }}
        />
        <input
          onChange={(event) => {
            dispatch({
              type: 'OIKEELLISUUS_MUUTETTIIN',
              payload: {
                uusiOikea: event.target.checked,
                tenttiIndex: tenttiIndex,
                index: index,
                valittuTentti: valittuTentti,
              },
            });
          }}
          type="checkbox"
          name="onkoOikea"
          checked={vaihtoehto.onkoOikea}
        />{' '}
        Oikea vastaus?
      </label>
    );
  });

  return (
    <div className="kysymys">
      <h3>{kysymys.kysymys}</h3>
      <input
        type="text"
        onChange={(event) =>
          dispatch({
            type: 'KYSYMYS_MUUTETTIIN',
            payload: {
              kysymys: event.target.value,
              index: tenttiIndex,
              valittuTentti: valittuTentti,
            },
          })
        }
        value={kysymys.kysymys}
      />
      {vastausvaihtoehdot}
    </div>
  );
};

export default Kysymys;
