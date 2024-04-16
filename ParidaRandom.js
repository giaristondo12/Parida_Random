let num; // número aleatori a endevinar
let message = document.querySelector("missatge");
let color = "#93b247";
let endevinat;
let intents = document.querySelector("intents");
let numeroIntroduit = document.querySelector("numero_introduit");
let marcats = document.querySelectorAll("#marcador > div");

let menu = document.getElementById("menu");
let zonaJoc = document.getElementById("zonaJoc");
let menuDif = document.getElementById("menuDificultats");

let totalCaselles;

let numintents = 0;

const botoDificultat = (files, columnes) =>
{
    let texte = document.querySelector("texte");

    totalCaselles = files * columnes;
    nouNum(totalCaselles);
    generarTaulell(totalCaselles);
    goZonaJoc();
    setCSS(files, columnes);

    texte.textContent = "Introdueix un número entre 0 i " + totalCaselles + ":";
}

const generarTaulell = (caselles) =>
{
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
}

const nouNum = (total) =>
{
    num = Math.floor(Math.random() * total + 1);
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
        case input < 1 || input > totalCaselles:
        {
            numeroIntroduit.textContent = "Ha de ser entre 0 i " + totalCaselles + "!";
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
            let colorMajorMenor;
            let colorMessage;
            if (input < num)
            {
                colorMajorMenor = "#ffe100";
                colorMessage = "#dcc411";
            }
            else
            {
                colorMajorMenor = "#00d0ff";
                colorMessage = "#28b2d0";
            }
            canviarColor(colorMessage);
            setTimeout(function() { canviarColor(color) }, 750);
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
    menu.style.display = "none";
    menuDif.style.display = "none";
    zonaJoc.style.display = "flex";
}

const goMenuDif = () =>
{
    menuDif.style.display = "flex";
    menu.style.display = "none";
    zonaJoc.style.display = "none";
    amagarInput();
}

const goMenu = () =>
{
    menu.style.display = "flex";
    menuDif.style.display = "none";
    zonaJoc.style.display = "none";
    reset();
}

const setCSS = (files, columnes) =>
{
    let marcador = document.getElementById("marcador");

    marcador.style.gridTemplateColumns = "repeat(" + columnes + ", 30px)";
    marcador.style.gridTemplateRows = "repeat(" + files + ", 30px)";
    marcador.style.width = columnes / 10 * 300 + "px";
    marcador.style.height = files / 10 * 300 + "px";
}

const action = (a) =>
{
    if (endevinat)
    {
        nouNum(totalCaselles);
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

const reiniciar = () =>
{
    reset();
    nouNum(totalCaselles);
}

const reset = () =>
{
    let marcats = document.querySelectorAll(".marcats");

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

const seleccionarDif = () =>
{
    let files = document.getElementById("inputFiles").value;
    let columnes = document.getElementById("inputColumnes").value;

    document.getElementById("inputFiles").value = "";
    document.getElementById("inputColumnes").value = "";

    files = Math.round(files);
    columnes = Math.round(columnes);

    if (files !== "" && columnes !== "" && files >= 5 && columnes >= 5 && files <= 35 && columnes <= 35)
        botoDificultat(files, columnes);
    else
    {
        let titol = document.querySelector("#contingutDificultats > titol");
        titol.textContent = "Entre 5 i 35";
        setTimeout(function() { titol.textContent = "Tria la\ndificultat" }, 2000);
    }
}

let botons = document.getElementById("botonsDif");
let inputs = document.getElementById("inputsDif");

const mostrarInput = () =>
{
    botons.style.display = "none";
    inputs.style.display = "unset";
}

const amagarInput = () =>
{
    botons.style.display = "unset";
    inputs.style.display = "none";
}
