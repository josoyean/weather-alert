import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import City from "./City";
function App() {
  const [menu, setMenu] = useState(2);
  const [posts, setPosts] = useState([]);
  const [apiData, setApiData] = useState([]);
  const tabClick = (i) => {
    setMenu(i);
  };
  
  const getParameters = {
    serviceKey:
      "knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D",
    returnType: "json",
    numOfRows: "100",
    pageNo: "1",
    ver: "1.0",
    sidoName:  '서울',
  };
  useEffect(() => {
    axios.get(
        `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters["serviceKey"]}&returnType=${getParameters["returnType"]}&numOfRows=${getParameters["numOfRows"]}&pageNo=${getParameters["pageNo"]}&ver=${getParameters["ver"]}&sidoName=${getParameters["sidoName"]}`
       
      )
      .then((response) => {
        setApiData(response.data['response']['body']['items']);
      }).catch(()=>{

      });
    }, []);

   

  return (
    <div className="App">
      <div className="contents">
        <div className={menu === 1 ? "show" : "none"}>
        {apiData.map((item,index) => {
              return (
                <City  key={index}  sidoName={item.sidoName} dataTime={item.dataTime} stationName={item.stationName} pm10Grade={item.pm10Grade} pm10Value={item.pm10Value}
                ></City>
              );
            })}
        </div>
        <div className={menu === 2 ? "show" : "none"}>
          <ul className="tryWrap">
            {apiData.map((item,index) => {
              return (
                <City key={index}  sidoName={item.sidoName} dataTime={item.dataTime} stationName={item.stationName} pm10Grade={item.pm10Grade} pm10Value={item.pm10Value}
                ></City>
              );
            })}
          </ul>
        </div>
        <div className={menu === 3 ? "show" : "none"}>
          <span>즐겨찾기
          </span>
        </div>
      </div>
      <ul className="tab-menu">
        <li
          className={menu === 1 ? "menu my-map action"  : "menu my-map" }
          onClick={(e) => {
            tabClick(1);
          }}
        >
          <i></i>
          <span>내 지역보기</span>
        </li>
        <li
           className={menu === 2 ? "menu entire-map action"  : "menu entire-map" }
          onClick={(e) => {
            tabClick(2);
          }}
        >
          <i></i>
          <span>전체 시도보기</span>
        </li>
        <li
          className={menu === 3 ? "menu favorites action"  : "menu favorites" }
          onClick={(e) => {
            tabClick(3);
          }}
        >
          <i></i>
          <span>즐겨찾기</span>
        </li>
      </ul>
    </div>
  );
}

export default App;

