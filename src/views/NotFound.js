import { useRouteError } from "react-router-dom";

//Logo Import
import mainLogo from "../assets/logos/Logo.png";

//React-Router-Dom Import (Logo link back home)
import { Link } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="errorContainer">
      <Link to="/">
        <img className="errorLogo" src={mainLogo} alt="anwar horizontal" />
      </Link>
      <h1 className="errorCode">Error 404 :( </h1>
      <p className="errorText">Este link esta caido :/</p>
      <Link to="/">
        <button className="errorBackBtn">Inicio</button>
      </Link>
    </div>
  );
};
export default NotFound;
