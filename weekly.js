const form=document.querySelector(".input_Weekly_to_do"),
    weekly_input=form.querySelector("input");
const weekly_todo=document.querySelector(".weekly_todo");

const ToDos_LS="todos";
let todos=[];

const showing__="showing";

function deleteTodos(event){
    const btn=event.target;
    const li=btn.parentNode;
    weekly_todo.removeChild(li);

    const cleantodos=todos.filter(function(each){
        return each.id!==parseInt(li.id);
    })

    todos=cleantodos;

    saveTodos();
}

function printTodos(text){
    const li=document.createElement("li");
    const btn=document.createElement("button");
    const span=document.createElement("span");
    const newID=todos.length+1;
    const todo_obj={
        text:text,
        id:newID
    };
    btn.innerText="❌";
    btn.addEventListener("click",deleteTodos);
    span.innerText=text;
    li.appendChild(btn);
    li.appendChild(span);
    li.id=newID;
    weekly_todo.appendChild(li);
    todos.push(todo_obj);
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(ToDos_LS,JSON.stringify(todos));
}

function handleSumbit(event){
    event.preventDefault();
    const newOne=weekly_input.value;
    printTodos(newOne);
    weekly_input.value="";
}

function main(){
    form.classList.add(showing__);

    const todos_str=localStorage.getItem(ToDos_LS);
    if(todos_str!==null){
        const parseOne=JSON.parse(todos_str);
        parseOne.forEach(function(each){
            printTodos(each.text);
        })
    }

    form.addEventListener("submit",handleSumbit);
}

main();
