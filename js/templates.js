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
        <div class="modalContainer fade-in startTop">
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
                            <div id="assignedUser"></div>
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
            <div w3-include-html="task-snippet copy.html"></div>
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
                        <div id="editContactInitial" class="initialsFullContact initialCircle">
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

function createChoosenCategorys(i) {
  const category = categorys[i];
  return /*html*/ `
  <li class="categoryItem item">
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

function addTaskContainerHMTL() {
  return /*html*/ `
    <div class="modalContainer slide-in-right" id="animation">
        <div class="boxContent">
        <div class="headline">
            <span class="kanbanTextAddTask"
              >Kanban Project Management Tool</span
            >
            <h1>Add Task</h1>
          </div>

          <form id="formAddTask" class="flex" onsubmit="return false">
            <div class="leftSplit">
              <div class="title flexColumn">
                <span class="text">Title</span>
                <input
                  id="taskTitle"
                  required
                  type="text"
                  placeholder="Enter a title"
                />
              </div>

              <div class="description flexColumn">
                <span class="text">Description</span>
                <textarea
                  id="taskDescription"
                  cols="30"
                  rows="5"
                  placeholder="Enter a description"
                  required
                ></textarea>
              </div>

              <div class="categoryflexColumn flexColumn">
                <span class="text">Category</span>
                <select id="taskCategory" required>
                  <option value="" selected>Choose category</option>
                  <option value="newCategory">New Category</option>
                  <option value="backoffice">Backoffice</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <!-- <div class="categoryflexColumn flexColumn">
                <span class="text">Category</span>
                <div class="select-btn">
                  <span class="btn-text">Choose category</span>
                  <span class="arrow-down">
                    <i class="fa-solid fa-caret-down"></i>
                  </span>
                </div>
                <ul class="list-items">
                  <li class="item">
                    <span class="item-text" onclick="addNewCategory()">New category</span>
                    <span class="checkbox">
                      <i class="fa-solid fa-square check-icon"></i>
                    </span>
                  </li>
                  <li class="item">
                    <span class="item-text">Sales</span>
                    <span class="checkbox">
                      <i class="fa-solid fa-square check-icon"></i>
                    </span>
                  </li>
                  <li class="item">
                    <span class="item-text">Backoffice</span>
                    <span class="checkbox">
                      <i class="fa-solid fa-square check-icon"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </div> -->

              <div class="container flexColumn">
                <span class="text">Assigned to</span>
                <div class="select-btn">
                  <span class="btn-text">Select contacts to assign</span>
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
              </div>
            </div>

            <div class="rightSplit">
              <div class="dueDate flexColumn">
                <span class="text">Due date</span>
                <input required id="taskDueDate" type="date" />
              </div>

              <div class="priority flexColumn" id="priority">
                <span class="text">Prio</span>

                <div class="priorityBox">
                  <button
                    type="button"
                    class="statusButton"
                    onclick="getPriority('urgent')"
                    id="urgent"
                  >
                    <p>Urgent</p>
                    <img src="img/urgent.addTask.svg" />
                  </button>

                  <button
                    type="button"
                    class="statusButton"
                    onclick="getPriority('medium')"
                    id="medium"
                  >
                    <p>Medium</p>
                    <img src="img/medium.addTask.svg" />
                  </button>

                  <button
                    type="button"
                    class="statusButton"
                    onclick="getPriority('low')"
                    id="low"
                  >
                    <p>Low</p>
                    <img src="img/low.addTask.svg" />
                  </button>
                </div>
              </div>

              <div class="subTasks flexColumn">
                <span class="text">Subtasks</span>
                <input
                  type="text"
                  id="subtasks"
                  placeholder="Add new subtask"
                />
              </div>

              <div class="buttonContainer" id="buttonContainer">
                <button
                  type="button"
                  class="btn-white clearBtn"
                  onclick="clearFields()"
                  id="clear"
                >
                  Clear <img src="img/secondary-plus.svg" />
                </button>
                <button
                  type="submit"
                  class="btn-blue createTaskBtn"
                  onclick="addTask('toDo')"
                  id="create"
                >
                  Create Task <img src="img/ticked-off.svg" />
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
    <span class="item-text">${input}<span class="categoryCheckbox">
      <i class="fa-solid fa-circle" style="color:${choosenColor}"></i>
    </span>
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
      <li class="item" id="${contact.name}" onclick="checked(event, ${i})">
        <span class="item-text">${contact.name}</span>
        <span class="checkbox">
          <i class="fa-solid fa-square check-icon"></i>
        </span>
      </li>
      `;
}
