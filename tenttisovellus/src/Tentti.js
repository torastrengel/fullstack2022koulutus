import { useState } from 'react';

import Kysymys from './Kysymys';
import Button from '@mui/material/Button';
import UusiKysymysForm from './UusiKysymysForm';

const Tentti = ({ dispatch, tentti }) => {
  const [lomakeEsilla, setLomakeEsilla] = useState(false);

  const muutaLomakkeenTila = () => {
    setLomakeEsilla(!lomakeEsilla);
  };

  const kysymykset = tentti.kysymykset?.map((item, index) => {
    return (
      <Kysymys
        key={item.id}
        kysymys={item}
        dispatch={dispatch}
        vastaukset={item.vastausvaihtoehdot}
      />
    );
  });

  return (
    <div className="tentti">
      {kysymykset}
      <Button onClick={muutaLomakkeenTila} color="secondary">
        {lomakeEsilla ? 'Piilota lomake' : 'Uusi kysymys'}
      </Button>
      {lomakeEsilla && (
        <UusiKysymysForm
          tenttiId={tentti.tentti.id}
          muutaLomakkeenTila={muutaLomakkeenTila}
          dispatch={dispatch}
        />
      )}
      <Button color="primary">Tarkista vastaukset</Button>
    </div>
  );
};

export default Tentti;
