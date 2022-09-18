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


function createTaskBox() {
    return /*html*/`
    <div class="background slide-in-right" id="animation">
        <div class="boxContent">
            <div w3-include-html="task-snippet.html"></div>
        </div>
    </div>
    `
}


async function showBtn(box) {
    if (box.classList.contains('d-none')) {
        box.classList.remove('d-none');
    }
    document.getElementById('buttonContainer').innerHTML = '';
    document.getElementById('buttonContainer').innerHTML += createBoxBtns();
}


function createBoxBtns() {
    return /*html*/`
    <button class="btn" onclick="closeTaskBox()" id="clear">Cancel <img src="/img/secondary-plus.svg"></button>
    <button class="btn" onclick="addTask('toDo')" id="create">Create Task <img src="/img/ticked-off.svg"></button>
`;
}

