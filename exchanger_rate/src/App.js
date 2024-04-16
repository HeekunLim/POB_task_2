import React from "react";

function App() {
  const [cost, setCost] = React.useState(0);
  const [country, setCountry] = React.useState([
    "USD",
    "CAD",
    "KRW",
    "HKD",
    "JPY",
    "CNY",
  ]);
  const [choose, setChoose] = React.useState("USD");
  const [choose2, setChoose2] = React.useState("CAD");

  const costChanged = (e) => {
    e.target.value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setCost(e.target.value);
    e.target.value = e.target.value
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    console.log("금액" + cost);
  };

  const countryChanged = (e) => {
    setChoose(e.target.value);

    if (e.target.value === "USD") setChoose2("CAD");
    else setChoose2("USD");

    console.log("선택" + choose);
    console.log("버튼" + choose2);
  };

  const countryClick = (e) => {
    setChoose2(e.target.value);

    console.log("버튼" + choose2);
  };

  return (
    <div className="App">
      <input
        id="costInput"
        type="text"
        placeholder={choose}
        onChange={costChanged}
      />
      <select id="countryIn" onChange={countryChanged} defaultValue="USD">
        {country.map((country1) => {
          return (
            <option key={country1} value={country1}>
              {country1}
            </option>
          );
        })}
      </select>
      {country.map((country2) => {
        if (country2 !== choose)
          return (
            <button
              key={country2}
              id={country2}
              value={country2}
              onClick={countryClick}
            >
              {country2}
            </button>
          );
      })}
      {choose2}
    </div>
  );
}

export default App;
