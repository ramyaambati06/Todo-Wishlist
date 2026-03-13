
let todoInput = document.querySelector("input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");

let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];

function uuid(){
return "xxxx-xxxx".replace(/[x]/g,function(){
return (Math.random()*16|0).toString(16);
});
}

addTodoButton.addEventListener("click",(e)=>{
e.preventDefault();

let todo = todoInput.value;

if(todo.length > 0){

todoList.push({
id: uuid(),
todo,
isCompleted:false
});
console.log(todoList)

renderTodoList(todoList);

localStorage.setItem("todo",JSON.stringify(todoList));

todoInput.value="";
}

});

showTodos.addEventListener("click",(e)=>{

let key = e.target.dataset.key;
let delKey = e.target.dataset.todokey;

todoList = todoList.map(todo =>
todo.id === key ? {...todo,isCompleted:!todo.isCompleted} : todo
);

todoList = todoList.filter(todo => todo.id !== delKey);

localStorage.setItem("todo",JSON.stringify(todoList));

renderTodoList(todoList);

});

function renderTodoList(todoList){

showTodos.innerHTML = todoList.map(({id,todo,isCompleted})=>`

<div class="todo">
<input type="checkbox" data-key=${id} ${isCompleted ? "checked":""}>
<label class="${isCompleted ? "checked-todo":""}" data-key=${id}>${todo}</label>
<button data-todokey=${id} class="del-btn">Delete</button>
</div>

`).join("");

}

renderTodoList(todoList);