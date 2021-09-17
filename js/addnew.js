import createMenu from "./components/menu.js";
import { baseUrl } from "./settings/api.js"
import { getToken } from "./utils/userStorage.js";
import createFooter from './components/createFooter.js';
import warningMessage from "./components/warningMessage.js";

if (!getToken()) {
    location.href = "/";
}

createMenu();
createFooter();

const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const descriptionInput = document.querySelector("#description");
const featuredCheck = document.querySelector("#featuredCheck");

const fileInput = document.querySelector("#uploadFile");
const fileMessage = document.querySelector(".image-warning");
const fileLabel = document.querySelector(".custom-file-label");
const imgPreview = document.querySelector("#uploadImage");

const message = document.querySelector("#messageContainer");


// Alert user if file is too big, and show image preview
fileInput.onchange = () => {
    fileMessage.innerHTML = "";
    imgPreview.style.display = "none";
    const file = fileInput.files[0];

    if (file.size >= 200000) {
        fileLabel.innerHTML = "Choose image...";
        return warningMessage("alert-warning", "File size too big", ".image-warning");
    } else {
        fileLabel.innerHTML = file.name;
        let src = URL.createObjectURL(file);
        imgPreview.src = src;
        imgPreview.style.display = "block";
    }
}

form.addEventListener("submit", getProductFormData)

function getProductFormData(event) {
    event.preventDefault();
    message.innerHTML = "";
    const formData = new FormData();
    const formElements = form.elements;

    const title = titleInput.value.trim();
    const price = parseFloat(priceInput.value);
    const description = descriptionInput.value.trim();
    const featured = featuredCheck.checked;

    if (title.length === 0 || description.length === 0 || price.length === 0 || isNaN(price)) {
        return warningMessage("alert-warning", "Please enter all information", "#messageContainer");

    } else {
        const data = {
            title: title,
            price: price,
            description: description,
            featured: featured,
        };

        // Get file data and add to formData
        for (let i = 0; i < formElements.length; i++) {
            const currentElement = formElements[i];
            if (!['submit', 'file'].includes(currentElement.type)) {
                data[currentElement.title] = currentElement.value;
            } else if (currentElement.type === 'file') {
                if (currentElement.files.length === 1) {
                    const file = currentElement.files[0];
                    formData.append(`files.${currentElement.title}`, file, file.title);
                } else {
                    for (let i = 0; i < currentElement.files.length; i++) {
                        const file = currentElement.files[i];
                        formData.append(`files.${currentElement.title}`, file, file.title);
                    }
                }
            }
        }
        // Add other data to formData 
        formData.append('data', JSON.stringify(data));

        trySubmitProduct(formData);
    }
}

// Post new product to strapi
async function trySubmitProduct(data) {
    const url = baseUrl + "/products";
    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            submit.innerHTML = `Product added <i class="fas fa-check">Add Product</i>`;
            imgPreview.style.display = "none";
            fileLabel.innerHTML = "Choose image..."
            form.reset();
            return warningMessage("alert-success", "Product added successfully", "#messageContainer");
        }

        if (json.error) {
            return warningMessage("alert-danger", json.error, "#messageContainer");
        }

    } catch (error) {
        console.log(error);
        return warningMessage("alert-danger", error, "#messageContainer");
    }
}