// Script para manejar el dropzone del logo y validación del formulario

const dropzone = document.getElementById("logoDropzone");
const fileInput = document.getElementById("logoUpload");

// Abrir selector al hacer clic en el dropzone
dropzone.addEventListener("click", () => fileInput.click());

// Manejo de arrastrar y soltar
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragover");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    previewLogo(file);
  } else {
    alert("Por favor selecciona un archivo de imagen válido.");
  }
});

// Manejo de selección desde el input file
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    previewLogo(file);
  }
});

// Función para mostrar vista previa
function previewLogo(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    dropzone.innerHTML = `<img src="${e.target.result}" alt="Logo" style="max-width:100%; max-height:100%; border-radius:8px;" />`;
  };
  reader.readAsDataURL(file);
}

// Validación simple del formulario
document.getElementById("accident-form").addEventListener("submit", (e) => {
  if (!e.target.checkValidity()) {
    e.preventDefault();
    alert("Revisa los campos requeridos.");
  }
});

// --- Campo Cédula Dominicana ---
const cedulaInput = document.getElementById("cedula");
cedulaInput.setAttribute('maxlength', '13');
cedulaInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  if (value.length > 3 && value.length <= 10) {
    value = value.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (value.length > 10) {
    value = value.replace(/(\d{3})(\d{7})(\d+)/, '$1-$2-$3');
  }
  e.target.value = value;
});
cedulaInput.addEventListener('keypress', (e) => {
  if (!/\d/.test(e.key)) e.preventDefault();
})

// --- Campo Fecha dd/mm/yyyy ---
const fechaInput = document.getElementById('fecha');
fechaInput.setAttribute('maxlength', 10); // dd/mm/yyyy
fechaInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 2 && value.length <= 4) {
    value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
  } else if (value.length > 4 && value.length <= 8) {
    value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  }
  e.target.value = value;
});
fechaInput.addEventListener('keypress', (e) => { if (!/\d/.test(e.key)) e.preventDefault(); });
