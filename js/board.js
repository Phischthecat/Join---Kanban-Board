let currentDraggedElement;
let idForClosing = [];



async function initTodos() {
    await init();
    setDragAndDropId();
    updateHTML();
}


function updateHTML() {
    updateContainer('toDo');
    updateContainer('inProgress');
    updateContainer('awaitingFeedback');
    updateContainer('done');
}


function startDragging(id) {     // Weist die jeweilige Id, dem zu verschiebenen Element zu.
    currentDraggedElement = id;
}


function allowDrop(ev) {     // Verändert das Standarverhalten des Elements. Es wird z.B. Draggable. 
    ev.preventDefault();
}


async function moveTo(status) {   // Sorgt dafür, dass das Element Draggable wird, indem die entsprechende category zugewiesen wird.
    allTasks[currentDraggedElement]['status'] = status;
    backend.setItem('tasks', allTasks);
    updateHTML();
}


function highlight(category) {
    document.getElementById(category).classList.add('highlight');
}


function removeHighlight(category) {
    document.getElementById(category).classList.remove('highlight');
}


function setDragAndDropId() {
    for (let i = 0; i < allTasks.length; i++) {
        allTasks[i]['dragAndDropId'] = i;
    }
}


function updateContainer(container) {
    let filteredTask = allTasks.filter(t => t['status'] == container);
    document.getElementById(container).innerHTML = '';
    for (let i = 0; i < filteredTask.length; i++) {
        let task = filteredTask[i];
        idForClosing.push(task.specificId);
        document.getElementById(container).innerHTML += createTaskCard(task);
    }
}


function createTaskCard(task) {
    return /*html*/ `
    <div class="taskCard" onclick="check(${task.specificId})" draggable="true" ondragstart="startDragging(${task.dragAndDropId})">
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
        
        <div id="${task.specificId}"></div>
    </div>
`
}


function check(externalId) {
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (externalId === task.specificId) {
            showFullView(task);
        }
    }
}


function showFullView(task) {
    let card = document.getElementById(task.specificId);
    card.innerHTML = '';
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    } else {
        card.innerHTML += createFullView(task);
        showUrgency(task);
        styleUrgency(task);
    }
}


function createFullView(task) {
    return /*html*/ `
        <div class="background">
            <div class="fullCard">
                <div class="headerFullCard">
                    <div class="categoryText">
                        <span>${task.category}</span>
                    </div>

                    <div class="plus">
                        <img onclick="closeFullFiew()" src="img/secondary-plus.svg">
                    </div>
                </div>

                <div class="headline">
                    <h2>${task.title}</h2>
                </div>
                
                <div class="descriptionFullCard"> 
                    <span>${task.description}</span>
                </div>

                <div>
                    <div class="date">
                        <span><b>Due date:</b></span>
                        <span>${task.dueDate}</span>
                    </div>

                    <div class="prio">
                        <span><b>Priority</b></span>
                        <div id="showUrgency"></div>
                    </div>
                    
                </div>

                <div class="assignedContainer">
                    <span><b>Assigned To:</b></span>
                        <div class="scrollUsers">
                            <div id="asignedUSer"></div>
                        </div>
                </div>
            </div>
        </div>
    `
}


function showUrgency(task) {
    let actualPrio = document.getElementById('showUrgency');
    actualPrio.innerHTML = '';
    actualPrio.innerHTML += /*html*/`
        <span>${task.priority}</span>
        <img src="/img/${task.priority}.addTask.svg">
    `
}


function styleUrgency(task) {
    let urgent = '#ff3b00';
    let medium = '#ffb32a';
    let low = '#7be129';

    if (task.priority == 'urgent') {
        document.getElementById('showUrgency').style = `background-color: ${urgent}`;
    } else if (task.priority == 'medium') {
        document.getElementById('showUrgency').style = `background-color: ${medium}`;
    } else if (task.priority == 'low') {
        document.getElementById('showUrgency').style = `background-color: ${low}`;
    }
}


function closeFullFiew() {
    for (let y = 0; y < allTasks.length; y++) {
        const element = allTasks[y];
        if (element.specificId === idForClosing[y]) {
            document.getElementById(`${element.specificId}`).classList.add('d-none');
        }
    }
}


async function openTaskBox() {
    await w3IncludeHTML();
    let box = document.getElementById('taskBox');
    box.innerHTML = '';
    box.innerHTML += /*html*/`
        <div class="background slide-in-right">
            <div class="boxContent">
                <div w3-include-html="task-snippet.html"></div>
            </div>
        </div>
        `
}


