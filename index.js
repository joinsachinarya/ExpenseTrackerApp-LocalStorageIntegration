const header = document.getElementById("header");
const items = document.getElementById("items");
const form = document.getElementById("form");

const deleteItem = (event) => {
    if (event.target.classList.contains("deleteBtn")) {
        const element = event.target.parentElement;
        items.removeChild(element);
        console.log(element);
    }

}
const editItem = (event) => {
    if (event.target.classList.contains("editBtn")) {
        const element = event.target.parentElement;
        element.style.color = "red";
        console.log(element);
    }

}

const createItem = (amount, description, category) => {

    var li = document.createElement("li");

    var span = document.createElement("span");
    span.textContent = `${amount} - ${description} - ${category}`;
    li.appendChild(span);

    var deleteBtn = document.createElement("button");
    var editBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("X"));
    deleteBtn.className = "deleteBtn btndeleteBtn btn";
    editBtn.appendChild(document.createTextNode("Edit"));
    editBtn.className = "editBtn btn"
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    items.append(li)


}

const addItem = (event) => {
    event.preventDefault();
    var amountValue = document.getElementById("amount").value;
    var descriptionValue = document.getElementById("description").value;
    var categoryValue = document.getElementById("category").value;
    createItem(amountValue, descriptionValue, categoryValue);
    console.log(amountValue, descriptionValue, categoryValue);

}

items.addEventListener("click", editItem);
items.addEventListener("click", deleteItem);
form.addEventListener("submit", addItem);
