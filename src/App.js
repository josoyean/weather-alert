import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./App.css";
import City from "./City";

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
  const [nowData, setNowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
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

  const fetchDataTest = async () => {
    const json = await (
      await fetch(
        `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${menuNum(
          0
        )}&base_time=0500&nx=62&ny=127`
      )
    ).json();

    setApiData(json.response.body.items.item);
    setLoading(true);

  };
  const fetchDataTest1 = async () => {
    const json = await (
      await fetch(
        `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=knxz%2FlyNk0FjzlTCfJjZUPUucLIHmodcfjVN4xS%2FjYX76aaGg8%2FmSWhc1v5iXk4VfTLty9gPewCNeVL83HHlEg%3D%3D&pageNo=1&numOfRows=100&dataType=JSON&regId=11B00000&tmFc=${menuNum(0)}0600`
      )
    ).json();

    setApiData1(json.response.body.items.item);
    setLoading1(true);
  };
  
  useEffect(() => {
    fetchDataTest();
  }, []);
  
  
  useEffect(() => {
    fetchDataTest1();
    console.log(apiData1)
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

  const weekendWeather = () => {
    console.log(apiData1[0])
    const newArr = [];
    setAmPm(!ampm)
for(let i=3; i<8 ;i++){
  
  newArr.push(<span key={i}>{
    ampm == false  ? '안':'녕'
  }</span>)
}
   return newArr
  };
  return (
    <div className="App">
      {(loading === false) || (loading1 === false) ? (
        <span>loading</span>
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
