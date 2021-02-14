const reset_form=document.querySelector(".reset"),
    reset_click=reset_form.querySelector("input");

function clickHandler(){
    localStorage.removeItem("user");
    localStorage.removeItem("start_date");
    localStorage.removeItem("end_date");
    localStorage.removeItem("daily_todo");
    localStorage.removeItem("todos");
    location.reload();
}

function main(){
    reset_click.addEventListener("click", clickHandler)
}

main();