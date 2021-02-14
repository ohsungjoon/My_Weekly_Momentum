const clockContainer=document.querySelector(".js_clock"),
    clockTitle =clockContainer.querySelector("h1");

const todayContainer=document.querySelector(".js_today"),
    todayTitle=todayContainer.querySelector("h3");

function get_clock(){
    const date=new Date();
    const year=date.getFullYear();
    const month=date.getMonth();
    const day=date.getDate();
    const hours=date.getHours();
    const minutes=date.getMinutes();
    const seconds=date.getSeconds();
    
    clockTitle.innerText=`${
        hours < 10 ? `0${hours}`:hours
    }:${
        minutes < 10 ? `0${minutes}`:minutes
    }:${
        seconds < 10 ? `0${seconds}`:seconds
    }`;

    todayTitle.innerText=`${year}년 ${month}월 ${day}일`;
}

function main(){
    setInterval(get_clock,1);
}

main();