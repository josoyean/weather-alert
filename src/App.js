import React, { useEffect, useState } from "react";

import "./App.css";
import City from "./City";
const URL = "/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
function App() {
  const [menu, setMenu] = useState(2);
  const [posts, setPosts] = useState([]);
  const [apiData, setApiData] = useState([]);
  const tabClick = (i) => {
    setMenu(i);
  };

  // const getParameters = {
  //   serviceKey:
  //   process.env.REACT_APP_API_KEY,
  //   returnType: "json",
  //   numOfRows: "100",
  //   pageNo: "1",
  //   ver: "1.0",
  //   sidoName:  '서울',
  // };
  // useEffect(() => {
  //   axios.get(
  //       `B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters["serviceKey"]}&returnType=${getParameters["returnType"]}&numOfRows=${getParameters["numOfRows"]}&pageNo=${getParameters["pageNo"]}&ver=${getParameters["ver"]}&sidoName=${getParameters["sidoName"]}`
       
  //     )
  //     .then((response) => {
  //       console.log(response)
  //       setApiData(response.data['response']['body']['items']);
  //     }).catch(()=>{
        
  //     });
  //   }, []);
  

// const  fetchData = async()=>{
//   try {
//     const response = await axios.get(URL, {
//       data: {
//         serviceKey:
//       'knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D',
//       // process.env.REACT_APP_API_KEY,
//       returnType: "json",
//       numOfRows: "100",
//       pageNo: "1",
//       ver: "1.0",
//       sidoName:  '',
//       }
//     });
//     console.log(response)


//     // setApiData(response.data);
//   }catch(error){
//     console.error('Error:', error);
    
//   }
// }
const now =new Date();
const nowYear=String(now.getFullYear());
const nowMonth=String(now.getMonth()+1).padStart(2,"0");
const nowDay=String(now.getDate()).padStart(2,"0");
const nowDate=nowYear+nowMonth+nowDay;
console.log(nowYear+nowMonth+nowDay)

const fetchDataTest = async()=>{
  const json = await(
    await fetch(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20230815&base_time=0500&nx=62&ny=127`
      // `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&returnType=json&numOfRows=100&pageNo=1&ver=1.0`
    )
    ).json();
    console.log(json.response.body)
    // setApiData(json.data.movies)
  
}

   useEffect(()=>{
    // fetchData()
    fetchDataTest()

   },[])

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

