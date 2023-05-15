import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      {variable ? (
        <div>
          {variable.GroupName ? (
            <h2>{variable.GroupName}</h2>
          ) : (
            <h2>No name available</h2>
          )}
          <p>{variable.Description.replace(/<\/?p>/gi, "")}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default VariableDetailPage;
