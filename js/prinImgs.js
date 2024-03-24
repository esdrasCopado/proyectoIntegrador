async function getUrlFiles() {
  const response = await fetch("https://proyectoesdrascopado.com/getUrlFiles", {
    method: "GET",
  });
  if (response.ok) {
    const urls = await response.json();
    printImg(urls); // Esto imprimirá las URL de los archivos en la consola
  } else {
    console.error("Error al obtener las URL de los archivos");
  }
}

function printImg(urls) {
  const printImagesDiv = document.getElementById("printImages");

  // Limpiar el div antes de agregar nuevas imágenes
  printImagesDiv.innerHTML = "";

  for (const url of urls) {
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.style.width = "300px"; // Establecer un ancho para las imágenes (ajustar según sea necesario)
    imgElement.style.height = "auto"; // Permitir que la altura se ajuste automáticamente según el ancho
    printImagesDiv.appendChild(imgElement);
  }
}

getUrlFiles();
