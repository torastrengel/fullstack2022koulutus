const Kysymys = ({
  kysymys,
  opiskelijaNakyma,
  valittuTentti,
  dispatch,
  index: tenttiIndex,
}) => {
  const vastausvaihtoehdot = kysymys.vaihtoehdot.map((item, index) => {
    return (
      <div key={item.id}>
        <input type="radio" value={item.vastaus} name="kysymys" />{' '}
        <input
          className="vastaus-input"
          type="text"
          value={item.vastaus}
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
          checked={item.onkoOikea}
        />{' '}
        Oikea vastaus?
      </div>
    );
  });

  return (
    <div className="kysymys">
      {opiskelijaNakyma && <h3>{kysymys.kysymys}</h3>}
      <input
        className="kysymys-input"
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
