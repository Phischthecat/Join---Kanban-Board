/**
 *
 * @param {number} index of Task
 * @returns {any} returns html part of a task card
 */
function createTaskCard(index) {
  let task = allTasks[index];
  return /*html*/ `
  <div class="taskCard" onclick="showFullView(${task.specificId})" draggable="true" ondragstart="startDragging(${task.dragAndDropId})" id="${task.specificId}">
    <div>   
      <div class="category" style="background-color:${task.category.color}">
          <span>${task.category.name}</span>
      </div>
      <div class="descriptionBoard">
        <span>${task.title}</span>
        <span>${task.description}</span>
      </div>
      <div class="progressbarContainer" id="proContainer${index}">
        <progress id="progresslabel${index}" max="100" value="0"></progress>
        <label for="progresslabel${index}"><span id="barText${index}"></span> Done</label>
      </div> 
    </div> 
    <div class="taskFooter">
      <div class="flex" id="assignedUsers${index}"></div>
      <div id="urgencyTask${index}">
      <img src="./img/${task.urgency}.addTask.svg">
      </div>
  </div>
  `;
}

/**
 *
 * @param {object} actual Task
 * @param {number} index of task
 * @returns {any} html part for fullview of taskcard
 */
function createFullView(task, index) {
  return /*html*/ `
  <div class="modalContainer fade-in startTop" onclick="closeFullView()">
      <div class="fullCard hide-scrollbar" id="fullCard" onclick="dontClose(event)">
        <div class="headerFullCard">
          <div
            class="categoryText"
            style="background-color:${task.category.color}"
          >
            <span>${task.category.name}</span>
          </div>
          <div class="plus">
            <img onclick="checkIfSubtasksDone(${index}); closeFullView()" src="./img/secondary-plus.svg" />
          </div>
        </div>
        <div>
          <h2 class="taskHeader">${task.title}</h2>
        </div>
        <div class="bodyFullCard hide-scrollbar">
          <div class="descriptionFullCard">
            <span>${task.description}</span>
          </div>          
            <div class="subtasksFullCard" id="subtasksFullCard${index}"></div>
            <div class="date">
              <span><b>Due date:</b></span>
              <span>${task.dueDate}</span>
            </div>
            <div class="prio">
              <span><b>Priority:</b></span>
              <div id="showUrgency" ></div>
            </div>
          
          <div class="assignedContainer">
            <span><b>Assigned To:</b></span>
            <div id="assignedUser" class="assignedUser hide-scrollbar"></div>
          </div>
        </div>
        <div class="footerFullCard">
        <button type="button" class="btn-white deleteBtn" onclick="deleteTask(${index})" id="clear">
                  <span class="cancel-btn">
                  <i class="fa-sharp fa-solid fa-trash"></i>
                  </span>
                </button>
          <button
            class="editBtn btn-blue"
            onclick="renderEditTask(${task.specificId})"
          >
            <img src="./img/pencil.svg" />
          </button>

        </div>
      </div>
    </div>
    `;
}

/**
 * 
 * @returns {any} html paart for greeting section
 */
function createGreeting() {
  return /*html*/ `
  <span>Good to see you</span>
  <span id="loggedInUser" class="nameOfUser"></span>
  `;
}

/**
 * 
 * @param {object} taskContact 
 * @returns {any} html part for assigned contacts in fullview
 */
function createAssignedToFullCard(taskContact) {
  return /*html*/ `
    <div class="fullCardAssignedTo">
      <div class="initials initialCircle" style="background-color:#${taskContact.color}">
        ${taskContact.initial}
      </div>
      <span>
        ${taskContact.name}
      </span>
    </div>
    `;
}

/**
 *
 * @param {string} overflow
 * @returns {any} html part for div container
 */
function createAssignedContactInitialsOverflow(overflow) {
  return /*html*/ `
  <div class="initials initialCircle" style="background-color:#2a3647">+${overflow}</div>
  `;
}

