const Name=document.querySelector(".input_name"),
input=Name.querySelector("input"),
show_name=document.querySelector(".who_is_user");

const user_name_in_storage="user";
const showing="showing";

function askName(){
    Name.classList.add(showing);
    Name.addEventListener("submit",handleName);
}

function showName(name){
    Name.classList.remove(showing);
    show_name.classList.add(showing);
    show_name.innerText=`Hi ${name}`;
}

function handleName(event){
    event.preventDefault();
    const name=input.value;

    //save name
    localStorage.setItem(user_name_in_storage, name);

    //show name
    showName(name);
}

function main(){
    const user=localStorage.getItem(user_name_in_storage);
    if(user===null) {
        askName();
    }
    else {
        showName(user);
    }
}

main();