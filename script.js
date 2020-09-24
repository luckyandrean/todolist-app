// element selector
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


//VARIABLES
let LIST , id;


//get item from local storage
let data = localStorage.getItem("TODO");

//check data not empty
if(data) {
    LIST = JSON.parse(data);
    id= LIST.length;  //SET THE ID TO THE LAST ON THE LIST
    loadList(LIST); //LOAD THE LIST TO THE UI
    
}else {
    LIST=[];  // IF LIST NOT EMPTY
    id=0;
}


//load item
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
        
    });
}

//clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//get current date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash){

    if(trash){ return; }


    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${id+1}. ${toDo}</P>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}
// add an item to the list user the enter key
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash: false

            });

            //store data to local storage
                localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }

});



//completed list
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do list
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//targeet the item created dinamically

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));

});