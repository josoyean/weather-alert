import React from "react";

function Weekend({ weekDay, amValue, pmValue, amWf, pmWf ,taMin,taMax}) {
    console.log(taMax)
    console.log(taMin)
    console.log('')
  const iconName = (Weather) => {
    let skyName = "";
    if (Weather === "맑음") {
      skyName = "sun";
    } else if (Weather === "흐림") {
      skyName = "cloudy";
    } else if (Weather === "구름많음") {
      skyName = "clouds";
    }
    return skyName;
  };

  const weekDaySet = (setData) => {
    return String(setData).substr(4, 2) + "." + String(setData).substr(6, 2);
  };
  const weekDateSet = (setData) => {
    const weekDate = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    let date = new Date(
      String(setData).substr(0, 4),
      String(setData).substr(4, 2) - 1,
      String(setData).substr(6, 2)
    ).getDay();
    return weekDate[date];
  };
  return (
    <li>
      <div className="day-content">
        <span className="day-date">{weekDateSet(weekDay)}</span>
        <span className="date">{weekDaySet(weekDay)}</span>
      </div>
      <div className="am-box">
        <span className="rainfall">
          <em className="title">오전</em>
          <em>{amValue}%</em>
        </span>
        <i className={iconName(amWf)}></i>
      </div>
      <div className="pm-box">
        <span className="rainfall">
          <em className="title">오후</em>
          <em>{pmValue}%</em>
        </span>
        <i className={iconName(pmWf)}></i>
      </div>
      <div className="max-min-content">
        <span className="min-num">{taMin}°</span>
        <em>/</em>
        <span className="max-num">{taMax}°</span>
      </div>
    </li>
  );
}

export default Weekend;
