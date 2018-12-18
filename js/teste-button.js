"use strict"

//Função que recebe os prototypes
var ObjBodeButton = function() {}; 

//Constroi o componente
ObjBodeButton.prototype.create = function(obj) { 
    obj.classList.add('teste-button');

    obj.addEventListener('click', () => alert('Você me clicou!!!'));

    var btn = document.createElement('button');
    btn.classList.add('teste-button-btn');
    btn.innerHTML = "BOTÃO";

    if (obj.getAttribute('bg-color')) {
        btn.style.background = obj.getAttribute('bg-color');
    } else {
        btn.style.background = '#ccc';
    }   
    
    obj.appendChild(btn);

    btn = null;
}

//Aqui são feitas as tratativas para quando for alterado algum atributo do componente
//Parametros são respectivamente: obj (representa o elemento pai/componente), nome do atributo alterado, valor antigo e valor novo
ObjBodeButton.prototype.attributeChanged = function(obj, attrName, oldVal, newVal) {

    //Exemplo: Trocando a cor de fundo
    if (attrName == 'bg-color') {
        obj.querySelector('.teste-button-btn').style.background = newVal;
    }

}

//Aqui é guardado na variável todo o prototype de um elemento div (ele é a base do componente)
var BodeButton = Object.create(HTMLDivElement.prototype);

//Aqui é o callback chamado para criar o componente
BodeButton.createdCallback = function() {
    if (!this.classList.contains("teste-button")) {
        var objBodeButton = new ObjBodeButton();
        objBodeButton.create(this);
        objBodeButton = null;
    }
};

//Aqui pode ser definido um callback para quando o componente for inserido na pagina
BodeButton.attachedCallback = function() {
    console.log(this);
};

//Aqui pode ser definido um callback para quando o componente for retirado na pagina
BodeButton.detachedCallback = function() {

};

//Aqui dispara a função para a troca de atributos
BodeButton.attributeChangedCallback = function(attrName, oldVal, newVal) {
    var objBodeButton = new ObjBodeButton();
    objBodeButton.attributeChanged(this, attrName, oldVal, newVal);
    objBodeButton = null;
};

//Aqui registr-se o componente e ele recebe o prototype de div que foi guardado na variável
document.registerElement("teste-button", {
    prototype: BodeButton
});
