import React from "react";
import styled from "styled-components";
function City({fcstValue,uuuValue,rehValue,pcpValue,popValue,menu}) {

  return (
    <CityItem>
      <div className="item-header">
        <div className="city-name">
          <span className="main">{
            menu === 1 ? '오늘' : menu === 2 ? '내일' : '모레'
          } 날씨</span>
        </div>
      </div>
      <div className="item-container">
        <i className="item-icon"></i>
        <Grade>{fcstValue} ℃</Grade>
      </div>
      <div className="item-wrap">
        <Pop>{popValue}%</Pop>
        <Pcp>{pcpValue}mm</Pcp>
        <Reh>{rehValue}%</Reh>
        <Uuu>{uuuValue}m/s</Uuu>
        </div>
    </CityItem>
  );
}

export default City;

const CityItem = styled.li`
  width: calc(100vw - 40px);
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 20px;
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
  width: 150px;
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
