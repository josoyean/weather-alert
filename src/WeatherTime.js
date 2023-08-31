import React from 'react';

function WeatherTime({weatherIndex,tmpValue,fcstTime,fcstDate,baseDate,cityNowSkyDate,cityNowPtyDate}) {

const iconName = (citySkyDate,cityPtyDate)=>{
  let name = '';
  if(citySkyDate === '1'){
   name = 'sun';
  }else if(citySkyDate === '3'){
 name = 'clouds';
  }else if(citySkyDate === '4'){
    if(cityPtyDate === '0'){
      name = 'cloudy';
    }else if(cityPtyDate === '1'){
      name = 'rain';
    }else if(cityPtyDate === '2'){
      name = 'rain';
    }else if(cityPtyDate === '3'){
      name = 'snow';
    }else if(cityPtyDate === '4'){
      name = 'shower';
    }
  }
  return name ;
}

const toDate = (date_str)=>{
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0,4);
    var sMonth = yyyyMMdd.substring(4,6);
    var sDate = yyyyMMdd.substring(6,8);

    return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
}

const between_date = (date1, date2)=>{
const dateA = new Date(date1);
const dateB = new Date(date2);
const diffMSec = dateA.getTime() - dateB.getTime();
const diffDate = diffMSec / (24 * 60 * 60 * 1000);

return diffDate
}

  return (
    <li className={between_date(toDate(fcstDate),toDate(baseDate)) === 0 ? 'nowLable': between_date(toDate(fcstDate),toDate(baseDate))===1 ?'tomorrowLable':between_date(toDate(fcstDate),toDate(baseDate)) ===2 ?'afterTomorrowLable' : ''}>
     <i className={
    iconName(cityNowSkyDate,cityNowPtyDate)
     }></i>
      <span className='dayDate'>{tmpValue}℃</span>
      <span className='time'>{
        weatherIndex === 0 ? '현재': fcstTime === '00' ?weatherIndex <= 12?'내일':'모레' : `${fcstTime}시`
        }</span>
        </li>
  )
}

export default WeatherTime