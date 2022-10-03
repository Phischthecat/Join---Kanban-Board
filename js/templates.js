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
`;
}


function createFullView(task) {
    return /*html*/ `
        <div class="modalContainer">
            <div class="fullCard">
                <div class="headerFullCard">
                    <div class="categoryText">
                        <span>${task.category}</span>
                    </div>

                    <div class="plus">
                        <img onclick="closeFullView(${task.specificId})" src="img/secondary-plus.svg">
                    </div>
                </div>

                <div>
                    <h2 class="taskHeader">${task.title}</h2>
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
    `;
}


function createTaskBox() {
    return /*html*/ `
    <div class="modalContainer slide-in-right" id="animation">
        <div class="boxContent">
            <div w3-include-html="task-snippet.html"></div>
        </div>
    </div>
    `;
}


function createBoxBtns(pickedContainer) {
    return /*html*/ `
      <button type="button" class="btn-white clearBtn" onclick="closeTaskBox()" id="clear">Cancel <img src="/img/secondary-plus.svg"></button>
      <button type="submit" class="btn-blue addTaskBtn" onclick="addTask('${pickedContainer}')" id="create">Create Task <img src="/img/ticked-off.svg"></button>
  `;
}


function createNewContact() {
    return /*html*/ `
    <div class="modalContainer slide-in-right" id="animation">
    <div class="boxContainer">
            <div class="overlayContainer">
                <div class="overlayHeader">
                    <img src="img/joinlogo.svg">    
                    <h1>Add contact</h1>
                    <span>Tasks are better with a team!</span>
                    <hr>
                </div>
                <div class="addContactSection">
                        <div>
                            <img class="userIcon" src="./img/user.svg" alt="user">
                        </div>
                        <div class="contactInputSection">
                            <img class="close cursor-pointer" src="/img/secondary-plus.svg" onclick="closeContactBox()">
                            <form id="newContactForm" onsubmit="addContact(); return false;">
                            <input class="nameModal" id="newContactName" type="text" placeholder="Name">
                            <input class="emailModal" id="newContactEmail" type="email" placeholder="Email">
                            <input class="phoneModal" id="newContactPhone" type="tel" placeholder="Phone">
                            <div class="contactBtnContainer">
                                <button type="button" class="btn-white" onclick="closeContactBox()">Cancel <img src="/img/secondary-plus.svg"></button>
                                <button type="submit" class="btn-blue" >Create Contact <img src="/img/ticked-off.svg"></button>
                            </div>
                            </form>
                </div>
            </div>
        </div>
    </div>
    `;
}


function editContact(initial, name, email, phone) {
    return /*html*/ `
    <div class="modalContainer slide-in-right" id="animation">
    <div class="boxContainer">
            <div class="overlayContainer">
                <div class="overlayHeader">
                    <img src="img/joinlogo.svg">    
                    <h1>Edit contact</h1>
                    <hr>
                </div>
                <div class="addContactSection">
                    <div>
                        <div class="initialsFullContact initialCircle">
                            ${contact.initial}
                        </div>
                    </div>
                        <div class="contactInputSection">
                            <img class="close cursor-pointer" src="/img/secondary-plus.svg" onclick="closeContactBox()">
                            <form id="editContactForm" onsubmit="saveContact(); return false;">
                            <input class="nameModal" id="editContactName" type="text" value="${contact.name}">
                            <input class="emailModal" id="editContactEmail" type="email" value="${contact.email}">
                            <input class="phoneModal" id="editContactPhone" type="tel" value="${contact.phone}">
                            <div class="editBtnContainer">
                                <button type="submit" class="btn-blue" >Save</button>
                            </div>
                            </form>                            
                </div>
            </div>
        </div>
    </div>
    `;
}


/**
 * This function returns a span which is used for an error message
 * @returns html part
 */
function createErrorBoxLogin() {
    return /*html*/ `
      <div class = "errorBox"><span><b>Invalid User or Password</b></span></div>
      `;
}


/**
 * This function returns a span which is used for an error message
 * @returns html part
 */
function createErrorName() {
    return /*html*/ `
      <div class = "errorBox"><span><b>This Username already exists</b></span></div>
  `;
}


/**
 * This function returns a span which is used for an error message
 * @returns html part
 */
function createErrorEmail() {
    return /*html*/ `
    <div class = "errorBox"><span><b>This Email already exists</b></span></div>
  `;
}

{/* <h1>I forgot My Password</h1> */ }

function createForgetPart() {
    return /*html*/ `
    <div class="passwordMainContainer">

        <div class="passwordContainer">

            <div class="arrowPassword">
                <img src="img/left-arrow.png" class="cursor-pointer" onclick="backToLogin()" />
            </div>

            <div class="flex headBox flexColumn">
                <h1>I forgot my Password</h1>

                <hr>

                <div class="instructions">
                    <span> Don't worry! We will send you an email with the instructions to reset your password.</span>
                </div>

                <div class="flex centerBox">
                    <input required class="inputFieldsMain" type="email" id="emailbox" minlength="3" placeholder="Email" name="email" />
                </div>

                <div class="sendBtnBox flex">
                    <button class="btn-blue mailBtn">Send me the Mail </button>
                </div>
            </div>

        </div>
    </div>    
    `;
}