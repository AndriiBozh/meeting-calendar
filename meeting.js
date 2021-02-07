//  ------- start ------- popups

const showPopupBtns = document.querySelectorAll("[data-popup-target]");
const closePopupBtns = document.querySelectorAll("[data-close-popup-button]");
const overlay = document.getElementById("overlay");

showPopupBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    //HTMLelement.dataset let us access data attributes of this HTMLelement
    // and make them camelCase
    //eg., if we have <button data-popup-target="#new-event-popup-form"> ,
    //it will get 'new-event-popup-form' from HTML and make it 'newEventPopupForm', which we access by .popupTarget
    const popup = document.querySelector(button.dataset.popupTarget);
    showPopupWindow(popup);
  });
});

function showPopupWindow(popup) {
  if (popup === null) {
    return;
  }
  popup.classList.add("active");
  overlay.classList.add("active");
}

closePopupBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    // since the button, which closes the popup window, is inside this popup window, instead of using 'querySelector' we can use '.closest', which will give us the first ansestor (parent element) with a class of '.popup-window' (we assigned '.popup-window' class to all our popups)
    e.preventDefault();
    const popup = button.closest(".popup-window");
    closePopupWindow(popup);
  });
});

function closePopupWindow(popup) {
  if (popup === null) {
    return;
  }
  popup.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", () => {
  //get all open popups (popup is open, when it has an '.active' class)
  const popupWindows = document.querySelectorAll(".popup-window.active");
  popupWindows.forEach((popupWindow) => {
    closePopupWindow(popupWindow);
  });
});

//  ------- end ------- popups

// --- start ---- show and hide popup 'confirm delete' window

const confirmDeleteEventBtn = document.getElementById("delete-event");
const cancelDeleteEventBtn = document.getElementById("cancel-delete");

const deleteEventConfirmationPopup = document.getElementById(
  "confirm-delete-event-popup"
);

//had to make variable global, so that functions within 'confirmDeleteEventBtn' have access to it

let arrayOfIds = [];
//
function showDeleteEventConfirmationPopup(id, name, event) {
  arrayOfIds = [id, name];
  deleteEventConfirmationPopup.classList.add("active");
  overlay.classList.add("active");
  document.getElementById("event-name").innerHTML = event;
}

confirmDeleteEventBtn.addEventListener("click", () => {
  removeColorFromTableCell(arrayOfIds[0]),
    deleteEvent(arrayOfIds[0]),
    deleteOptionName(arrayOfIds[1]);
});

// --- end ---- show and hide popup 'confirm delete' window

//add options to 'select' element
function addOptionName(e, name) {
  e.preventDefault();
  const select = document.getElementById("participants");
  const option = document.createElement("option");

  if (name) {
    option.text = name;
    option.value = name;
    select.add(option);
  }
}

//delete options from 'select' element
function deleteOptionName(name) {
  const select = document.getElementById("participants");
  select.removeChild(select.querySelector(`option[value='${name}']`));
}

function fillCalendar(e) {
  e.preventDefault();
  const getDay = document.getElementById("day").value;
  const getTime = document.getElementById("hours").value;
  const tableCell = document.getElementById(`${getDay}-${getTime}`);
  const inputEventName = document.getElementById("event").value;
  const optionName = document.getElementById("name").value;
  const unableToCreateEvent = document.getElementById("unable-create-event");
  const fillRequeredFields = document.getElementById("fill-required-fields");

  if (tableCell.innerHTML !== "") {
    unableToCreateEvent.classList.add("active");
    //as we are removing '.active' class from "div #overlay" by pressing 'Create' (.create-event) button, we need to add '.active' class to #overlay here, so that another popup window ('this time slot is already booked') has its overlay
    overlay.classList.add("active");
  } else if (!inputEventName || !optionName) {
    fillRequeredFields.classList.add("active");
    overlay.classList.add("active");
  } else {
    tableCell.innerHTML = `<div class="cell-element" data-author="${optionName}" id="delete-${getDay}-${getTime}"  >${inputEventName}<button class="close" onclick='showDeleteEventConfirmationPopup("delete-${getDay}-${getTime}", "${optionName}", "${inputEventName}")'>&times;</button></div>`;
    colorTableCell(tableCell);
    addOptionName(e, optionName);

    //clear input field
    document.getElementById("event").value = "";
    document.getElementById("name").value = "";
  }
}

function editInput(val) {
  const inputValues = document.getElementById("name").value;
}

// create event
const createEventBtn = document.getElementById("create-event");
createEventBtn.addEventListener("click", (e) => {
  fillCalendar(e);
});

//add background to table cell
function colorTableCell(id) {
  id.classList.add("fill-cell");
}

//remove background from table cell
function removeColorFromTableCell(id) {
  const elem = document.getElementById(id);
  const cell = elem.closest("td");
  cell.classList.remove("fill-cell");
  cell.classList.remove("filtered-accent");
}

// delete event from calendar
function deleteEvent(id) {
  const elementToRemove = document.getElementById(id);
  elementToRemove.remove();
}

//----- start -------- hide / show elements using options from 'select'
const hide = document.getElementById("participants");
hide.addEventListener("change", showHideCalendarEvents);

//check, if tablecell has a '.filtered-accent' class, i.e. if elements were previously 'filtered' and if the class was applied. If it was applied, then we have to remove it, so that another names (newly searched) are highlighted
function checkClassAndRemove(name) {
  const allPeople = document.querySelectorAll(`[data-author]`);
  allPeople.forEach((person) => {
    if (
      person.closest("td").classList.contains("filtered-accent") &&
      person.dataset.author !== name
    ) {
      person.closest("td").classList.remove("filtered-accent");
    }
  });
}

function showHideCalendarEvents() {
  const selIndex = hide.selectedIndex;
  const optionName = hide[selIndex].value;

  //find each person within the calendar table, which has the same name (surname)
  const author = document.querySelectorAll(`[data-author=${optionName}]`);

  author.forEach((person) => {
    //get the container (<td>) into which content was placed
    // and apply class to this <td> element
    // if we apply class to the div, than the <td> element will not be fully covered with a color
    const tblCell = person.closest("td");

    checkClassAndRemove(optionName);
    tblCell.classList.add("filtered-accent");
  });

  if (optionName === "all-members") {
    // get all persons within the calendar table
    const authors = document.querySelectorAll(`[data-author]`);
    authors.forEach((person) => {
      const tableData = person.closest("td");
      tableData.classList.remove("filtered-accent");
    });
  }
}

//----- end -------- hide / show elements using options from 'select'
