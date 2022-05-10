const colors = ["#1ef8fc", "#fcf344", "#fc5a5d", "#76fc6a", "#bf6afc"];
let idCounter = 1;

const mover = (event) => {
    event.preventDefault();

    let box = event.target;

    let xPos = event.clientX;
    let yPos = event.clientY;
    let xStart = xPos;
    let yStart = yPos;

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stopMove);

    const move = (event) => {
        event.preventDefault();
        xPos = event.clientX;
        yPos = event.clientY;

        box.style.top = box.offsetTop - (yStart - yPos) + "px";
        box.style.left = box.offsetLeft - (xStart - xPos) + "px";

        xStart = xPos;
        yStart = yPos;
    }

    const stopMove = (event) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stopMove);
    }
}

const colorer = (event) => {
    event.preventDefault();
    event.target.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

const resizer = (event) => {
    if (event.shiftKey) {
        let box = event.target;
        
        // default size of box is expected to be 150 px
        if (box.offsetWidth < 150) {
            box.style.width = box.offsetWidth + 20 + "px";
            box.style.height = box.offsetHeight + 20 + "px";
        }
        
        else {
            box.style.width = box.offsetWidth - 20 + "px";
            box.style.height = box.offsetHeight - 20 + "px";
        }
    }
}

const remover = (event) => {
    if (event.altKey) {
        let box = event.target;
        box.parentNode.removeChild(box);
    }
}

const spawner = (event) => {
    if (!event.altKey && !event.shiftKey) {
        idCounter++;
        
        let newBox = document.createElement("div");
        newBox.classList.add("box");

        // set random color for new box
        newBox.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        newBox.innerHTML = idCounter;

        newBox.addEventListener("mousedown", mover);
        newBox.addEventListener("contextmenu", colorer);
        newBox.addEventListener("mousedown", resizer);
        newBox.addEventListener("dblclick", remover);

        document.getElementsByClassName("box-container")[0].appendChild(newBox);

        newBox.addEventListener("dblclick", spawner);
    }
}


const box = document.querySelector(".box");

box.addEventListener("mousedown", mover);
box.addEventListener("contextmenu", colorer);
box.addEventListener("mousedown", resizer);
box.addEventListener("dblclick", remover);
box.addEventListener("dblclick", spawner);