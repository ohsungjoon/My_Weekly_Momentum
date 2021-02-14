const body=document.querySelector("body");

function main(){
    const num=Math.floor(Math.random()*5);
    const img=new Image();
    img.src=`${num+1}.jpg`;
    img.classList.add("bgImage");
    body.prepend(img);
}

main();