/**
 *
 * @param {object} actual Task that should be edited
 * @returns {any} html part for edit task section
 */
function createEditTask(task) {
  return /*html*/ `
    <div class="flex changedCard"> 
      <div class="headerFullCard plus-end">
        <div class="plus ">
          <img onclick="closeFullView()" src="./img/secondary-plus.svg">
        </div>
      </div>     
      <form class="flexColumn formStyle" onsubmit="changeTask(${task.specificId}); return false;">
      <div>                
        <div class="title flexColumn">
          <span class="text">Title</span>
          <input 
            id="editTitle"
            type="text"
            placeholder="Enter a Title"
            value="${task.title}"
            required />
        </div>
        <div class="flexColumn">
          <span class="text">Description</span>
          <textarea class="changedTextarea"
            id="editDescription"
            type="text"
             placeholder="Enter a Description" required>${task.description}
          </textarea>
        </div>
          <div class="dueDate flexColumn">
            <span class="text">Due date</span>
            <input id="changedDate" type="date" value="${task.dueDate}" required/>
          </div>

          <div class="priority flexColumn" id="priority">
            <span class="text">Prio</span>
            <div class="priorityBox">
              <button type="button" class="statusButton" onclick="getPriority('urgent')" id="urgent">
                <p>Urgent</p>
                <img src="./img/urgent.addTask.svg" />
              </button>
              <button type="button" class="statusButton" onclick="getPriority('medium')" id="medium">
                <p>Medium</p>
                <img src="./img/medium.addTask.svg" />
                <div>
                  <input
                    type="text"
                    class="hiddenInput"
                    id="hiddenUrgentInput"
                    required
                  />
                </div>
              </button>
              <button type="button" class="statusButton" onclick="getPriority('low')" id="low">
                <p>Low</p>
                <img src="./img/low.addTask.svg" />
              </button>
            </div>
          
                
          <div class="container">
            <span class="text">Assigned to</span>
            <div
              id="selectBtn1"
              class="select-btn"
              onclick="openDropdownMenu(1)"
            >
            <div>
              <span id="assignedToBtnText" class="btn-text">Select contacts to assign</span>
              <input type="text" class="hiddenInput" id="hiddenAssignedToInput" required />
            </div>
              <span class="arrow-down">
                <i class="fa-solid fa-caret-down"></i>
              </span>
            </div>
            <ul class="list-items" id="assignedToList">
              <li class="item">
                <span class="item-text">You</span>
                <span class="checkbox">
                  <i class="fa-solid fa-square check-icon"></i>
                </span>
              </li>
            </ul>
            <div id="assignedToContacts" class="assignedToContacts"></div>          
          </div> 
        </div>       
        <div class="footerFullCard">
          <button
            type="submit"
            class="btn-blue editBtn"
            id="create"
            >
            Ok
            <span class="check-btn">
              <i class="fa-solid fa-check"></i>
            </span>
          </button>
        </div>
      </form> 
</div>
  `;
}

/**
 *
 * @returns {any} html part for new Contact section
 */
function createNewContact() {
  return /*html*/ `
    <div class="modalContainer modalContainerContacts slide-in-right" id="animation">
      <div class="boxContainer">
        <div class="overlayContainer">
            <div class="overlayHeader">
                <img src="./img/joinlogo.svg">    
                <h1>Add contact</h1>
                <span>Tasks are better with a team!</span>
                <div class="verticalLine">
              <hr />
            </div>
        </div>
        <div class="addContactSection">
          <div>
              <img class="userIcon" src="./img/user.svg" alt="user">
          </div>
          <div class="contactInputSection">
            <img class="close cursor-pointer" src="./img/secondary-plus.svg" onclick="closeContactBox()">
            <form id="newContactForm" onsubmit="addContact(); return false;">
              <input class="nameModal" id="newContactName" type="text" placeholder="Name" required>
              <input class="emailModal" id="newContactEmail" type="email" placeholder="Email" required>
              <input class="phoneModal" id="newContactPhone" type="tel" placeholder="Phone" required>
              <div class="contactBtnContainer">
                  <button type="button" class="btn-white btn-white-mobile" onclick="closeContactBox()">Cancel <img src="./img/secondary-plus.svg"></button>
                  <button type="submit" class="btn-blue btn-blue-mobile" >Create Contact <img src="./img/ticked-off.svg"></button>
              </div>
            </form>
          </div>                  
      </div>
    </div>
    `;
}

