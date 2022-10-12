const Nappain = ({ arvo, toiminto }) => {
  return arvo === '0' ? (
    <button onClick={() => toiminto(arvo)} className="numero-0">
      {arvo}
    </button>
  ) : (
    <button onClick={() => toiminto(arvo)}>{arvo}</button>
  );
};

export default Nappain;
