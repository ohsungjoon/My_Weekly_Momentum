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
const w_ToDos_LS="daily_todo";

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

        input1.type="text";
        input1.placeholder=`${each.year}-${each.month+1}-${each.day}`;

        form_week.appendChild(input1);

        div_each.appendChild(form_week);
        
        const ol_each=document.createElement("ul");
        ol_each.classList.add("daily_todo");
        ol_each.id=`${id}`;
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
    const newID=todos_each[id].todoList.length+1;
    const todo_obj={
        text:text,
        id:newID,
        parent:id
    };
    btn.innerText="❌";
    btn.addEventListener("click",deleteToDos);

    span.innerText=text;
    li.appendChild(btn);
    li.appendChild(span);
    li.id=newID;

    ols[id].appendChild(li);
    todos_each[id].todoList.push(todo_obj);
    saveToDos();
}

function deleteToDos(event){
    const btn=event.target;
    const li=btn.parentNode;
    const P=li.parentNode;
    P.removeChild(li);
    const event_num=parseInt(P.id);
    const cleantodos=todos_each[event_num].todoList.filter(function(each){
        return each.id!==parseInt(li.id);
    })

    todos_each[event_num].todoList=cleantodos;

    saveToDos();
}

function saveToDos(){
    localStorage.setItem(w_ToDos_LS,JSON.stringify(todos_each));
}

function main(){
    let sd=new Date(localStorage.getItem(start_));
    let ed=new Date(localStorage.getItem(end_));
    
    const gap=sd.getTime()-ed.getTime();
    const days=Math.floor(gap/(1000*60*60*24))*-1+1;
    let i=0;
    let tmp_date=new Date(localStorage.getItem(start_));
    tmp_date.setDate(tmp_date.getDate()-1);

    const todos_str=localStorage.getItem(w_ToDos_LS);

    for(i=0;i<days;i++){
        tmp_date.setDate(tmp_date.getDate()+1);
        make_days(tmp_date);
        const w_todo_obj={
            id:i,
            todoList:[]
        }
        todos_each.push(w_todo_obj);
    }    
    make_submit_each();

    if(todos_str!==null){
        const parseOne=JSON.parse(todos_str);
        parseOne.forEach(function(each){
            const each_id=each.id;
            
            each.todoList.forEach(function(eac){
                printToDos(eac.text,each_id);
            })
        })
    }

    week_form.addEventListener("submit",handleSumbit);
}

main();