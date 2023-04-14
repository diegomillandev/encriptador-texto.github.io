const form = document.querySelector(".form");
const input = document.querySelector(".form__textarea");
const copiar = document.querySelector(".copiar");

const encryptionMap = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
};

form.addEventListener("submit", transformText);
copiar.addEventListener("click", copiarTexto);
input.addEventListener("input", () => {
    if (document.querySelector(".message-output").textContent) {
        document.querySelector(".output-img").classList.remove("oculto");
        document.querySelector(".message").classList.remove("oculto");
        document.querySelector(".message-output").classList.add("oculto");
        document.querySelector(".message-output").textContent = "";
        document.querySelector(".copiar").classList.add("oculto");
    }
});

function transformText(e) {
    e.preventDefault();
    let text = input.value.trim();
    let regex = /[A-ZñÑáéíóúÁÉÍÓÚ]/;

    if (text === "") {
        showModal("El input no puede estar vacio");
        form.reset();
        return;
    }
    if (regex.test(text)) {
        showModal("El texto ingresado no puede contener mayusculas o acentos");
        return;
    }

    const clickedButtonId = e.submitter.id;

    if (clickedButtonId === "encrypt") {
        for (let letter in encryptionMap) {
            text = text.replace(new RegExp(letter, "g"), encryptionMap[letter]);
        }
    }
    if (clickedButtonId === "unencrypt") {
        for (let letter in encryptionMap) {
            text = text.replace(new RegExp(encryptionMap[letter], "g"), letter);
        }
    }
    document.querySelector(".output-img").classList.add("oculto");
    document.querySelector(".message").classList.add("oculto");
    document.querySelector(".message-output").classList.remove("oculto");
    document.querySelector(".message-output").textContent = text;
    document.querySelector(".copiar").classList.remove("oculto");
    form.reset();
}

function copiarTexto() {
    navigator.clipboard.writeText(
        document.querySelector(".message-output").textContent
    );
    document.querySelector(".copiar").textContent = "Texto copiado";
    setTimeout(() => {
        document.querySelector(".copiar").textContent = "Copiar";
    }, 1500);
}

function showModal(text) {
    document.querySelector(".modal ").classList.remove("ocultar");
    document.querySelector(".modal__mensaje").textContent = text;

    setTimeout(() => {
        document.querySelector(".modal ").classList.add("ocultar");
        document.querySelector(".modal__mensaje").textContent = "";
    }, 1500);
}
