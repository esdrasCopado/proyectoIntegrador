
const dropArea = document.getElementById('file-upload-form');
const fileInput = document.getElementById('file');
const imagePreview = document.getElementById('image-preview');
const imageContainer = document.getElementById('image-container');
const uploadButton = document.getElementById('upload-button');

const name = document.getElementById('name-product');
const description = document.getElementById('description-product');
const price = document.getElementById('price-product');




// Prevenir el comportamiento predeterminado al arrastrar y soltar
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Resaltar el área de soltar al arrastrar sobre ella
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

// Manejar la soltura de la imagen
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            imagePreview.src = event.target.result;
            imageContainer.style.display = 'flex';
        };
        
        reader.readAsDataURL(file);
        fileInput.files = files;
    }
}

// Manejar el evento de cambio de archivo de entrada
fileInput.addEventListener('change', handleFileInputChange);

function handleFileInputChange() {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            imagePreview.src = event.target.result;
            imageContainer.style.display = 'flex';
        };

        reader.readAsDataURL(file);
    }
}

// Manejar el clic en el botón de carga
uploadButton.addEventListener('click', uploadFile);

function checkFields() {
    if(!name.value,!description.value,!price.value) {
        alert('Debes llenar todos los campos');
        return false;
    }
}

async function uploadFile() {
    checkFields();
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://proyectoesdrascopado.com/v1/amazonRoutes/files', {
            method: 'POST',
            body: formData
        });

        console.log(response)

        if (response.ok) {
            const data= await response.json();
            console.log('File uploaded successfully');
            console.log('Response from server: ' ,data);
            console.log('File name: ', data.fileName)
            const product={
                name: name.value,
                description: description.value,
                price: price.value,
                image: data.fileName
            }
            createNewProduct(product);

        } else {
            console.error('Failed to upload file');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}
async function createNewProduct(product){
    console.log(product);
    const response = await fetch('https://proyectoesdrascopado.com/v1/productRoutes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.reload();
    } else {
        console.error("Error al crear el producto");
    }
}

