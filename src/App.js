import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [first, setFirst] = useState("USD");
  const [second, setSecond] = useState("UAH");
  const [rate, setRate] = useState("");
  const [userInput, setUserInput] = useState();
  const [res, setRes] = useState(0);

  const getRate = (first, second) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=5a49beefa5e7696bc287`,
    })
      .then((response) => {
        setRate(response.data);
      })
      .catch((error) => {});
  };
  useEffect(
    () => setRes(Math.round(rate[`${first}_${second}`] * userInput)),
    [rate, userInput, first, second]
  );
  const reverser = () => {
    return setFirst(second), setSecond(first);
  };
  return (
    <>
      <div className="wrap">
        <div className="mainWrap">
          <h2>CURRENCY CONVERTER</h2>{" "}
          <p>Enter a currency code (example: UAH)</p>
          <div className="currencyInputWrapper">
            <input
              className="currencyInput"
              type="text"
              value={first}
              placeholder="FROM"
              onChange={(e) => setFirst(e.target.value)}
              required
              pattern="/^[A-Z]{3}$/gm"
            />
            <img
              src="https://img.icons8.com/color/48/000000/connection-sync--v1.png"
              onClick={reverser}
            />
            <input
              type="text"
              value={second}
              placeholder="TO"
              className="currencyInput"
              onChange={(e) => setSecond(e.target.value)}
              required
            />
          </div>
          <div className="convertation">
            <div className="inputWrapper">
              <div className="wrapInputandCurrency">
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(Number(e.target.value))}
                  className="convertationInput convInputMain"
                  placeholder="amount"
                  required
                ></input>
                <p className="currencyName"> {first} </p>
              </div>
              <div readonly className="wrapInputandCurrency">
                {" "}
                <input
                  className="convertationInput convInputReadonly"
                  value={isNaN(res) ? "" : res}
                  placeholder="amount"
                />{" "}
                <p className="currencyName"> {second}</p>
              </div>
            </div>
            <button
              className="convertBtn"
              onClick={() => {
                getRate(first, second);
              }}
            >
              CONVERT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
