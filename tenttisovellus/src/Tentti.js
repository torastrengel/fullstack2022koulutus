import Kysymys from './Kysymys';
import Button from '@mui/material/Button';

const Tentti = ({ dispatch, valittuTentti, tentteja }) => {
  const kysymykset = tentteja.tentti.map((item, index) => {
    return (
      <Kysymys
        key={`Kysymys ${index}`}
        valittuTentti={valittuTentti}
        kysymys={item}
        index={index}
        dispatch={dispatch}
      />
    );
  });

  return (
    <div className="tentti">
      {kysymykset}
      <Button color="primary">Tarkista vastaukset</Button>
    </div>
  );
};

export default Tentti;
