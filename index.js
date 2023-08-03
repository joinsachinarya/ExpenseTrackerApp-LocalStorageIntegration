document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("items")) {
        const itemsArr = Array.from(JSON.parse(localStorage.getItem("items")));
        itemsArr.forEach((item) => {
            createItem(item.amount, item.description, item.category);
        })

    }
})

const header = document.getElementById("header");
const items = document.getElementById("items");
const form = document.getElementById("form");
const search = document.getElementById("search");
const itemsArray = [];




const deleteItem = (event) => {
    if (event.target.classList.contains("deleteBtn")) {
        if (confirm("Are you sure?")) {
            const li = event.target.parentElement;
            const index = Array.from(items.children).indexOf(li);
            if (index !== -1) {
                itemsArray.splice(index, 1);
                localStorage.setItem("items", JSON.stringify(itemsArray));
            }
            items.removeChild(li);
        }
    }

}
const editItem = (event) => {
    if (event.target.classList.contains("editBtn")) {
        let element = event.target.parentElement;
        let index = Array.from(items.children).indexOf(element);

        if (index !== -1) {
            let elementValues = itemsArray[index];
            let newAmount = prompt("Edit amount:", elementValues.amount);
            let newDes = prompt("Edit description:", elementValues.description);
            let newCategory = prompt("Edit category:", elementValues.category);

            if (!isNaN(newAmount) && newDes.trim() !== "" && newCategory) {
                elementValues.amount = newAmount;
                elementValues.description = newDes;
                elementValues.category = newCategory;
                element.children[0].textContent = newAmount;
                element.children[1].textContent = newDes;
                element.children[2].textContent = newCategory;
                localStorage.setItem('items', JSON.stringify(itemsArray));
            }
        }
    }
}

const createItem = (amount, description, category) => {

    let li = document.createElement("li");
    li.className = "list-group-item list-group-item-action "

    let spanAmount = document.createElement("span");
    spanAmount.textContent = amount;
    spanAmount.className = "d-inline-block text-start w-25";
    let spanDes = document.createElement("span");
    spanDes.textContent = description;
    spanDes.className = "d-inline-block text-start w-25";
    let spanCategory = document.createElement("span");
    spanCategory.textContent = category;
    spanCategory.className = "d-inline-block text-start w-25"

    li.appendChild(spanAmount);
    li.appendChild(spanDes);
    li.appendChild(spanCategory);


    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("X"));
    deleteBtn.className = "deleteBtn btn btn-danger mx-5";
    editBtn.appendChild(document.createTextNode("Edit"));
    editBtn.className = "editBtn btn btn-warning float-sm-right"
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    const itemsObj = { amount: amount, description: description, category: category }
    itemsArray.push(itemsObj)
    items.append(li)


}

const addItem = (event) => {
    event.preventDefault();
    let amountValue = document.getElementById("amount").value;
    let descriptionValue = document.getElementById("description").value;
    let categoryValue = document.getElementById("category").value;
    createItem(amountValue, descriptionValue, categoryValue);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
}
const searchItem = (event) => {
    let searchedText = event.target.value.toLocaleLowerCase();
    let itemList = items.getElementsByTagName("span");
    let itemsArray = Array.from(itemList);

    itemsArray.forEach(function (it) {
        let textContent = it.textContent.toLocaleLowerCase();
        console.log(textContent);
        if (textContent.indexOf(searchedText) !== -1) {
            it.parentElement.style.display = "block";
        } else {
            it.parentElement.style.display = "none";
        }
    })
}

search.addEventListener("keyup", searchItem)
items.addEventListener("click", editItem);
items.addEventListener("click", deleteItem);
form.addEventListener("submit", addItem);
