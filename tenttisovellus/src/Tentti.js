import Kysymys from './Kysymys';
import Button from '@mui/material/Button';

const Tentti = ({ tenttiData }) => {
  const kysymykset = tenttiData.tentti1.map((item) => {
    return (
      <Kysymys
        id={item.kysymys}
        kysymys={item.kysymys}
        vaihtoehdot={item.vaihtoehdot}
      />
    );
  });

  return <div className="tentti">
    {kysymykset}
    <Button color="primary">Tarkista vastaukset</Button>
    </div>;
};

export default Tentti;
