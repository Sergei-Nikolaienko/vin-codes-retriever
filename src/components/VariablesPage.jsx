import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./VariablesPage.scss";

const VariablesPage = () => {
  const [variables, setVariables] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Call API to get list of vehicle variables
    const fetchVariables = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json"
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.Results.find((variable) => variable.ID === 5));
          setVariables(data.Results);
          setErrorMessage("");
        } else {
          const data = await response.json();
          setErrorMessage(data.Message);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    };

    fetchVariables();
  }, []);

  return (
    <div className="variables">
      <h1 className="variables__title">Variables</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {variables.length !== 0 ? (
        <ul className="variables__list">
          {variables.map((variable) => (
            <li className="variables__item" key={variable.ID}>
              <Link
                className="variables__link"
                to={`/variables/${variable.ID}`}
              >
                {variable.GroupName ? (
                  <h3>{variable.GroupName}</h3>
                ) : (
                  <h3>No name available</h3>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VariablesPage;
