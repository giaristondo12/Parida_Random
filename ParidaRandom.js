let num;
let message = document.querySelector("missatge");
let color = message.style.backgroundColor;
let endevinat;
let intents = document.querySelector("intents");
let numeroIntroduit = document.querySelector("numero_introduit");
let marcats = document.querySelectorAll(".marcats");

let numintents = 0;

const nouNum = () =>
{
    num = Math.floor(Math.random() * 100 + 1);
}

const actualitzarInfo = () =>
{
    let input = document.querySelector("#nom input").value;

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
            actualitzarInfo();
            endevinat = false;
            break;
        }
        case input < num:
        {
            message.textContent = "↑ Ha de ser més gran ↑";
            actualitzarInfo();
            endevinat = false;
            break;
        }
        case input == num:
        {
            message.textContent = "Has encertat! Era " + num;
            canviarColor("#3d33ff");
            actualitzarInfo();
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

const action = () =>
{
    if (endevinat)
    {
        nouNum();
        reset();
    }
    else
    {
        comprovarNum()
    }
    document.querySelector("input[type='number']").focus();
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
}

window.onkeydown = (event) => {
    switch (event.key) {
        case "Enter":
            action();
            break;
    }
}

for (let i = 0; i < marcats.length; i++)
{
    marcats[i].addEventListener('mousedown', (event) => {
        if (event.button === 0) {
            comprovarNum(i+1)
        }
    });
}