/**
 *
 * @param {number} index
 * @returns {any} html part for edit contact section
 */
function editContact(i) {
  const contact = contacts[i];
  return /*html*/ `
    <div class="modalContainer modalContainerContacts slide-in-right" id="animation">
      <div class="boxContainer">
        <div class="overlayContainer">
          <div class="overlayHeader">
            <img src="./img/joinlogo.svg">    
            <h1>Edit contact</h1>
            <div class="verticalLine">
                  <hr />
                </div>
          </div>
          <div class="addContactSection">
            <div>
              <div id="editContactInitial" class="initialsFullContact initialCircle userIcon" style="background-color:#${contact.color}">
                  ${contact.initial}
              </div>
            </div>
            <div class="contactInputSection">
              <img class="close cursor-pointer" src="./img/secondary-plus.svg" onclick="closeContactBox()">
              <form id="editContactForm" onsubmit="saveContact(${i}); return false;">
                <input class="nameModal" id="editContactName" type="text" value="${contact.name}" required>
                <input class="emailModal" id="editContactEmail" type="email" value="${contact.email}" required>
                <input class="phoneModal" id="editContactPhone" type="tel" value="${contact.phone}" required>
                <div class="editBtnContainer">
                  <button type="submit" class="btn-blue" >Save</button>
                </div>
              </form>                            
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
}

/**
 * @param {object} subtask
 * @param {number} index
 * @returns {any} html part for all subtasks that are checked
 */
function createSubtasksChecked(subtask, i) {
  return /*html*/ `
  <div class="subtask">
    <input type="checkbox" id="sub${i}" checked>${subtask.description}
  </div>
  `;
}

/**
 * @param {object} subtask
 * @param {number} index
 * @returns {any} html part for all subtasks that are not checked
 */
function createSubtasksUnchecked(subtask, i) {
  return /*html*/ `
  <div class="subtask">
    <input type="checkbox" id="sub${i}">${subtask.description}
  </div>
  `;
}

/**
 * This function returns a span which is used for an error message
 * @returns {any} html part
 */
function createErrorName() {
  return /*html*/ `
      <div class="errorBox"><span><b>Username already exists</b></span></div>
  `;
}

/**
 * This function returns a span which is used for an error message
 * @returns {any} html part
 */
function createErrorEmail() {
  return /*html*/ `
    <div class="errorBox"><span><b>Email already exists</b></span></div>
  `;
}

/**
 * 
 * @returns {any} html part for the forgot password section
 */
function createForgetPart() {
  return /*html*/ `
    <div class="passwordMainContainer">

        <div class="passwordContainer">

            <div class="arrowPassword">
                <img src="./img/left-arrow.png" class="cursor-pointer" onclick="backToLogin()" />
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

/**
 * @param {string} column
 * @param {any} instance
 * @returns {any} html part of addtask section
 */
function addTaskContainerHMTL(column, instance) {
  return /*html*/ `
    <div class="modalContainer modalContainerAddTask slide-in-right hide-scrollbar" id="animation" onclick="closeTaskBox()">
      <div class="modalKanbanBar">
        <img id="imgResponsive" class="respoImg" src="./img/joinlogo-black.svg">
      </div>
        <div class="boxContent" onclick="dontClose(event); closeDropdowns()">
        <div class="headline">
            <span  id="kanbanTextBoard" class="kanbanTextAddTask d-none"
              >Kanban Project Management Tool</span
            >
            <h1>Add Task</h1>
            <span class="cancelBtnMobile" onclick="closeTaskBox()">
                    <i class="fa-solid fa-xmark"></i>
            </span>
          </div>

          <form id="formAddTask" class="flex flexAddTaskMobile" onsubmit="addTaskBoard('${column}', '${instance}'); return false;">
                        <!--Header only for Mobile Add Task-->
                        <button type="submit" class="btn-blue btnCreate">
                  Create
                  <img src="./img/ticked-off.svg" />
                </button>
            <!--Header only for Mobile Add Task-->
          <div class="leftSplit">
              <div class="title flexColumn">
                <span class="text textAddTaskMobile">Title</span>
                <input id="taskTitle" required type="text" placeholder="Enter a title" />
              </div>

              <div class="flexColumn">
                <span class="text textAddTaskMobile">Description</span>
                <textarea id="taskDescription" cols="30" rows="5" placeholder="Enter a description" required></textarea>
              </div>

              <div class="container">
                <span class="text textAddTaskMobile">Category</span>
                <div id="categorySelect">
                  <div id="selectBtn0" class="select-btn" onclick="openDropdownMenu(0); dontClose(event)">
                    <div>
                      <span class="btn-text">Choose category</span>
                      <input type="text" class="hiddenInput" id="hiddenCategoryInput" required />
                    </div>
                    <span class="arrow-down">
                      <i class="fa-solid fa-caret-down"></i>
                    </span>
                  </div>
                  <ul class="list-items" id="categoryList">
                    <li class="categoryItem" onclick="addNewCategory()">
                      <span class="item-text"> New category</span>
                    </li>
                    <li class="categoryItem">
                      <span class="item-text">Sales</span>
                      <span class="categoryCheckbox">
                        <i class="fa-solid fa-circle"></i>
                      </span>
                    </li>
                    <li class="categoryItem">
                      <span class="item-text">Backoffice</span>
                      <span class="categoryCheckbox">
                        <i class="fa-solid fa-circle"></i>
                      </span>
                    </li>
                  </ul>                  
                </div>
              </div>

              <div class="container">
                <span class="text textAddTaskMobile">Assigned to</span>
                <div id="selectBtn1" class="select-btn" onclick="openDropdownMenu(1); dontClose(event)">
                  <div>
                    <span id="assignedToBtnText" class="btn-text">Select contacts to assign</span>
                    <input type="text" class="hiddenInput" id="hiddenAssignedToInput" required />
                  </div>
                  <span class="arrow-down">
                    <i class="fa-solid fa-caret-down"></i>
                  </span>
                </div>
                <ul class="list-items" id="assignedToList">
                  <li class="item">
                    <span class="item-text">You</span>
                    <span class="checkbox">
                      <i class="fa-solid fa-square check-icon"></i>
                    </span>
                  </li>
                </ul>
                <div id="assignedToContacts" class="assignedToContacts"></div>
              </div>
            </div>

            <div class="rightSplit">
              <div>
                <div class="dueDate flexColumn">
                  <span class="text textAddTaskMobile">Due date</span>
                  <input required id="taskDueDate" type="date" />
                </div>

                <div class="priority flexColumn" id="priority">
                  <span class="text textAddTaskMobile">Prio</span>

                  <div class="priorityBox">
                    <button type="button" class="statusButton" onclick="getPriority('urgent')" id="urgent">
                      <p>Urgent</p>
                      <img src="./img/urgent.addTask.svg" />
                    </button>

                    <button type="button" class="statusButton" onclick="getPriority('medium')" id="medium">
                      <p>Medium</p>
                      <img src="./img/medium.addTask.svg" />
                      <div>
                        <input type="text" class="hiddenInput" id="hiddenUrgentInput" required />
                      </div>
                    </button>

                    <button type="button" class="statusButton" onclick="getPriority('low')" id="low">
                      <p>Low</p>
                      <img src="./img/low.addTask.svg" />
                    </button>
                  </div>

                  <div class="subTasks flexColumn">
                    <span class="text textAddTaskMobile">Subtasks</span>
                    <div id="subtaskInputContainer" class="newSubtasksInputContainer">
                      <input type="text" class="newSubtasksInput" placeholder="Add new subtask"
                        onclick="changeSubTasksIcons()" />
                      <div class="substasksIcons" id="substasksIcons">
                        <div class="subtasksPlus" title="Add new subtasks" onclick="changeSubTasksIcons()">
                          <i class="fa-regular fa-plus"></i>
                        </div>
                      </div>
                    </div>

                    <div id="subtasksContainer" class="subtasksContainer"></div>
                  </div>
                </div>
              </div>
              <div class="buttonContainer" id="buttonContainer">
                <button
                  type="button"
                  class="btn-white clearBtn"
                  onclick="closeTaskBox()"
                  id="clear"
                >
                  Cancel
                  <span class="cancel-btn">
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </button>
                <button
                  type="submit"
                  class="btn-blue createTaskBtn"
                  id="create"
                >
                  Create Task
                  <span class="check-btn">
                    <i class="fa-solid fa-check"></i>
                  </span>
                </button>
              </div>
            </div>
          </form>
          <div id="messageToBoard" class="slide-in-bottom d-none">
            <span> Task added to Board </span>
            <img src="./img/board.navbar.svg" />
          </div>        
  </div>
</div>
    `;
}

/**
 * returns html part for the choosen Category Section
 * @param {number} i
 * @returns {any} html part for category section
 */
function createCategorys(i) {
  const category = categorys[i];
  return /*html*/ `
  <li class="categoryItem item" >
    <div onclick="renderChoosenCategory(${i})">
      <span class="item-text">${category.name}</span>
      <span class="categoryCheckbox" style="color:${category.color}">
       <i class="fa-solid fa-circle"></i>
      </span>
    </div>
    <div onclick="deleteCategory(${i})">
      <i class="fa-sharp fa-solid fa-trash"></i>
    </div>                  
</li>
  `;
}

/**
 *
 * @returns {any} html part
 */
function createCategoryDefault() {
  return /*html*/ `
  <li class="categoryItem item" onclick="addNewCategory()">
    <span class="item-text"> New category</span>
  </li>
  `;
}

/**
 *
 * @returns {any} html part for the input field to create a new Category
 */
function createInputForNewCategory() {
  return /*html*/ `
  <div class="newCategoryContainer">
    <input class="newCategoryInput" type="text" placeholder="New category name">
    <span class="cancel-btn" onclick="cancelNewCategory()" title="Cancel">
    <i class="fa-solid fa-xmark"></i>
    </span>
    <span class="check-btn" onclick="saveNewCategory()" title="Save new category">
    <i class="fa-solid fa-check"></i>
    </span>    
  </div>
  <div id="categoryColorContainer" class="categoryColors"></div>
    `;
}

/**
 *
 * @param {number} index
 * @returns {any} html part for color bubbles with first letters
 */
function createNewCategoryColors(i) {
  const categoryColor = categoryColors[i];
  return /*html*/ `
  <span id="color${i}" class="categoryCheckbox colorBubble" onclick="categoryColorChoose(${i})">
    <i class="fa-solid fa-circle" style="color:${categoryColor}"></i>
  </span>
  `;
}

/**
 *
 * @returns {any} html part for the section where you can decide which category has to be choosed
 */
function createCategorySelection() {
  return /*html*/ `
  <div id="selectBtn0" class="select-btn" onclick="openDropdownMenu(0); dontClose(event)">
    <span class="btn-text">Choose category</span>
    <span class="arrow-down">
      <i class="fa-solid fa-caret-down"></i>
    </span>
  </div>
  <ul class="list-items" id="categoryList"></ul>
  `;
}

/**
 *
 * @param {string} value of the input
 * @returns {any} htmlpart that shows the new created Category
 */
function createSelectedCategory(input) {
  return /*html*/ `
  <div id="selectBtn0" class="select-btn" onclick="openDropdownMenu(0); dontClose(event)">
  <div>
    <span class="item-text">${input}<span class="categoryCheckbox">
      <i class="fa-solid fa-circle" style="color:${choosenColor}"></i>
    </span>
    <input
      type="text"
      class="hiddenInput"
      id="hiddenCategoryInput"
      value="${input}"
      required
    />
  </div>
  </span>
    <span class="arrow-down">
      <i class="fa-solid fa-caret-down"></i>
    </span>
  </div>
  <ul class="list-items" id="categoryList"></ul>
  `;
}

/**
 *
 * @param {number} index
 * @returns {any} html part for a container
 */
function contactsAssignedTo(i) {
  const contact = contacts[i];
  return /*html*/ `
      <li class="item" id="${contact.name}" onclick="checked('${contact.name}')">
        <span class="item-text">${contact.name}</span>
        <span class="checkbox">
          <i class="fa-solid fa-square check-icon"></i>
        </span>
      </li>
      `;
}

/**
 *
 * @param {string} letter of contact
 * @returns {any} html part for alphabet list of contacts
 */
function createContactSectionOfLetter(letter) {
  return /* html*/ `
<div class="contactSection">
  <div class="contactSectionHeader">
    <h2>${letter}</h2>
    <hr />
  </div>
  <div id="contactsOf${letter}" class="contactsOf"></div>
</div>
  `;
}

/**
 *
 * @param {object} actual contact
 * @param {number} index
 * @returns {any} html part for the section where you can create a new contact
 */
function createContact(contact, i) {
  return /* html */ `
  <div id="contactInfo${i}" class="contactInfo cursor-pointer" onclick="showFullContact(${i})">
  <div class="initialContainer">
    <div class="initials initialCircle" style="background-color:#${contact.color
    }">${contact.initial.toUpperCase()}</div>

    </div>
    <div>
      <div class="name">
      <span>${contact.name}</span></div>
      <div class="email"><span>
${contact.email}
      </span>
      </div>
    </div>
  </div>
  `;
}

/**
 *
 * @param {number} index
 * @returns {any} html part for fullview of a contact card
 */
function createFullContact(i) {
  let contact = contacts[i];
  return /*html*/ `
  <div class="headerFullContact">
    <div>
      <div
        id="initialsFullContact"
        class="initialsFullContact initialCircle"
        style="background-color:#${contact.color}"
      >
        ${contact.initial}
      </div>
      </div>
      <div class="nameContainer">
        <div class="nameFullContact">${contact.name}</div>
        <div
          class="addTaskLink cursor-pointer"
          onclick="openTaskBox('toDo', 'contact')"
        >
          <span>+</span> Add Task
        </div>
      </div>
                </div>
                <div class="contactFullInfo">
                  <div class="contactFullInfoHeader">
                    <h2>Contact Information</h2>
                    <div
                      class="editContact cursor-pointer"
                      onclick="openContactBox(editContact, ${i})"
                    >
                      <img src="./img/pencil.svg" alt="pencil" />
                      Edit Contact
                    </div>
                  </div>
                  <div class="emailFullContact">
                    <h3>Email</h3>
                    <a class="email" href="mailto:antom@gmail.com"
                      >${contact.email}</a
                    >
                  </div>
                  <div class="phoneFullContact">
                    <h3>Phone</h3>
                    <a href="tel:+49${contact.phone}">${contact.phone}</a>
                  </div>
                </div>
              </div>
            </div>
  `;
}

/**
 * @returns {any} creating the Html Part for the Help Section
 */
function createHelpSection() {
  return /*html*/ `
  <div class="flex">
  <div class="helpContainer">
          <div class="headline flex flex-align-center">
              <h1>Help</h1>

              <div>
                  <img class="arrow" onclick="closeHelpSection()" src="./img/left-arrow.png">
              </div>
          </div>

          <div class="scrollBox">
              <div>
                  <h2>What is Join?</h2>
              </div>
              <div>
                  <span> Join is an agile Project Management Tool which is invented to bring Clarity to your work
                      Process and to maximize the Efficieny of
                      by limiting work in progress. <br>
                      in knowledge work , Join can be used for manufacturing Processes.
                  </span>
              </div>


              <div>
                  <div>
                      <h2>How to use it</h2>
                  </div>

                  <div>
                      <table>
                          <tbody>
                              <tr>
                                  <td class="nrTable">1.</td>
                                  <td><span> The first Step is to create a Task and fill in all needed
                                          informations. You
                                          can do that by klicking on Add Task in the Navigation Menu.<br>
                                          Now your Task will be shown in Board.
                                      </span></td>
                              </tr>

                              <tr>
                                  <td class="nrTable">2.</td>
                                  <td><span> if you click on contacts in the Navigation Menu your be able to
                                          Create a new
                                          Contact to assign them to your Tasks. <br>
                                          now your contacts will be shown in the left column sorted by their first
                                          letter.
                                      </span></td>
                              </tr>

                              <tr>
                                  <td class="nrTable">3.</td>
                                  <td><span> when you click on Board in the Navigation Menu your Tasks will be
                                          shown in
                                          Columns. Everytime by creating a Task first it will be shown in The
                                          column:
                                          In Progress. <br>
                                          if you want to change the status you can simply drag an drop your task
                                          into
                                          another column. <br>
                                          by clicking on a task you will see a fullview of this actual Task where
                                          you
                                          be able to change some informations by clicking on the pencil at the
                                          bottom
                                          <br>
                                          by clicking on find Task your be able to search Tasks by theier title or
                                          their description.
                                      </span></td>
                              </tr>

                              <tr>
                                  <td class="nrTable">4.</td>
                                  <td><span>by clicking on Summary in the Navigation Menu you can see a summary of
                                          all
                                          Tasks and theier actual Status and in addittion to that you can see the
                                          next
                                          upcoming deadline</td>
                                  <span>
                              </tr>

                          </tbody>
                      </table>
                  </div>

              </div>
          </div>

      </div>

  </div>

</div>`;
}

/**
 * @returns {any} template for Legal Notice
 */
function createLegalNotice() {
  return /*html*/ `
            <div class="headline flex flex-align-center">
              <h1>Legal Notice</h1>

              <div>
                  <img class="arrow" onclick="closeLegalNotice()" src="./img/left-arrow.png">
              </div>
          </div>
<div class="scrollBox">


  <h1>Datenschutzerklärung</h1>
<p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>
<p>Rico Denkewitz, Phil Schmucker, Tom Petri</p>
<h2>Ihre Betroffenenrechte</h2>
<p>Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:</p>
<ul>
<li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
<li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
<li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
<li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),</li>
<li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
<li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
</ul>
<p>Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.</p>
<p>Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.</p>
<p>Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: <a href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html" target="_blank" rel="noopener nofollow">https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html</a>.</p>
<p></p><h2>Erfassung allgemeiner Informationen beim Besuch unserer Website</h2>
<h3>Art und Zweck der Verarbeitung:</h3>
<p>Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen übermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches. </p>
<p>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
<ul>
<li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
<li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
<li>Auswertung der Systemsicherheit und -stabilität sowie</li>
<li>zur Optimierung unserer Website.</li>
</ul>
<p>Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Informationen dieser Art werden von uns ggfs. anonymisiert statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren. </p>
<h3>Rechtsgrundlage und berechtigtes Interesse:</h3>
<p>Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website.</p>
<h3>Empfänger:</h3>
<p>Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter tätig werden.</p>
<p></p><h3>Speicherdauer:</h3>
<p>Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist für die Daten, die der Bereitstellung der Website dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung beendet ist. </p>
<p></p><h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
<p>Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein. Aus diesem Grund ist ein Widerspruch ausgeschlossen. </p>
<p></p><h2>Registrierung auf unserer Website</h2>
<h3>Art und Zweck der Verarbeitung:</h3>
<p>Für die Registrierung auf unserer Website benötigen wir einige personenbezogene Daten, die über eine Eingabemaske an uns übermittelt werden. </p>
<p>Zum Zeitpunkt der Registrierung werden zusätzlich folgende Daten erhoben:</p>
<p>keine</p>
<p>Ihre Registrierung ist für das Bereithalten bestimmter Inhalte und Leistungen auf unserer Website erforderlich.</p>
<h3>Rechtsgrundlage:</h3>
<p>Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt auf Grundlage einer Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a DSGVO).</p>
<h3>Empfänger:</h3>
<p>Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig werden.</p>
<p></p><h3>Speicherdauer:</h3>
<p>Daten werden in diesem Zusammenhang nur verarbeitet, solange die entsprechende Einwilligung vorliegt. </p>
<h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
<p>Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig, allein auf Basis Ihrer Einwilligung. Ohne die Bereitstellung Ihrer personenbezogenen Daten können wir Ihnen keinen Zugang auf unsere angebotenen Inhalte gewähren. </p>
<p></p><h2>Kommentarfunktion</h2>
<h3>Art und Zweck der Verarbeitung:</h3>
<p>Wenn Nutzer Kommentare auf unserer Website hinterlassen, werden neben diesen Angaben auch der Zeitpunkt ihrer Erstellung und der zuvor durch den Websitebesucher gewählte Nutzername gespeichert. Dies dient unserer Sicherheit, da wir für widerrechtliche Inhalte auf unserer Webseite belangt werden können, auch wenn diese durch Benutzer erstellt wurden.</p>
<h3>Rechtsgrundlage:</h3>
<p>Die Verarbeitung der als Kommentar eingegebenen Daten erfolgt auf der Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO).</p>
<p>Durch Bereitstellung der Kommentarfunktion möchten wir Ihnen eine unkomplizierte Interaktion ermöglichen. Ihre gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage sowie für mögliche Anschlussfragen gespeichert.</p>
<h3>Empfänger:</h3>
<p>Empfänger der Daten sind ggf. Auftragsverarbeiter.</p>
<p></p><h3>Drittlandtransfer:</h3>
<p>Die erhobenen Daten werden ggfs. in folgende Drittländer übertragen: </p>
<p>nein</p>
<p>Folgende Datenschutzgarantien liegen vor: </p>
<p></p><h3>Speicherdauer:</h3>
<p>Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist grundsätzlich der Fall, wenn die Kommunikation mit dem Nutzer abgeschlossen ist und das Unternehmen den Umständen entnehmen kann, dass der betroffene Sachverhalt abschließend geklärt ist. Wir behalten uns die Löschung ohne Angaben von Gründen und ohne vorherige oder nachträgliche Information vor.</p>
<p>Außerdem können Sie Ihren Kommentar jederzeit durch uns löschen lassen. Schreiben Sie dafür bitte eine E-Mail an den unten aufgeführten Datenschutzbeauftragten bzw. die für den Datenschutz zuständige Person und übermitteln den Link zu Ihrem Kommentar sowie zu Identifikationszwecken die bei der Erstellung des Kommentars verwendete E-Mail-Adresse.</p>
<h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
<p>Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Ohne die Bereitstellung Ihrer personenbezogenen Daten können wir Ihnen keinen Zugang zu unserer Kommentarfunktion gewähren.</p>
<p></p><hr>
<h2>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
<h3>Einzelfallbezogenes Widerspruchsrecht</h3>
<p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.</p>
<p>Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>
<h3>Empfänger eines Widerspruchs</h3>
<p>Rico Denkewitz, Phil Schmucker, Tom Petri</p>
<hr>
<h2>Änderung unserer Datenschutzbestimmungen</h2>
<p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
<h2>Fragen an den Datenschutzbeauftragten</h2>
<p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:</p>
<p>Rico Denkewitz 
<br>rico.12345@web.de</p>
<p><em>Die Datenschutzerklärung wurde mithilfe der activeMind AG erstellt, den Experten für <a href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/" target="_blank" rel="noopener">externe Datenschutzbeauftragte</a> (Version #2020-09-30).</em></p>
</div>
`;
}
