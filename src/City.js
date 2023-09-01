import React from "react";
import styled from "styled-components";
function City({skyValue, fcstValue,uuuValue,rehValue,pcpValue,popValue,ptyValue,fcstDate,fcstTime,menu}) {
// console.log(fcstTime)
console.log(menu)
  const iconName = (skyValue,ptyValue)=>{
    let skyName = '';
    if(skyValue === '1'){
      skyName = 'sun';
    }else if(skyValue === '3'){
      skyName = 'clouds';
    }else if(skyValue === '4'){
      if(ptyValue === '0'){
        skyName = 'cloudy';
      }else if(ptyValue === '1'){
        skyName = 'rain';
      }else if(ptyValue === '2'){
        skyName = 'rain';
      }else if(ptyValue === '3'){
        skyName = 'snow';
      }else if(ptyValue === '4'){
        skyName = 'shower';
      }
 
    }
    return skyName;
  }

  return (
    <CityItem>
      {/* <div className="item-header">
        <div className="city-name">
          <span className="main">{
            menu === 1 ? '오늘' : menu === 2 ? '내일' : '모레'
          } 날씨</span>
        </div>
      </div> */}
      <div className="item-box">
        <span className="item-header">
        {
             menu === 0 ? '오늘' : menu === 1 ? '내일' : '모레'
        }의 날씨
        </span>
      <div className="item-container">
        <i className={iconName(skyValue,ptyValue) }></i>
        <Grade>{fcstValue} ℃</Grade>
      </div>
      <div className="item-wrap">
        <Pop><em>강수 확률</em>
        <span>
        {popValue}%
        </span>
        </Pop>
        <Pcp><em>강수량</em>{pcpValue}</Pcp>
        <Reh><em>습도</em>{rehValue}%</Reh>
        <Uuu><em>풍속</em>{uuuValue}m/s</Uuu>
      </div>
    
      </div>
    </CityItem>
  );
}

export default City;

const CityItem = styled.li`
  width: calc(100vw - 20px);
  box-sizing: border-box;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Grade = styled.span`
  box-sizing: border-box;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 5px;
  color: #000;
  text-align: center;
`;

const  Pcp= styled.span`
color: #fff;
`

const Reh = styled.span`
color: #fff;
`

const Pop = styled.span`
color: #fff;
`

const Uuu = styled.span`
color: #fff;
`
