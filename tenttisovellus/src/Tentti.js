import { useState } from 'react';

import Kysymys from './Kysymys';
import Button from '@mui/material/Button';
import UusiKysymysForm from './UusiKysymysForm';

const Tentti = ({ dispatch, valittuTentti, opiskelijaNakyma, tentteja }) => {
  const [lomakeEsilla, setLomakeEsilla] = useState(false);

  const muutaLomakkeenTila = () => {
    setLomakeEsilla(!lomakeEsilla);
  };

  const kysymykset = tentteja.tentti.map((item, index) => {
    return (
      <Kysymys
        key={`Kysymys ${index}`}
        valittuTentti={valittuTentti}
        kysymys={item}
        index={index}
        dispatch={dispatch}
        opiskelijaNakyma={opiskelijaNakyma}
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
          muutaLomakkeenTila={muutaLomakkeenTila}
          dispatch={dispatch}
          valittuTentti={valittuTentti}
        />
      )}
      <Button color="primary">Tarkista vastaukset</Button>
    </div>
  );
};

export default Tentti;
