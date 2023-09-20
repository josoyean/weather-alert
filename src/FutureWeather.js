
import React from 'react'
import { styled } from 'styled-components'

function FutureWeather({mainTitle,rainValue,taMin,taMax,iconValue,teValue,pcpValue,uuuValue}) {


    const iconName = (Weather) => {
        let skyName = "";
    
        if (Weather === "맑음" || Weather === '1') {
          skyName = "sun";
 
        } else if (Weather === "흐림" || Weather === "4") {
          skyName = "cloudy";
      
        } else if (Weather === "구름많음" || Weather === '3') {
          skyName = "clouds";
        }else{
          skyName = "cloudy-rain";
        }
        return skyName;
      };

      const skyText = (Weather) => {
        let skyName = "";
    
        if ( Weather === '1') {
          skyName = "맑음";
 
        } else if ( Weather === "4") {
          skyName = "흐림";
      
        } else if (Weather === '3') {
          skyName = "구름많음";
        }else{
          skyName = "흐리고 비";
        }
        return skyName;
      };
  return (

    <li>
       <em>{mainTitle === 0 ?'오전':'오후'}</em>
       <div className='temperature-wrap'>
        <i className={iconName(iconValue)}></i>
        <span>{teValue}°</span>
       </div>
<SkyInfor>{skyText(iconValue)}</SkyInfor>
    <em>강수확률 <RainNum>{rainValue}%</RainNum></em>
    <div className='item-box'>
        <ItemValue>
        <em>강수량</em>
        <span>{pcpValue}</span>
        </ItemValue>
        <ItemValue>
        <em>풍속</em>
        <span>{uuuValue}m/s</span>
        </ItemValue>

    </div>
    </li>
  )
}

export default FutureWeather

const SkyInfor = styled.span`
 margin-bottom: 5px;
 color: #8f8f8f;
 font-size: 15px;
`
const RainNum = styled.span`
 color: #76b7e7;
 margin-left: 5px;

`
const ItemValue = styled.div`
display: flex;
flex-direction: column;
align-items: center;

padding: 8px;
    box-sizing: border-box;
    background-color: #76b7e7;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 3px;
    font-size: 14px;
    color: #fff;
`