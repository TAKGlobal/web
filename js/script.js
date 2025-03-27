const form = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input")
const inputCorreo = document.querySelector('#formulario input[name="correo"]');
const camposLetras = ["nombre", "apellido", "cargo", "empresa", "pais", "ciudad"];
const inputTelefono = document.querySelector('#formulario input[name="telefono"]')
const btnSubmit = document.getElementById("button");
const checkbox = document.getElementById("terminos");

const expresiones = {
    
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    cargo: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
    telefono: /^\d{7,14}$/, 
    empresa: /^[a-zA-ZÀ-ÿ\s\.]{1,40}$/, 
    sector: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    pais: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    ciudad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    mensaje: /^[a-zA-ZÀ-ÿ\s]{1,400}$/ 
}

function actualizarEstadoSubmit() {
  let formularioValido = true;

  inputs.forEach(input => {
    if (input.value.trim() === "" || input.classList.contains("Invalid")) {
      formularioValido = false;
    }
  });

  if (!checkbox.checked) {
    formularioValido = false;
  }


  if (typeof grecaptcha !== "undefined") {
    if (grecaptcha.getResponse().length === 0) {
      console.log("reCAPTCHA no resuelto");
      formularioValido = false;
    }
  }

  btnSubmit.disabled = !formularioValido;
}


function recaptchaCallback() {
  actualizarEstadoSubmit();
}

function recaptchaExpiredCallback() {
  console.log("reCAPTCHA expiró");
  grecaptcha.reset();
  actualizarEstadoSubmit();
}

const validarCampo = e => {
    if (!e.target.matches("input, textarea")) return;
  
    const input = e.target;
    const valor = input.value.trim();
    const campo = input.name;
    const spanError = input.nextElementSibling;
  
    if (!spanError) {
      console.warn(`No se encontró el elemento de error para el campo ${campo}`);
      return;
    }
    
    if (valor === "") {
      input.classList.add("Invalid");
      spanError.classList.add("Error");
      spanError.innerText = `Se requiere diligenciar ${campo}`;
      console.log(`El campo ${campo} está vacío`);
      actualizarEstadoSubmit();
      return;
    } else {
      input.classList.remove("Invalid");
      spanError.classList.remove("Error");
      spanError.innerText = "";
    }
    
    // Validaciones
    if (campo === "correo") {
      if (!expresiones.correo.test(valor)) {
        input.classList.add("Invalid");
        spanError.classList.add("Error");
        spanError.innerText = "Por favor, ingresa un email válido";
        console.log(`Error en ${campo}`);
      } else {
        input.classList.remove("Invalid");
        spanError.classList.remove("Error");
        spanError.innerText = "";
        console.log(`${campo} válido`);
      }
    } else if (camposLetras.includes(campo)) {
      if (!expresiones[campo].test(valor)) {
        input.classList.add("Invalid");
        spanError.classList.add("Error");
        spanError.innerText = `Por favor, ingresa solo letras en el campo ${campo}`;
        console.log(`Error en ${campo}`);
      } else {
        input.classList.remove("Invalid");
        spanError.classList.remove("Error");
        spanError.innerText = "";
        console.log(`${campo} válido`);
      }
    } else if (campo === "telefono") {
      if (!expresiones.telefono.test(valor)) {
        input.classList.add("Invalid");
        spanError.classList.add("Error");
        spanError.innerText = `Por favor, ingresa solo números en el campo ${campo}`;
        console.log(`Error en ${campo}`);
      } else {
        input.classList.remove("Invalid");
        spanError.classList.remove("Error");
        spanError.innerText = "";
        console.log(`${campo} válido`);
      }
    }
    actualizarEstadoSubmit();
    
  };
  
  
  form.addEventListener("focusout", validarCampo);
  form.addEventListener("input", actualizarEstadoSubmit);

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe inmediatamente

    // Verifica si el formulario es válido antes de enviarlo
    if (!btnSubmit.disabled) {
        // Aquí puedes agregar tu lógica de envío de formulario con EmailJS u otro servicio

        // Restablecer el formulario después de enviarlo
        form.reset();

        // Opcional: Restablecer el estado de los inputs si hay clases de validación
        inputs.forEach(input => input.classList.remove("Invalid"));
        checkbox.checked = false;

        // Si usas reCAPTCHA, también lo puedes reiniciar
        if (typeof grecaptcha !== "undefined") {
            grecaptcha.reset();
        }

        // Deshabilitar el botón nuevamente hasta que el usuario llene el formulario
        btnSubmit.disabled = true;

        // Mostrar mensaje de éxito (si es necesario)
        document.getElementById("formulario__mensaje-exito").style.display = "block";

        // Ocultar el mensaje de éxito después de unos segundos
        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").style.display = "none";
        }, 4000);
    }
});