const fondo= document.querySelector(".fondo");
const btn= document.querySelector(".btn");  
const iconocerrar= document.querySelector(".icono-cerrar");


btn.addEventListener("click", () => {
    fondo.classList.add('active-btn');
});
iconocerrar.addEventListener("click", () => {
    fondo.classList.remove('active-btn');
});
