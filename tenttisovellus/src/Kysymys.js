const Kysymys = ({ kysymys, vaihtoehdot }) => {
  const vastausvaihtoehdot = vaihtoehdot.map((vaihtoehto) => {
    return (
      <label>
        <input type="radio" value={vaihtoehto.vastaus} name="kysymys" />{' '}
        {vaihtoehto.vastaus}
      </label>
    );
  });

  return (
    <div className="kysymys">
      <h4>{kysymys}</h4>
      {vastausvaihtoehdot}
    </div>
  );
};

export default Kysymys;
