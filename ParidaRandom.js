let num;
let message = document.querySelector("missatge");
let color = message.style.backgroundColor;
let endevinat;
let intents = document.querySelector("intents");
let numeroIntroduit = document.querySelector("numero_introduit");
let marcats = document.querySelectorAll("#marcador > div");

let numintents = 0;

const inici = () =>
{
    nouNum(100);
    generarTaulell(100);
}

const generarTaulell = (caselles) => {
    let marcador = document.querySelector("#marcador");
    marcador.innerHTML = "";
    for (let cas = 1; cas <= caselles; cas++) {
        const casella = document.createElement("div");
        casella.classList.add("marcats");
        let numero = cas;
        casella.textContent = numero;
        marcador.appendChild(casella);
        casella.addEventListener("click", (event) => { action(cas) });
    }
    marcats = document.querySelectorAll("#marcador > div");
}

const nouNum = (max) =>
{
    num = Math.floor(Math.random() * max + 1);
}

const actualitzarInfo = (input) =>
{
    intents.textContent = "Duus: " + ++numintents + " intents";
    numeroIntroduit.textContent = "Has intentat el " + input;
}

const comprovarNum = (introduit) =>
{
    let input = document.querySelector("#nom input").value;

    if (introduit) input = introduit;

    let correcte = true;

    numeroIntroduit.style.backgroundColor = "#eccd6c";
    numeroIntroduit.style.color = "#842";

    canviarColor("#ff9700");
    switch (true)
    {
        case input < 1 || input > 100:
        {
            numeroIntroduit.textContent = "Ha de ser entre 0 i 100!";
            numeroIntroduit.style.backgroundColor = "#ee4141";
            numeroIntroduit.style.color = "#f5d0ac";
            correcte = false;
            break;
        }
        case input > num:
        {
            message.textContent = "↓ Ha de ser més petit ↓";
            actualitzarInfo(input);
            endevinat = false;
            break;
        }
        case input < num:
        {
            message.textContent = "↑ Ha de ser més gran ↑";
            actualitzarInfo(input);
            endevinat = false;
            break;
        }
        case input == num:
        {
            message.textContent = "Has encertat! Era " + num;
            canviarColor("#3d33ff");
            actualitzarInfo(input);
            endevinat = true;
            break;
        }
        default:
        {
            message.textContent = "No ha anat bé";
        }
    }

    if (correcte)
    {

        if (!endevinat)
        {
            setTimeout(function() { canviarColor(color) }, 100);
            let colorMajorMenor;
            if (input < num) colorMajorMenor = "#ffe100";
            else colorMajorMenor = "#00d0ff";
            document.querySelector(".marcats:nth-of-type(" + (input) + ")").style.backgroundColor = colorMajorMenor;
        }
        else
        {
            document.querySelector(".marcats:nth-of-type(" + (input) + ")").style.backgroundColor = "#f33a1e";
            document.querySelector(".marcats:nth-of-type(" + (input) + ")").style.color = "#ffe1c2";
        }
    }
    else
    {
        setTimeout(function() { canviarColor(color) }, 100);
    }
    document.querySelector("#nom input").value = "";
    return false;
}

const canviarColor = (color) =>
{
    message.style.backgroundColor = color;
}

const goZonaJoc = () =>
{
    let menu = document.getElementById("menu");
    let zonaJoc = document.getElementById("zonaJoc");

    menu.style.display = "none";
    zonaJoc.style.display = "flex";
}
const goMenu = () =>
{
    let menu = document.getElementById("menu");
    let zonaJoc = document.getElementById("zonaJoc");

    menu.style.display = "flex";
    zonaJoc.style.display = "none";
    reset();
}

const action = (a) =>
{
    if (endevinat)
    {
        nouNum(100);
        reset();
        document.querySelector("input[type='number']").focus();
    }
    else
    {
        if(a)
        {
            comprovarNum(a)
        }
        else
        {
            comprovarNum();
            document.querySelector("input[type='number']").focus();
        }

    }
}

const reset = () =>
{
    numintents = 0;
    numeroIntroduit.textContent = "No has intentat cap número";
    intents.textContent = "Duus: " + numintents + " intents";
    endevinat = false;
    message.textContent = "Prova un número";
    canviarColor(color);
    marcats.forEach(function(marcats) {
        marcats.style.backgroundColor = "#a28459";
        marcats.style.color = "#524c42";
    })
    numeroIntroduit.style.backgroundColor = "#eccd6c";
    numeroIntroduit.style.color = "#842";
}

window.onkeydown = (event) => {
    switch (event.key) {
        case "Enter":
            action();
            break;
    }
}