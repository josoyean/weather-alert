import React, { useState } from "react";
import styled from "styled-components";
function City({fcstValue }) {
  const [isClick,setIsClick]=useState(false)
console.log('fcstValue',fcstValue)
 

  // const iconClick=()=>{
  //       if(isClick){
  //          setIsClick(false)
  //       }else{
  //           setIsClick(true)
  //       }
  // }
  return (
    <CityItem>
      <div className="item-header">
        <div className="city-name">
          <span className="sub"></span>{" "}
          <span className="main"></span>
        </div>
        <Favorites 
        // onClick={iconClick}
        className={isClick?'on':'off'}>

        </Favorites>
      </div>
      <div className="item-container">
        <Grade></Grade>
        <Pm10Value></Pm10Value>
        <Time></Time>
        <span></span>
      </div>
    </CityItem>
  );
}

export default City;

const CityItem = styled.li`
  width: calc(100vw - 40px);
  /* height: 100px; */
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #76b7e7;
  margin-bottom: 20px;
  border-radius: 7px;
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
  /* display: block; */
  width: 150px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 5px;
  color: #76b7e7;
  text-align: center;
  padding: 20px;

  /* background-image: url(./images/favorites.png); */
`;
const  Pm10Value= styled.span`
color: #fff;

`

const Time = styled.span`
color: #fff;

`
