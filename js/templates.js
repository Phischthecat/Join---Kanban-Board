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
        <img/>
      </div>
  </div>
  `;
}

function createFullView(task, index) {
  return /*html*/ `
  <div class="modalContainer fade-in startTop">
      <div class="fullCard hide-scrollbar" id="fullCard">
        <div class="headerFullCard">
          <div
            class="categoryText"
            style="background-color:${task.category.color}"
          >
            <span>${task.category.name}</span>
          </div>
          <div class="plus">
            <img onclick="checkIfSubtasksDone(${index}); closeFullView()" src="img/secondary-plus.svg" />
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
            <img src="img/pencil.svg" />
          </button>

        </div>
      </div>
    </div>
    `;
}

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

function createAssignedContactInitialsOverflow(overflow) {
  return /*html*/ `
  <div class="initials initialCircle" style="background-color:#2a3647">+${overflow}</div>
  `;
}

function createEditTask(task) {
  return /*html*/ `
    <div class="flex changedCard"> 
      <div class="headerFullCard plus-end">
        <div class="plus ">
          <img onclick="closeFullView()" src="img/secondary-plus.svg">
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
                <img src="img/urgent.addTask.svg" />
              </button>
              <button type="button" class="statusButton" onclick="getPriority('medium')" id="medium">
                <p>Medium</p>
                <img src="img/medium.addTask.svg" />
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
                <img src="img/low.addTask.svg" />
              </button>
            </div>
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
                            <form id="newContactForm" onsubmit="checkIfInputEmpty(); return false;">
                            <input class="nameModal" id="newContactName" type="text" placeholder="Name">
                            <input class="emailModal" id="newContactEmail" type="email" placeholder="Email">
                            <input class="phoneModal" id="newContactPhone" type="tel" placeholder="Phone">
                            <div class="contactBtnContainer">
                                <button type="button" class="btn-white btn-white-mobile" onclick="closeContactBox()">Cancel <img src="/img/secondary-plus.svg"></button>
                                <button type="submit" class="btn-blue btn-blue-mobile" >Create Contact <img src="/img/ticked-off.svg"></button>
                            </div>
                            </form>
                </div>
            </div>
        </div>
    </div>
    `;
}

function editContact(i) {
  const contact = contacts[i];
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
                        <div id="editContactInitial" class="initialsFullContact initialCircle" style="background-color:#${contact.color}">
                            ${contact.initial}
                        </div>
                    </div>
                        <div class="contactInputSection">
                            <img class="close cursor-pointer" src="/img/secondary-plus.svg" onclick="closeContactBox()">
                            <form id="editContactForm" onsubmit="saveContact(${i}); return false;">
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

{
  /* <h1>I forgot My Password</h1> */
}

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

function addTaskContainerHMTL() {
  return /*html*/ `
    <div class="modalContainer slide-in-right" id="animation">
        <div class="boxContent">
        <div class="headline">
            <span  id="kanbanTextBoard" class="kanbanTextAddTask"
              >Kanban Project Management Tool</span
            >
            <h1>Add Task</h1>
          </div>

          <form id="formAddTask" class="flex flexAddTask" onsubmit="addTask('toDo'); return false;">
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
                  <div id="selectBtn0" class="select-btn" onclick="openDropdownMenu(0)">
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
                  <div id="assignedToContacts" class="assignedToContacts"></div>
                </div>
              </div>

              <div class="container">
                <span class="text textAddTaskMobile">Assigned to</span>
                <div id="selectBtn1" class="select-btn" onclick="openDropdownMenu(1)">
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
                      <img src="img/urgent.addTask.svg" />
                    </button>

                    <button type="button" class="statusButton" onclick="getPriority('medium')" id="medium">
                      <p>Medium</p>
                      <img src="img/medium.addTask.svg" />
                      <div>
                        <input type="text" class="hiddenInput" id="hiddenUrgentInput" required />
                      </div>
                    </button>

                    <button type="button" class="statusButton" onclick="getPriority('low')" id="low">
                      <p>Low</p>
                      <img src="img/low.addTask.svg" />
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
                  onclick="addTask('toDo')"
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
            <img src="img/board.navbar.svg" />
          </div>        
  </div>
</div>
    `;
}


function createBtnForMobileBoard() {
  return /*html*/`
                  <button
                  type="submit"
                  class="btn-blue createTaskBtn"
                  onclick="addTask('toDo')"
                  id="create"
                >
                  Create
                  <span class="check-btn">
                    <i class="fa-solid fa-check"></i>
                  </span>
                </button>
  `
}


function createCategorys(i) {
  const category = categorys[i];
  return /*html*/ `
  <li class="categoryItem item" onclick="renderChoosenCategory(${i})">
                    <span class="item-text">${category.name}</span>
                    <span class="categoryCheckbox" style="color:${category.color}">
                      <i class="fa-solid fa-circle"></i>
                    </span>
                  </li>
  `;
}

function createCategoryDefault() {
  return /*html*/ `
  <li class="categoryItem item" onclick="addNewCategory()">
    <span class="item-text"> New category</span>
  </li>
  `;
}

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

function createNewCategoryColors(i) {
  const categoryColor = categoryColors[i];
  return /*html*/ `
  <span id="color${i}" class="categoryCheckbox colorBubble" onclick="categoryColorChoose(${i})">
    <i class="fa-solid fa-circle" style="color:${categoryColor}"></i>
  </span>
  `;
}

function createCategorySelection() {
  return /*html*/ `
  <div id="selectBtn0" class="select-btn" onclick="openDropdownMenu(0)">
    <span class="btn-text">Choose category</span>
    <span class="arrow-down">
      <i class="fa-solid fa-caret-down"></i>
    </span>
  </div>
  <ul class="list-items" id="categoryList"></ul>
  `;
}

function createSelectedCategory(input) {
  return /*html*/ `
  <div id="selectBtn0" class="select-btn" onclick="openDropdownMenu(0)">
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
          onclick="openTaskBox('toDo')"
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
 * creating the Html Part for the Help Section
 */
function createHelpSection() {
  return /*html*/ `
  <div class="flex">
  <div>
      <div w3-include-html="navbar.html" class="flex"></div>
  </div>


  <div class="mainContainer ">
      <!--Header only for Mobile Summary-->
      <!-- <header class="headerSummary hide">
          <img src="img/joinlogo.png" class="joinLogoSummary" />
      </header> -->


      <div class="helpContainer">
          <div class="headline flex flex-align-center">
              <h1>Help</h1>

              <div>
                  <img class="arrow" onclick="closeHelpSection()" src="img/left-arrow.png">
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


  <!-- Navbar only for Mobile Summary-->
  <!-- <nav class="navbarSummary">
      <div class="containerWithSectionsSummary">
          <ul>
              <li>
                  <a href="summary.html">
                      <img class="iconsNavSummaryMobile" src="img/summary.svg">
                      Summary
                  </a>
              </li>
              <li>
                  <a href="board.html">
                      <img class="iconsNavSummaryMobile" src="img/board.navbar.svg">
                      Board
                  </a>
              </li>
              <li>
                  <a href="addTask.html">
                      <img class="iconsNavSummaryMobile" src="img/addtask.navbar.svg">
                      Add Task
                  </a>
              </li>
              <li>
                  <a href="contact.html">
                      <img class="iconsNavSummaryMobile" src="img/contacts.navbar.svg">
                      Contacts
                  </a>
              </li>
              <li>
                  <a href="help.html"></a>
              </li>
          </ul>
      </div>
  </nav> -->
</div>`;
}
