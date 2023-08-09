import React, { useState } from "react";
import styled from "styled-components";
function City({ stationName, sidoName, pm10Grade, pm10Value,dataTime }) {
  const [isClick,setIsClick]=useState(false)

  const gradeItem = ["좋음", "보통", "한때나쁨", "나쁨", "매우나쁨"];
  const grade = (gradeText) => {
    let gradeName = "";

    if (gradeText === undefined || gradeText === "-") {
      gradeName = "알수없음";
    } else {
      gradeName = gradeText;
    }
    return gradeName;
  };

  const iconClick=()=>{
    
        if(isClick){
           setIsClick(false)
        }else{
            setIsClick(true)
        }
  }
  return (
    <CityItem>
      <div className="item-header">
        <div className="city-name">
          <span className="sub">{sidoName}</span>{" "}
          <span className="main">{stationName}</span>
        </div>
        <Favorites 
        onClick={iconClick}
        className={isClick?'on':'off'} ></Favorites>
      </div>
      <div className="item-container">
        <Grade>{grade(gradeItem[pm10Grade - 1])}</Grade>
        <Pm10Value>미세먼지 수치 : {grade(pm10Value)}</Pm10Value>
        <Time>({dataTime} 기준)</Time>
        {/* <span>미세먼지 수치 : {grade(pm10Value)}</span> */}
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
