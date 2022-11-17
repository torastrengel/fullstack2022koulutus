import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Hups! 🤦‍♂️</h1>
      <p>
        Jotain meni nyt pieleen! Hätä ei ole tämän näköinen, sillä olemme
        lähettäneet koulutetut apinat korjaamaan ongelmaa
      </p>
      <p>
        <i className="boldText">{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
