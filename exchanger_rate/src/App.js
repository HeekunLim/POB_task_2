import React from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setRate, setDate } from "./redux/slice";
import styled from "styled-components";

function App() {
  const country = ["USD", "CAD", "KRW", "HKD", "JPY", "CNY"];
  const [cost, setCost] = React.useState(0);
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
    <StyledAppContainer>
      <StyledInnerContainer>
        <StyledInputRow>
          <input
            id="costInput"
            type="text"
            dir="rtl"
            placeholder={choose}
            onChange={costChanged}
            style={{
              fontSize: "30px",
              height: "34px",
              margin: "5px",
            }}
          />
          <select
            id="countryIn"
            onChange={countryChanged}
            defaultValue="USD"
            style={{
              fontSize: "30px",
              height: "40px",
              margin: "5px",
            }}
          >
            {country.map((country1) => {
              return (
                <option key={country1} value={country1}>
                  {country1}
                </option>
              );
            })}
          </select>
        </StyledInputRow>
        <StyledButtonRow>
          {country.map((country2) => {
            if (country2 !== choose)
              return (
                <button
                  key={country2}
                  id={country2}
                  value={country2}
                  onClick={countryClick}
                  style={{
                    fontSize: "30px",
                    height: "40px",
                    margin: "5px",
                  }}
                >
                  {country2}
                </button>
              );
          })}
        </StyledButtonRow>
        <StyledResultRow>
          <p
            style={{
              fontSize: "50px",
              color: "blueviolet",
            }}
          >
            {choose2 + ":"}&nbsp;
          </p>
          <p
            style={{
              fontSize: "50px",
            }}
          >
            {(cost / rate[choose]) * rate[choose2]}
          </p>
        </StyledResultRow>
        <StyledDateRow>
          <p
            style={{
              fontSize: "30px",
            }}
          >
            기준일:&nbsp;
          </p>
          <input
            id="dateIn"
            type="date"
            value={date}
            onChange={dateChanged}
            style={{
              fontSize: "30px",
            }}
          />
        </StyledDateRow>
      </StyledInnerContainer>
    </StyledAppContainer>
  );
}

export default App;

const StyledAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  margin: 50px;
  border: solid;
`;

const StyledInputRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledResultRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 300px;
`;

const StyledDateRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
