const modal = document.createElement("div");
modal.id = "img-modal";
const toggle = document.createElement("button");
toggle.innerText = "[X]";
const _img = document.createElement("img");
const _title = document.createElement("p");
modal.append(toggle, _img, _title);

modal.style.display = "none";
_img.classList = [ "no-modal" ]; // no recursion :3

document.addEventListener("keydown", (ev) => {
    console.log(ev.key);
    if (ev.key == "Escape") { modal.style.display = "none"; }
})

document.body.append(modal);

document.querySelectorAll("img").forEach((img) => {
    if (!img.classList.contains("no-modal")) {
        img.addEventListener("click", () => {
            _img.src = img.src;
            _img.style.maxWidth = `${Math.floor(window.innerWidth * 0.9)}px`;
            _img.style.maxHeight = `${Math.floor(window.innerHeight * 0.9)}px`;
            _title.innerText = img.title;
            console.log(img);
            modal.style.display = "flex";
            toggle.focus();
        })
    }
})

toggle.addEventListener("click", () => {
    modal.style.display = "none";
});