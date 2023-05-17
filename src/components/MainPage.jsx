import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";

import "./MainPage.scss";

const MainPage = () => {
  const { lastFiveCodes, setLastFiveCodes, history, setHistory } =
    useContext(AppContext);
  const [vinCode, setVinCode] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const historyLimit = 3;

  useEffect(() => {
    // Load last five codes from localStorage on component mount
    const savedLastFiveCodes = localStorage.getItem("lastFiveCodes");
    if (savedLastFiveCodes) {
      setLastFiveCodes(JSON.parse(savedLastFiveCodes));
    }

    // Load history from localStorage on component mount
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // Save last five codes to localStorage when it changes
    localStorage.setItem("lastFiveCodes", JSON.stringify(lastFiveCodes));
  }, [lastFiveCodes]);

  useEffect(() => {
    // Save history to localStorage when it changes
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform minimal data validation
    if (vinCode === "" || vinCode.length !== 17) {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="main">
      <div className="main__left-col">
        <div className="main__form-header">
          <h2 className="main__form-title">
            Please enter a VIN code in the following format:
          </h2>
          <p className="main__form-sample">WDDGF3BB4DF968608</p>
        </div>

        <form className="main__form" onSubmit={handleSubmit}>
          <label className="main__form-label">
            VIN code:{" "}
            <input
              className="main__form-input"
              type="text"
              value={vinCode}
              placeholder="Input your VIN code here"
              onChange={(event) =>
                setVinCode(event.target.value.toUpperCase().trim())
              }
            />
          </label>
          <button className="main__form-button" type="submit">
            Decode
          </button>
          {errorMessage && <p className="main__form-error">{errorMessage}</p>}
        </form>

        <div className="main__decrypted">
          <h3 className="main__decrypted-title">Last five decoded codes:</h3>
          <ul className="main__decrypted-list">
            {lastFiveCodes.map((code, index) => (
              <li className="main__decrypted-item" key={index}>
                {code}
              </li>
            ))}
          </ul>
          <h3 className="main__decrypted-title">Decryption results:</h3>
          <table className="main__decrypted-table">
            <tbody>
              {results.map((result, index) => (
                <tr className="main__decrypted-table-item" key={index}>
                  <td>{result.Variable}</td>
                  <td>{result.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="main__history">
        <h3 className="main__history-title">History:</h3>
        <ul className="main__history-list">
          {history.map((code, index) => (
            <li className="main__history-item" key={index}>
              <button
                className="main__history-btn"
                onClick={() => {
                  setVinCode(code);
                  scrollToTop();
                }}
              >
                {code}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
