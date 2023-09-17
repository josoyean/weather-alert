import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./App.css";
import City from "./City";
import Loading from "./Loading";
import Weekend from "./Weekend";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import WeatherTime from "./WeatherTime";
const URL = "/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
function App() {
  const [menu, setMenu] = useState(0);
  const [posts, setPosts] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [apiData1, setApiData1] = useState([]);
  const [apiData2, setApiData2] = useState([]);
  const [nowData, setNowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ampm, setAmPm] = useState(false);

  const tabClick = (i) => {
    setMenu(i);
  };

  const menuNum = (menu) => {
    const now = new Date();
    const nowtotle = new Date(now.setDate(now.getDate() + menu));
    const nowYear = String(nowtotle.getFullYear());
    const nowMonth = String(nowtotle.getMonth() + 1).padStart(2, "0");
    const nowDay = String(nowtotle.getDate()).padStart(2, "0");
    const nowDate = nowYear + nowMonth + nowDay;
    return nowDate;
  };



  useEffect(() => {
    axios
      .all([
        axios.get(`https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=100&dataType=JSON&regId=11B00000&tmFc=${menuNum(0)}0600`),
        axios.get(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${menuNum(0)}&base_time=0500&nx=62&ny=127`),
        axios.get(`https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=100&dataType=JSON&regId=11B10101&tmFc=${menuNum(0)}0600`)
      ])
      .then(axios.spread((res1, res2,res3) => 
   (
     setApiData1(res1.data.response.body.items.item),
     setApiData(res2.data.response.body.items.item),
     setApiData2(res3.data.response.body.items.item),
     setLoading(true)
     )
      )).catch(err => console.log(err));
  }, []);


  const cityObj = apiData.filter((item) => {
    return item.fcstDate === menuNum(menu);
  });
  const now = new Date();
  const nowHours =
    String(now.getHours()) >= 10
      ? now.getHours() + "00"
      : "0" + now.getHours() + "00";
  let cityUuu,
    cityPop,
    cityPcp,
    cityReh,
    citySky,
    cityNowObj,
    cityTmp,
    cityNowSky,
    morningAfternoon,
    morningAfternoon1,
    cityMin,
    cityMax,
    maxmin,
    cityNowPty;

  useMemo(() => {
   
    cityTmp = apiData.filter((item) => {
      return (
        item.category === "TMP" &&
        item.fcstDate + item.fcstTime >= menuNum(menu) + nowHours
      );
    });

    cityUuu = cityObj.filter((item) => {
      return item.category === "UUU";
    });

    cityPop = cityObj.filter((item) => {
      return item.category === "POP";
    });

    cityPcp = cityObj.filter((item) => {
      return item.category === "PCP";
    });

    cityReh = cityObj.filter((item) => {
      return item.category === "REH";
    });

    citySky = cityObj.filter((item) => {
      return item.category === "SKY";
    });

    cityNowSky = apiData.filter((item) => {
      return (
        item.category === "SKY" &&
        item.fcstDate + item.fcstTime >= menuNum(menu) + nowHours
      );
    });

    cityNowPty = apiData.filter((item) => {
      return (
        item.category === "PTY" &&
        item.fcstDate + item.fcstTime >= menuNum(menu) + nowHours
      );
    });

    cityNowObj = apiData.filter((item) => {
      return item.fcstDate === item.baseDate && item.fcstTime === nowHours;
    });

    morningAfternoon1 = apiData.filter((item) => {
  return (item.category === 'POP');
    });
   
    // maxmin = apiData.filter((item) => {
    //   return (item.category === 'TMN' || item.category === 'TMX');
    //     });
  
        maxmin = apiData.filter((item) => {
          return (item.category === 'TMP');
            });

        cityMin = apiData.filter((item) => {
          return (item.category === 'TMN');
            });

            cityMax = apiData.filter((item) => {
              return (item.category === 'TMX');
                });

        morningAfternoon = apiData.filter((item) => {
          return (item.fcstDate === menuNum(0) && item.fcstTime === '1800') || (item.fcstDate === menuNum(2) && item.fcstTime === '1800') || (item.fcstDate === menuNum(1) && item.fcstTime === '1800' ) || (item.fcstDate === menuNum(0) && item.fcstTime === '0600') ||(item.fcstDate === menuNum(1) && item.fcstTime === '0600') ||(item.fcstDate === menuNum(2) && item.fcstTime === '0600');
            });

  }, [cityObj]);

  const fetchData = (posts, item) => {
    return (
      <City
        key={item}
        fcstDate={cityNowObj[0].fcstDate}
        fcstTime={String(cityNowObj[0].fcstTime).slice(0, 2)}
        fcstValue={cityNowObj[0].fcstValue}
        ptyValue={cityNowObj[6].fcstValue}
        uuuValue={cityNowObj[1].fcstValue}
        popValue={cityNowObj[7].fcstValue}
        pcpValue={cityNowObj[9].fcstValue}
        rehValue={cityNowObj[10].fcstValue}
        menu={menu}
        skyValue={cityNowObj[5].fcstValue}
      ></City>
    );
  };

  const fullWeather = (index) => {
    return (
      <SwiperSlide key={index}>
        {" "}
        <WeatherTime key={index}
          weatherIndex={index}
          cityNowPtyDate={cityNowPty[index].fcstValue}
          cityNowSkyDate={cityNowSky[index].fcstValue}
          fcstDate={cityTmp[index].fcstDate}
          baseDate={cityTmp[index].baseDate}
          tmpValue={cityTmp[index].fcstValue}
          fcstTime={String(cityTmp[index].fcstTime).slice(0, 2)}
        ></WeatherTime>
      </SwiperSlide>
    );
  };
  let wfDay,taDay,minDay,maxDay;
  const max = (num)=>{
    maxDay = maxmin.filter((item)=>{
   return (item.fcstDate === num)
    })

    return maxDay.map(o => o.fcstValue).reduce((max, curr) => max < curr ? curr : max );
  }
  
  const min = (num)=>{
    minDay = maxmin.filter((item)=>{
   return (item.fcstDate === num)
    })
    return minDay.map(o => o.fcstValue).reduce((min, curr) => min > curr ? curr : min );    
  }
  // reduce 대해 알아보고 그리고 티스토리에 올리기 중요
  let test =[];
  useMemo(()=>{
  wfDay= morningAfternoon.filter((item)=>{
return (item.category === 'SKY')
  })

  taDay= morningAfternoon.filter((item)=>{
    return (item.category === 'POP')
  })

  for(let i =0;i<3;i++){
     test.push(max(menuNum(i)));
     test.push(min(menuNum(i)));
  }
console.log('안녕', test)
 
  },[morningAfternoon])
const weekendWeather =() => {
  const rnSt=[apiData1[0].rnSt3Pm,apiData1[0].rnSt3Am,apiData1[0].rnSt4Pm,apiData1[0].rnSt4Am,apiData1[0].rnSt5Pm,apiData1[0].rnSt5Am,apiData1[0].rnSt6Pm,apiData1[0].rnSt6Am,apiData1[0].rnSt7Pm,apiData1[0].rnSt7Am]
  const wf=[apiData1[0].wf3Pm,apiData1[0].wf3Am,apiData1[0].wf4Pm,apiData1[0].wf4Am,apiData1[0].wf5Pm,apiData1[0].wf5Am,apiData1[0].wf6Pm,apiData1[0].wf6Am,apiData1[0].wf7Pm,apiData1[0].wf7Am]
  const ta=[apiData2[0].taMax3,apiData2[0].taMin3,apiData2[0].taMax4,apiData2[0].taMin4,apiData2[0].taMax5,apiData2[0].taMin5,apiData2[0].taMax6,apiData2[0].taMin6,apiData2[0].taMax7,apiData2[0].taMin7]
  const newArr = [];

  console.log(maxmin)
  for(let i=0; i<8 ;i++){
    if(i<3){
      newArr.push(
        <Weekend  key={i} weekDay={menuNum(i)} amValue={taDay[i*2].fcstValue} pmValue={taDay[i*2+1].fcstValue} pmWf={wfDay[i*2+1].fcstValue} amWf={wfDay[i*2].fcstValue}>
        </Weekend>
       
      )
    }else{
      // console.log(menuNum(i))
        newArr.push(
          <Weekend taMin={ta[i-2]} taMax={ta[i-3]} weekDay={menuNum(i)} key={i} amValue={rnSt[i-3]} pmValue={rnSt[i-2]} amWf={wf[i-3]} pmWf={wf[i-2]}>
          </Weekend>
      )
      }
 
}
 return newArr
  };

  return (
    <div className="App">
      {(loading === false) ? (
       <Loading></Loading>
      ) : (
        <div className="contents">
          <div className={menu === 0 ? "show today-content" : "none"}>
            <ul className="tryWrap">{fetchData()}</ul>
            <ul className="WeatherWrap">
              <Swiper
                slidesPerView={3}
                spaceBetween={15}
                modules={[Pagination]}
                className="mySwiper"
              >
                {cityTmp.map((item, index) => {
                  return fullWeather(index);
                })}
              </Swiper>
            </ul>
            {/* 주간 예보 */}
            <ul className="weekend-weather">
                {
                  weekendWeather()
                }
            </ul>
          </div>
          <div className={menu === 1 ? "show" : "none"}>
            <ul className="tryWrap"></ul>
          </div>
          <div className={menu === 2 ? "show" : "none"}>
            <span>즐겨찾기</span>
          </div>
        </div>
      )}

      <ul className="tab-menu">
        <li
          className={menu === 0 ? "menu my-map action" : "menu my-map"}
          onClick={(e) => {
            tabClick(0);
          }}
        >
          <span>오늘</span>
        </li>
        <li
          className={menu === 1 ? "menu entire-map action" : "menu entire-map"}
          onClick={(e) => {
            tabClick(1);
          }}
        >
          <span>내일</span>
        </li>
        <li
          className={menu === 2 ? "menu favorites action" : "menu favorites"}
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
