async function initTasks() {
    await init();
    // console.log(allTasks);
    quantityTasks();
}


function quantityTasks() {
    let tasksInBoard = document.getElementById('tasksInBoard')
    let todoBox = document.getElementById('toDo');
    let progressBox = document.getElementById('tasksInProgress');
    let feedbackBox = document.getElementById('feedBack');
    let doneBox = document.getElementById('done');

    let todo = allTasks.filter(a => a['status'] == 'toDo');
    let inProgress = allTasks.filter(a => a['status'] == 'inProgress');
    let awaitingFeedback = allTasks.filter(a => a['status'] == 'awaitingFeedback');
    let done = allTasks.filter(a => a['status'] == 'done');

    setQuantity(tasksInBoard, todoBox, progressBox, feedbackBox, doneBox, todo, inProgress, awaitingFeedback, done);

}


function setQuantity(tasksInBoard, todoBox, progressBox, feedbackBox, doneBox, todo, inProgress, awaitingFeedback, done) {
    tasksInBoard.innerHTML += allTasks.length;

    todoBox.innerHTML += todo.length;

    progressBox.innerHTML += inProgress.length;

    feedbackBox.innerHTML += awaitingFeedback.length;

    doneBox.innerHTML += done.length;
}


function gotToBoard() {
    window.location.href = 'board.html';
}