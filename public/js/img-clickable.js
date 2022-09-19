const clickable = document.querySelector(".img-clickable");
const img_container = document.querySelector(".img_container_admin");

const clickable2 = document.querySelector(".doc-clickable");
const doc_container = document.querySelector(".doc_container_admin");

clickable.addEventListener('click', () => {
    console.log("hello");
    img_container.classList.toggle("hidden");
})

clickable2.addEventListener('click', () => {
    doc_container.classList.toggle("hidden");
})