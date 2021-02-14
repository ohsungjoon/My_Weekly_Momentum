const form_start=document.querySelector(".start_date"),
    input_start=form_start.querySelector("input");

const form_end=document.querySelector(".end_date"),
    input_end=form_end.querySelector("input");

const result_form=document.querySelector(".result_date");

const start="start_date";
const end="end_date";
const showing_="showing";
let start_day=null;
let end_day=null;

let today="";

function setToday()
{
    const date=new Date();
    const year=date.getFullYear();  
    const month=date.getMonth()+1;
    const day=date.getDate();

    today=`${year}-${month<10? `0${month}`:month}-${day<10? `0${day}`:day}`;
}

function handleStart(event){
    event.preventDefault();
    start_day=input_start.value;
    localStorage.setItem(start,start_day);
    form_start.classList.remove(showing_);
    set_end_day();
}

function set_start_day(){
    form_start.classList.add(showing_);
    input_start.setAttribute("min",today);
    form_start.addEventListener("submit",handleStart);
}

function handleEnd(event){
    event.preventDefault();
    end_day=input_end.value;
    localStorage.setItem(end,end_day);
    form_end.classList.remove(showing_);
    printDay();
}

function set_end_day(){
    form_end.classList.add(showing_);
    input_end.setAttribute("min",start_day);
    form_end.addEventListener("submit",handleEnd);
}

function printDay(){
    result_form.classList.add(showing_);
    result_form.innerText=`Plan Term: ${start_day}~${end_day}`;
    let weekly=document.createElement("script");
    weekly.src="weekly.js";
    document.body.appendChild(weekly);

    let week=document.createElement("script");
    week.src="week.js";
    document.body.appendChild(week);
}

function main()
{
    setToday();
    const local_start=localStorage.getItem(start);
    const local_end=localStorage.getItem(end);
    if(local_start===null && local_end===null){
        set_start_day();
    }
    else{
        start_day=local_start;
        end_day=local_end;
        printDay();
    }
}

main();