// TODO: dont allow to drag outside of viewport
function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.e;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.e;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const detailsElements = document.querySelectorAll("details");
const collapsibles = document.querySelectorAll(".collapsible");
let zIndexCounter = 1;

// Add the onclick listeners.
detailsElements.forEach((details) => {
  dragElement(details);
  details.addEventListener("mousedown", () => {
    details.style.zIndex = zIndexCounter++;
  });
  const summary = details.querySelector("summary");
  summary.addEventListener("click", (e) => {
    e.preventDefault();
  });
  details.addEventListener("toggle", () => {
    const toggleBtn = details.querySelector(".toggle");
    if (details.open) toggleBtn.innerText = "-";
    else toggleBtn.innerText = "+";
  });
  const toggleBtn = details.querySelector(".toggle");
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// collapsibles.forEach((collapsible) => {
//   collapsible.addEventListener("click", (e) => {
//     collapsible.style.zIndex = 2;
//   });
// });
