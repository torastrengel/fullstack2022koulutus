const VaihtoehtoKentta = ({
  index,
  muutaVaihtoehtoKenttaa,
  vastaus,
  onkoOikea,
  id,
}) => {
  return (
    <div key={index}>
      {`Vaihtoehto ${index + 1}`}
      <input
        type="text"
        placeholder="vaihtoehto"
        name="vastaus"
        value={vastaus}
        onChange={(e) => muutaVaihtoehtoKenttaa(e, id)}
      />
      <input
        type="checkbox"
        name="onkoOikea"
        checked={onkoOikea}
        onChange={(e) => muutaVaihtoehtoKenttaa(e, id)}
      />
    </div>
  );
};

export default VaihtoehtoKentta;
