let allTasks = [];



/**
 * This Function is a simplified spelling for document.getElementById
 * @param {string} theId is used for the actual Id
 * @returns document.getElementById();
 */
function getId(theId) {
    return document.getElementById(theId);
}


/**
 * This function is used to return the ids and/or values of the input fields for the current task
 */
function getValuesForTasks() {
    let title = getId('taskTitle');
    let description = getId('taskDescription');
    let category = getId('taskCategory');
    let dueDate = getId('taskDueDate');
    let createdDate = new Date().getTime(); //only text-format could be safed in storage --> change object to getTime (UnixTimestamp since 01.01.1970)
    let id = new Date().getTime();
    let assignedTo = getId('assignedToPeople');
    // let urgency = getId('taskUrgency');
    return [title, category, description, dueDate, createdDate, assignedTo, id]
}


/**
 * This function is used to create the Task and add it to the storage
 *  * @param {string} taskStatus -- after creating a task the user is asked to push the task into backlog or toDo
 */
function addTask() {
    [title, category, description, dueDate,
        createdDate, assignedTo, id] = getValuesForTasks();
    let task = {
        'id': id,
        'dragAndDropId': '',
        'title': title.value,
        'category': category.value,
        // 'status': taskStatus,
        'description': description.value,
        'dueDate': dueDate.value,
        'createdDate': createdDate,
        'assignedTo': assignedTo,
        // 'urgency': urgency.value,
    };
    allTasks.push(task);
    backend.setItem('tasks', allTasks);
    console.log(allTasks);
    animateToBoard();
}


function clearFields() {
    getId('taskTitle').value = '';
    getId('taskDescription').value = '';
    getId('taskCategory').value = 'New Category';
    getId('taskDueDate').value = '';
    getId('assignedToPeople').value = 'You';
}


function animateToBoard() {
    getId('messageToBoard').classList.remove('d-none');
    setTimeout(() => {
        document.body.classList.add('slide-in-left');
        window.location.href = 'board.html'
    }, 1000)
}