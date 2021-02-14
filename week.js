const week_form=document.querySelector("#week");

const start_="start_date";
const end_="end_date";

const days_for=[];
const divs=[];
const ols=[];
const inputs=[];
const todos_each=[];

const form_str="input_week";
const div_str="div_week";

function make_days(data){
    const year=data.getFullYear();
    const month=data.getMonth();
    const day=data.getDate();
    const day_Obj={
        year:year,
        month:month,
        day:day
    };
    days_for.push(day_Obj);
}

function make_submit_each(){
    let id=0;
    days_for.forEach(function(each){
        const div_each=document.createElement("div");
        const form_week=document.createElement("form");
        div_each.classList.add(div_str);
        form_week.classList.add(form_str);
        form_week.name=`${id}`;
        const input1=document.createElement("input");
        const input2=document.createElement("input");

        input1.type="text";
        input1.placeholder=`${each.year}-${each.month}-${each.day}`;
        input2.type="submit";
        input2.value="submit";

        form_week.appendChild(input1);
        form_week.appendChild(input2);

        div_each.appendChild(form_week);
        
        const ol_each=document.createElement("ul");
        div_each.appendChild(ol_each);

        week_form.appendChild(div_each);
        id=id+1;

        divs.push(div_each);
        ols.push(ol_each);
        inputs.push(input1);
    })
}

function handleSumbit(event){
    event.preventDefault();
    const event_num=parseInt(event.target.name);
    mySubmit(event_num);
}

function mySubmit(id){
    printToDos(inputs[id].value,id);
    inputs[id].value="";
}

function printToDos(text,id){
    const li=document.createElement("li");
    const btn=document.createElement("button");
    const span=document.createElement("span");
    const newID=todos.length+1;
    const todo_obj={
        text:text,
        id:newID
    };
    btn.innerText="❌";
    btn.addEventListener("click",deleteToDos);

    span.innerText=text;
    li.appendChild(btn);
    li.appendChild(span);
    li.id=newID;

    ols[id].appendChild(li);
    todos_each[id].todoList.push(text);
}

function deleteToDos(event){
    event.preventDefault();
    console.log("delete event", event.target.value);
}

function saveToDos(){
    localStorage.setItem(ToDos_LS,JSON.stringify(todos));
}

function main(){
    let sd=new Date(localStorage.getItem(start_));
    let ed=new Date(localStorage.getItem(end_));
    
    const gap=sd.getTime()-ed.getTime();
    const days=Math.floor(gap/(1000*60*60*24))*-1+1;
    let i=0;
    let dates=new Date(localStorage.getItem(start_));
    dates.setDate(dates.getDate()-1);
    for(i=0;i<days;i++){
        dates.setDate(dates.getDate()+1);
        make_days(dates);
        const w_todo_obj={
            id:i,
            todoList:[]
        }
        todos_each.push(w_todo_obj);
    }

    make_submit_each();



    week_form.addEventListener("submit",handleSumbit);
}

main();