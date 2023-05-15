import { useState } from "react";

const MainPage = () => {
  const [vinCode, setVinCode] = useState("");
  const [lastFiveCodes, setLastFiveCodes] = useState([]);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState([]);

  const historyLimit = 3;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform minimal data validation
    if (vinCode === "" || vinCode.length > 17) {
      setErrorMessage("Invalid VIN code. Please enter a valid VIN code.");
      return;
    }

    // Call API to decode VIN code
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vinCode}?format=json`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Update results and history
        setResults(data.Results.filter((result) => result.Value !== ""));
        setHistory([vinCode, ...history.slice(0, historyLimit - 1)]);
        setLastFiveCodes([vinCode, ...lastFiveCodes.slice(0, 4)]);
        setVinCode("");
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

  return (
    <div>
      <h2>Main Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          VIN code:
          <input
            type="text"
            value={vinCode}
            onChange={(event) => setVinCode(event.target.value)}
          />
        </label>
        <button type="submit">Decode</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <h3>Last five decoded codes:</h3>
      <ul>
        {lastFiveCodes.map((code, index) => (
          <li key={index}>{code}</li>
        ))}
      </ul>
      <h3>Decryption results:</h3>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.Variable}: {result.Value}
          </li>
        ))}
      </ul>
      <h3>History:</h3>
      <ul>
        {history.map((code, index) => (
          <li key={index}>
            <button onClick={() => setVinCode(code)}>{code}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
