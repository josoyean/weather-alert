import React from "react";
import styled from "styled-components";
function City({skyValue, fcstValue,uuuValue,rehValue,pcpValue,popValue,menu}) {

  const iconName = (skyValue)=>{
    let skyName = '';
    if(skyValue === '1'){
      skyName = 'sun';
    }else if(skyValue === '3'){
      skyName = 'clouds';
    }else if(skyValue === '4'){
      skyName = 'cloudy';
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
      <div className="item-container">
        <i className={iconName(skyValue) }></i>
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
  width: calc(100vw - 40px);
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Favorites = styled.i`
  display: block;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  /* background-image: url(./images/favorites.png); */
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
