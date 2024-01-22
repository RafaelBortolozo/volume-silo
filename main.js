function volumeSiloVertical() {
    let inferior_largura_bocal = parseFloat(document.getElementById('inferior-largura-bocal').value) || 0;
    let inferior_largura_bocal_opcao = document.getElementById('inferior-largura-bocal-opcao').value;
    let inferior_geratriz = parseFloat(document.getElementById('inferior-geratriz').value) || 0;
    let centro_altura = parseFloat(document.getElementById('centro-altura').value) || 0;
    let centro_largura = parseFloat(document.getElementById('centro-largura').value) || 0;
    let centro_largura_opcao = document.getElementById('centro-largura-opcao').value;
    let superior_largura_bocal = parseFloat(document.getElementById('superior-largura-bocal').value) || 0;
    let superior_largura_bocal_opcao = document.getElementById('superior-largura-bocal-opcao').value;
    let superior_geratriz = parseFloat(document.getElementById('superior-geratriz').value) || 0;

    let disabledInferior = document.getElementById('checkbox-inferior').checked;
    let disabledSuperior = document.getElementById('checkbox-superior').checked;

    inferior_largura_bocal = convertToRaio(inferior_largura_bocal, inferior_largura_bocal_opcao);
    centro_largura = convertToRaio(centro_largura, centro_largura_opcao);
    superior_largura_bocal = convertToRaio(superior_largura_bocal, superior_largura_bocal_opcao);

    let inferior = !disabledInferior ? volumeTroncoCone(inferior_geratriz, centro_largura, inferior_largura_bocal) : 0;
    let centro = volumeCilindro(centro_largura, centro_altura);
    let superior = !disabledSuperior ? volumeTroncoCone(superior_geratriz, centro_largura, superior_largura_bocal) : 0;

    let result = ((inferior + centro + superior) / Math.pow(100, 3));
    result = result.toFixed(2);
    result = result.replace('.', ',')
    setResultado(`Volume: ${result} m³`)
}

function volumeSiloTrincheira() {
    let altura = parseFloat(document.getElementById('altura').value);
    let comprimento = parseFloat(document.getElementById('comprimento').value);
    let largura_maior = parseFloat(document.getElementById('largura-maior').value);
    let largura_menor = parseFloat(document.getElementById('largura-menor').value);

    let area = (((largura_maior+largura_menor)/2)*altura)*comprimento;
    let result = area / Math.pow(100, 3)
    result = result.toFixed(2);
    result = result.replace('.', ',')
    setResultado(`Volume: ${result} m³`)
}

function convertToRaio(value, actualUnit) {
    switch (actualUnit) {
        case "raio":
            return value;
        case "diametro":
            return value / 2;
        case "circunferencia":
            return value / (2 * Math.PI);
        default:
            return value;
    }
}

function volumeTroncoCone(geratriz, raioMaior, raioMenor) {
    // Utilizando a fórmula do volume do tronco de cone
    let value = (1 / 3) * Math.PI * geratriz * (Math.pow(raioMaior, 2) + Math.pow(raioMenor, 2) + raioMaior * raioMenor)
    return value;
}

function volumeCilindro(raio, altura) {
    // Utilizando a fórmula do volume do cilindro
    let value = Math.PI * Math.pow(raio, 2) * altura;
    return value;
}

function setResultado(result) {
    document.getElementById("resultado").innerHTML = result;
}

function clearResultado() {
    document.getElementById("resultado").innerHTML = '';
}

function changeForm() {
    let value = document.getElementById('modelo-silo').value;
    let form = document.getElementById("form-selected")
    if (value) {
        let path = `./forms/${value}.html`
        fetch(path)
            .then(response => response.text())
            .then(data => {
                form.innerHTML = data;
            })
    }
}

function disableEnableFields(checkbox, fields) {
    let state = document.getElementById(checkbox).checked;
    for(let i of fields) {
        let element = document.getElementById(i);
        element.disabled = state ? true : false;
    }
}