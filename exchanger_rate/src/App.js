import React from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setRate, setDate } from "./redux/slice";
import styled from "styled-components";

function App() {
  // 지원 국가 목록
  const country = ["USD", "CAD", "KRW", "HKD", "JPY", "CNY"];
  // 입력된 금액
  const [cost, setCost] = React.useState(0);
  // 드롭다운 메뉴에서 선택된 국가
  const [choose, setChoose] = React.useState("USD");
  // 버튼으로 선택된 국가
  const [choose2, setChoose2] = React.useState("CAD");

  // 월 목록
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // 날짜 다른 포맷
  const [date2, setDate2] = React.useState("날짜를 선택해주세요");

  // redux에 있는 api에서 받아온 환율, 선택된 날짜
  const dispatch = useDispatch();
  const { rate, date } = useSelector((state) => state.exchange);

  // 입력된 금액 변화 이벤트
  const costChanged = (e) => {
    // 숫자 이외에는 제거
    e.target.value = Number(e.target.value.replace(/[^0-9]/g, ""));

    // 금액 저장
    setCost(e.target.value);

    // 콤마 추가
    e.target.value = e.target.value
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  // 드롭다운 메뉴 선택 이벤트
  const countryChanged = (e) => {
    // 선택된 국가 저장
    setChoose(e.target.value);

    // 버튼 갯수는 5개로 유지해야 되기에
    // 버튼으로 선택된 국가의 초기값을 지정
    if (e.target.value === "USD") setChoose2("CAD");
    else setChoose2("USD");
  };

  // 버튼 클릭 이벤트
  const countryClick = (e) => {
    // 클릭된 국가 저장
    setChoose2(e.target.value);
  };

  // 날짜 선택 이벤트
  const dateChanged = (e) => {
    // 선택된 날짜의 api 가져오기
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

    // 선택된 국가 저장
    dispatch(setDate(e.target.value));

    // 선택된 날짜를 다른 날짜 포맷으로 변환
    const newDate = new Date(e.target.value);
    const year = newDate.getFullYear();
    const month = months[newDate.getMonth()];
    const day =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

    setDate2(`${year}-${month}-${day}`);
  };

  return (
    <StyledAppContainer>
      <StyledInnerContainer>
        <StyledCenter>
          {/* 금액 입력 */}
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

          {/* 드롭다운 메뉴 국가 선택 */}
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
        </StyledCenter>

        <StyledCenter>
          {/* 버튼 국가 선택 */}
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
        </StyledCenter>

        <StyledResultRow>
          {/* 환율 계산 결과 출력 */}
          <p
            style={{
              fontSize: "50px",
              color: "blueviolet",
            }}
          >
            {choose2 + ":"}&nbsp;
          </p>

          {/* 환율을 선택된 국가들의 비율에 따라 계산*/}
          <p
            style={{
              fontSize: "50px",
            }}
          >
            {(cost / rate[choose]) * rate[choose2]}
          </p>
        </StyledResultRow>

        <StyledCenter>
          {/* 선택된 날짜를 다른 포맷으로 출력 */}
          <p
            style={{
              fontSize: "30px",
            }}
          >
            {date2}
          </p>
        </StyledCenter>

        <StyledCenter>
          {/* 날짜 선택 */}
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
        </StyledCenter>
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

const StyledCenter = styled.div`
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
