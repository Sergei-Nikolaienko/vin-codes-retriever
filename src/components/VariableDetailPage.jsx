import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "./VariableDetailPage.scss";

const VariableDetailPage = () => {
  const variableId = useParams();
  const [variable, setVariable] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(variableId);

  useEffect(() => {
    // Call API to get variable details
    const fetchVariableDetails = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`
        );

        if (response.ok) {
          const data = await response.json();
          console.log(variableId);
          setVariable(
            data.Results.find((variable) => variable.ID === +variableId.id)
          );
          console.log(variable);
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

    fetchVariableDetails();
  }, [variableId]);

  return (
    <div className="variable">
      {variable ? (
        <div>
          {variable.GroupName ? (
            <h2 className="variable__title">{variable.GroupName}</h2>
          ) : (
            <h2 className="variable__title">No name available</h2>
          )}
          <p className="variable__text">
            {variable.Description.replace(/<\/?p>/gi, "")}
          </p>
          <Link className="variable__back" to="/variables">
            Go Back
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default VariableDetailPage;
