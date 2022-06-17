const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = newTodo.id;
    const label = document.createElement("label");
    label.innerText = newTodo.text;
    // 버튼박스
    const actions = document.createElement("div");
    actions.className = "acticons"
    // 삭제버튼
    const trash = document.createElement("button");
    trash.innerText = "❌"
    trash.addEventListener("click", deleteToDo);
    // 수정버튼
    // const pencil = document.createElement("button");
    // pencil.innerText = "🖋"
    // pencil.addEventListener("click", );

    li.appendChild(check);
    li.appendChild(label);
    // li.appendChild(pencil);
    li.appendChild(trash);
    li.appendChild(actions);

    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
  
const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}