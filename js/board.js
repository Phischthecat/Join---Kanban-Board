let currentDraggedElement;




function startDragging() {     // Weist die jeweilige Id, dem zu verschiebenen Element zu.
    currentDraggedElement = allTasks.dragAndDropId;
}


function allowDrop(ev) {     // Verändert das Standarverhalten des Elements. Es wird z.B. Draggable. 
    ev.preventDefault();
}


function moveTo(status) {   // Sorgt dafür, dass das Element Draggable wird, indem die entsprechende category zugewiesen wird.
    allTasks[currentDraggedElement]['status'] = status;
    console.log(status);
    backend.setItem('tasks', allTasks);
    // showInTodo(status);
}


function highlight(category) {
    document.getElementById(category).classList.add('highlight');
}


function removeHighlight(category) {
    document.getElementById(category).classList.remove('highlight');
}


async function showInTodo(status) {
    // await init();
    // allTasks.forEach((task) => {
    //     document.getElementById('toDo').innerHTML = '';
    //     // document.getElementById('toDo').innerHTML += createTaskCard(task);
    //     document.getElementById('toDo').innerHTML = `<span>${task.title}</span>`
    //     debugger
    // })
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        allTasks.dragAndDropId = i;
        document.getElementById(status).innerHTML = '';
        document.getElementById(status).innerHTML += createTaskCard(task);
    }
}


function createTaskCard(task) {
    return /*html*/ `
    <div class="taskCard" onclick="fullView()" draggable="true" ondragstart="startDragging(${task.dragAndDropId})">
        <div class="category">
            <span>${task.category}</span>
        </div>

        <div class="descriptionBoard">
            <span>${task.title}</span>
            <span>${task.description}</span>
        </div>

        <div class="assignedUsers">
            <div id="assignedUsers"></div>
            <div id="urgencyTask"></div>
        </div>
    </div>
`
}


function updateHTML() {
    updateContainer('toDo');
    updateContainer('inProgress');
    updateContainer('testing');
    updateContainer('done');
}


async function show() {
    await init();

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        allTasks.dragAndDropId = i;
        document.getElementById('toDo').innerHTML += createTaskCard(task);
    }
}