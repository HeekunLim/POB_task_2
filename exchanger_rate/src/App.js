import React from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setRate, setDate } from "./redux/slice";

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

  const dispatch = useDispatch();
  const { rate, date } = useSelector((state) => state.exchange);

  React.useEffect(() => {
    try {
      Axios.get(
        `https://api.apilayer.com/exchangerates_data/${date}?base=USD&symbols=USD,CAD,KRW,HKD,JPY,CNY&apikey=${process.env.REACT_APP_API_KEY}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        dispatch(setRate(response.data.rates));
      });
    } catch (error) {
      console.error(error);
    }
  }, [date]);

  const costChanged = (e) => {
    e.target.value = Number(e.target.value.replace(/[^0-9]/g, ""));
    setCost(e.target.value);
    e.target.value = e.target.value
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  const countryChanged = (e) => {
    setChoose(e.target.value);

    if (e.target.value === "USD") setChoose2("CAD");
    else setChoose2("USD");
  };

  const countryClick = (e) => {
    setChoose2(e.target.value);
  };

  const dateChanged = (e) => {
    dispatch(setDate(e.target.value));
  };

  return (
    <div className="App">
      <div>
        <input
          id="costInput"
          type="text"
          dir="rtl"
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
      </div>
      <div>
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
      </div>
      <div>
        {choose2}: {(cost / rate[choose]) * rate[choose2]}
      </div>
      <div>
        기준일
        <input id="dateIn" type="date" value={date} onChange={dateChanged} />
      </div>
    </div>
  );
}

export default App;
