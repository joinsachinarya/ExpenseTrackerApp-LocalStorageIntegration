document.addEventListener("DOMContentLoaded", function () {
    console.log("Loaded!");
})


const header = document.getElementById("header");
const items = document.getElementById("items");
const form = document.getElementById("form");
const itemsArray = [];

const deleteItem = (event) => {
    if (event.target.classList.contains("deleteBtn")) {
        const element = event.target.parentElement;
        items.removeChild(element);
    }

}
const editItem = (event) => {
    if (event.target.classList.contains("editBtn")) {
        var element = event.target.parentElement;
        var index = Array.from(items.children).indexOf(element);

        if (index !== -1) {
            var itemObj = itemsArray[index];
            var newAmount = prompt("Edit amount:", itemObj.amount);
            var newDes = prompt("Edit description:", itemObj.description);

            if (newAmount !== null && newAmount.trim() !== null) {
                itemObj.amount = newAmount;
                itemObj.description = newDes;
                element.firstChild.textContent = newAmount;
                element.getElementsByTagName("input")[0].textContent = newDes;
                localStorage.setItem('items', JSON.stringify(itemsArray));
            }
        }
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

    const itemsObj = { amount: amount, description: description, category: category }
    itemsArray.push(itemsObj)
    items.append(li)


}

const addItem = (event) => {
    event.preventDefault();
    var amountValue = document.getElementById("amount").value;
    var descriptionValue = document.getElementById("description").value;
    var categoryValue = document.getElementById("category").value;
    createItem(amountValue, descriptionValue, categoryValue);
    localStorage.setItem("item", JSON.stringify(itemsArray));
}

items.addEventListener("click", editItem);
items.addEventListener("click", deleteItem);
form.addEventListener("submit", addItem);
