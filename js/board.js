let currentDraggedElement;




function startDragging(id) {     // Weist die jeweilige Id, dem zu verschiebenen Element zu.
    currentDraggedElement = id;
}


function allowDrop(ev) {     // Verändert das Standarverhalten des Elements. Es wird z.B. Draggable. 
    ev.preventDefault();
}


function moveTo(status) {   // Sorgt dafür, dass das Element Draggable wird, indem die entsprechende category zugewiesen wird.
    allTasks[currentDraggedElement]['status'] = status
    backend.setItem('tasks', allTasks);
    updateHTML();
}


function highlight(category) {
    document.getElementById(category).classList.add('highlight');
}


function removeHighlight(category) {
    document.getElementById(category).classList.remove('highlight');
}


async function showInTodo() {
    await init();
    // allTasks.forEach((task) => {
    //     document.getElementById('toDo').innerHTML = '';
    //     // document.getElementById('toDo').innerHTML += createTaskCard(task);
    //     document.getElementById('toDo').innerHTML = `<span>${task.title}</span>`
    //     debugger
    // })

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        document.getElementById('toDo').innerHTML += createTaskCard(task);
    }
}


function createTaskCard(task) {
    return /*html*/ `
    <div class="taskCard" onclick="fullView()">
        <div class="category"></div>

        <div>
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