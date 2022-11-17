const Kysymys = ({ kysymys, dispatch, vastaukset }) => {
  const vastausvaihtoehdot = vastaukset.map((item) => {
    return (
      <div key={item.id}>
        <input type="radio" value={item.vastaus} name="kysymys" />{' '}
        <input
          className="vastaus-input"
          type="text"
          value={item.teksti}
          onChange={(event) => {
            dispatch({
              type: 'VASTAUS_MUUTETTIIN',
              payload: {
                uusiVastaus: event.target.value,
                vastausId: item.id,
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
                vastausId: item.id,
              },
            });
          }}
          type="checkbox"
          name="onkoOikea"
          checked={item.oikein}
        />{' '}
        Oikea vastaus?
      </div>
    );
  });

  return (
    <div className="kysymys">
      <h3>{kysymys.kysymys}</h3>
      <input
        className="kysymys-input"
        type="text"
        onChange={(event) =>
          dispatch({
            type: 'KYSYMYS_MUUTETTIIN',
            payload: {
              kysymys: event.target.value,
              kysymysId: kysymys.id,
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
