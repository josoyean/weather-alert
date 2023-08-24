import React, { useEffect, useState } from "react";
import "./App.css";
import City from './City';
const URL = "/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
function App() {
  const [menu, setMenu] = useState(1);
  const [posts, setPosts] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tabClick = (i) => {
    setMenu(i);
  };

const now =new Date();
const nowYear=String(now.getFullYear());
const nowMonth=String(now.getMonth()+1).padStart(2,"0");
const nowDay=String(now.getDate()-1).padStart(2,"0");
const nowDate=nowYear+nowMonth+nowDay;
const nowHours = String(now.getHours())>=10 ? now.getHours()+'00' : '0'+now.getHours() +'00'

const fetchDataTest = async()=>{
  const json = await(
    await fetch(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${nowDate}&base_time=0500&nx=62&ny=127`
    )
    ).json();
    setApiData(json.response.body.items.item)
   setLoading(true)

}

useEffect(()=>{
  fetchDataTest()
},[])

useEffect(()=>{
//  console.log(apiData[posts * 12 + 1].fcstValue)
},[apiData])

const fetchData = () => {
  return(
    <City key={1} fcstValue={apiData[posts * 12].fcstValue} uuuValue={apiData[posts * 12 + 1].fcstValue} popValue={apiData[posts * 12 + 7].fcstValue} pcpValue={apiData[posts * 12 + 9].fcstValue} rehValue={apiData[posts * 12 + 10].fcstValue} menu={menu}></City>
    )
}

  return (
    <div className="App">
      {
        loading === false ? <span>loading</span> :<div className="contents">
        <div className={menu === 1 ? "show" : "none"}>
        <ul className="tryWrap">
            { 
              fetchData()
            }
          </ul>
        </div>
        <div className={menu === 2 ? "show" : "none"}>
          <ul className="tryWrap">
            { 
              fetchData()
            }
          </ul>
        </div>
        <div className={menu === 3 ? "show" : "none"}>
          <span>즐겨찾기
          </span>
        </div>
      </div>
      }
      
      {/* <div className="contents">
        <div className={menu === 1 ? "show" : "none"}>
        {apiData.map((item,index) => {
              // return (
                // <City key={index}></City>
              // );
            })}
        </div>
        <div className={menu === 2 ? "show" : "none"}>
          <ul className="tryWrap">
            { 
              fetchData()
            }
          </ul>
        </div>
        <div className={menu === 3 ? "show" : "none"}>
          <span>즐겨찾기
          </span>
        </div>
      </div> */}
      <ul className="tab-menu">
        <li
          className={menu === 1 ? "menu my-map action"  : "menu my-map" }
          onClick={(e) => {
            tabClick(1);
          }}
        >
      
          <span>오늘</span>
        </li>
        <li
           className={menu === 2 ? "menu entire-map action"  : "menu entire-map" }
          onClick={(e) => {
            tabClick(2);
          }}
        >
    
          <span>내일</span>
        </li>
        <li
          className={menu === 3 ? "menu favorites action"  : "menu favorites" }
          onClick={(e) => {
            tabClick(3);
          }}
        >
  
          <span>모레</span>
        </li>
      </ul>
    </div>
  );


}

export default App;

