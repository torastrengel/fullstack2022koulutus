import { useState } from 'react';

const UusiKysymysForm = () => {
  const [kysymys, setKysymys] = useState('');
  const [vaihtoehdot, setVaihtoehdot] = useState([]);

  const muutaKysymys = (e) => {
    const { value } = e.target;

    setKysymys(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={kysymys}
        name="kysymys"
        onChange={muutaKysymys}
      />
    </form>
  );
};

export default UusiKysymysForm;
