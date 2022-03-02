let productNameInput = document.getElementById('productName');
let productPriceInput = document.getElementById('productPrice');
let productCountInput = document.getElementById('productCount');
let productCategoryInput = document.getElementById('productCategory');
let productImageInput = document.getElementById('productImage');
let productDescInput = document.getElementById('productDesc');
let searchInput = document.getElementById('searchInput');

let productsContainer;
if (localStorage.getItem("products") == null)
    productsContainer = [];
else {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsContainer);
}

let uploadedImage = '';

productImageInput.addEventListener('change', function () {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        uploadedImage = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

function addProduct() {
    if (validate()) {
        let product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            count: productCountInput.value,
            category: productCategoryInput.value,
            image: uploadedImage,
            desc: productDescInput.value
        }
        productsContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
        productNameInput.style.borderColor = "green";
    }
    else
        productNameInput.style.borderColor = "red";
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCountInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productImageInput.value = "";
}

function displayProducts(productsArr) {
    showTable();
    let cartoona = "";
    for (let i = 0; i < productsArr.length; i++) {
        cartoona += `<tr>
        <td>${i + 1}</td>   
        <td><img src="${productsArr[i].image}" alt=""></td>
        <td>${productsArr[i].name}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].count}</td>
        <td><button onclick="updateCount(${i},1)" class="btn btn-info"><i class="fas fa-plus-circle "></i></button></td>
        <td><button onclick="updateCount(${i},-1)" class="btn btn-info"><i class="fas fa-minus-circle"></i></button></td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning" id="updateBtn">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger" id="deleteBtn">Delete</button></td></tr>`
    }
    document.getElementById("tableRow").innerHTML = cartoona;
}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

let updateProductIndex = 0;
function updateProduct(productIndex) {
    document.getElementById("addUpdateProduct").innerHTML = "updte product";
    productNameInput.value = productsContainer[productIndex].name;
    productPriceInput.value = productsContainer[productIndex].price;
    productCountInput.value = productsContainer[productIndex].count;
    productCategoryInput.value = productsContainer[productIndex].category;
    //productImageInput.value = productsContainer[productIndex].image;
    productDescInput.value = productsContainer[productIndex].desc;
    updateProductIndex = productIndex;
}

function showProductAfterUpdate(productIndex) {
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        count: productCountInput.value,
        category: productCategoryInput.value,
        image: uploadedImage,
        desc: productDescInput.value
    }
    productsContainer[productIndex] = product;
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    clearForm();
    document.getElementById("addUpdateProduct").innerHTML = "add product";
}

function check() {
    if (document.getElementById("addUpdateProduct").innerHTML == "add product") {
        addProduct();
    }
    else {
        showProductAfterUpdate(updateProductIndex);
    }
}

function showTable() {
    if (productsContainer.length > 0)
        document.getElementById("tableShow").classList.remove("d-none");
    else
        document.getElementById("tableShow").classList.add("d-none");
}

function searchProduct(value) {
    let searchProducts = [];
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(value.toLowerCase())) {
            searchProducts.push(productsContainer[i]);
        }
    }
    displayProducts(searchProducts);
}

function validate() {
    let regex = /^[A-Z][a-z]{3,20}$/;
    if (regex.test(productNameInput.value))
        return true;
    else
        return false;
}

function updateCount(index, x) {
    if (productsContainer[index].count == 0 && Number(x) == -1)
        productsContainer[index].count = 0;
    else {
        productsContainer[index].count = Number(productsContainer[index].count) + Number(x);
        localStorage.setItem("products", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
    }
}