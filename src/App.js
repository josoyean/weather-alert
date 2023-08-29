import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import City from './City';
const URL = "/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
function App() {
  const [menu, setMenu] = useState(0);
  const [posts, setPosts] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [nowData, setNowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabClick = (i) => {
    setMenu(i);
  };
  
  const menuNum = (menu)=>{
    const now =new Date();
    const nowtotle=new Date(now.setDate(now.getDate()+menu));
    const nowYear=String(nowtotle.getFullYear());
    const nowMonth=String(nowtotle.getMonth()+1).padStart(2,"0");
    const nowDay=String(nowtotle.getDate()).padStart(2,"0");
    const nowDate=nowYear+nowMonth+nowDay;
    return nowDate
  }
  
// const now =new Date();
// const nowtotle=new Date(now.setDate(now.getDate()));

// const nowYear=String(nowtotle.getFullYear());
// const nowMonth=String(nowtotle.getMonth()+1).padStart(2,"0");
// const nowDay=String(nowtotle.getDate()).padStart(2,"0");
// const nowDate=nowYear+nowMonth+nowDay;
// const nowHours = String(now.getHours())>=10 ? now.getHours()+'00' : '0'+now.getHours() +'00';


const fetchDataTest = async(test) =>{
  const json = await(
    await fetch(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${test}&base_time=0500&nx=62&ny=127`
      )
      ).json();
      
   
      setApiData(json.response.body.items.item)
      setLoading(true)
      
    }
    
    useEffect(()=>{
      fetchDataTest(menuNum(menu));
},[]);

const cityObj= useCallback((posts)=>{
  apiData.map(function (index,item) {
    if(menuNum(menu) === index.fcstDate){
      fetchData();
    }
  })
},[apiData,menu]);




const fetchData = (posts,item) => {

  return(
    <City key={item} fcstValue={apiData[posts * 12].fcstValue} uuuValue={apiData[posts * 12 + 1].fcstValue} popValue={apiData[posts * 12 + 7].fcstValue} pcpValue={apiData[posts * 12 + 9].fcstValue} rehValue={apiData[posts * 12 + 10].fcstValue} menu={menu} skyValue={apiData[posts * 12 + 5].fcstValue}></City>
    )
}

  return (
    <div className="App">
      {
        loading === false ? <span>loading</span> :<div className="contents">
        <div className='show'>
        {/* <div className={menu === 0 ? "show" : "none"}> */}
        <ul className="tryWrap">
            { 
            apiData.map(function (index,item) {
              if(menuNum(menu) === index.fcstDate){
               return fetchData(posts,item);
              }
            })
            }
          </ul>
        </div>
        {/* <div className={menu === 1 ? "show" : "none"}>
          <ul className="tryWrap">
            { 
              fetchData()
            }
          </ul>
        </div>
        <div className={menu === 2 ? "show" : "none"}>
          <span>즐겨찾기
          </span>
        </div> */}
      </div>
      }
    
      <ul className="tab-menu">
        <li
          className={menu === 0 ? "menu my-map action"  : "menu my-map" }
          onClick={(e) => {
            tabClick(0);
          }}
        >
      
          <span>오늘</span>
        </li>
        <li
           className={menu === 1 ? "menu entire-map action"  : "menu entire-map" }
          onClick={(e) => {
            tabClick(1);
          }}
        >
    
          <span>내일</span>
        </li>
        <li
          className={menu === 2 ? "menu favorites action"  : "menu favorites" }
          onClick={(e) => {
            tabClick(2);
          }}
        >
  
          <span>모레</span>
        </li>
      </ul>
    </div>
  );


}

export default App;

