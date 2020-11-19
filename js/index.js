let respostasCorretas = 0;

function iniciarQuiz(){
    let botaoIniciar = document.getElementById("iniciar");
    let quiz = document.getElementById("quiz");

    quiz.hidden = false;
    
    botaoIniciar.hidden = true;
    
    let perguntas = [];
    let respostas = [];


    listaPerguntas.forEach( perg => {

        pergunta = `<h2>${perg.pergunta}</h2>`;

        perg.respostas.forEach( resp => {

            resposta = `<span title="${perg.id}" id="${resp.id}">
                <input onclick="checaResposta(event)" type="radio" id="${resp.id}" name="${perg.id}">
                ${resp.resposta}</span>`;

            respostas.push(resposta);

        })
        

        perguntas.push(`${pergunta} ${respostas.join(" ")}`);
        respostas = [];
    })

    quiz.innerHTML = `<h3>Quiz</h3>${perguntas.join(" ")}`;
}

function checaResposta(event) {
    let labels = document.querySelectorAll('span');

    listaPerguntas.forEach( perg => {
        if(perg.id == event.srcElement.name){
            perg.respostas.forEach( resp => {
                if(resp.id === event.srcElement.id){
                    
                    labels.forEach( label => {
                        if(label.title == perg.id && label.id === resp.id && resp.correta){
                            disableInput(label.title)
                            respostasCorretas++;
                            //console.log("Resposta Correta");
                            label.style.color = "#00ff00"
                        }else{
                            if(label.title == perg.id){
                                disableInput(label.title)
                              //  console.log("Resposta Incorreta");
                                label.style.color = "#ff0000"                      
                            }

                        }
                    })

                    todasRespondidas();
                }
            })
        }
    })
}

function disableInput(id){
    let inputs = document.querySelectorAll('input');

    inputs.forEach( input => {
        if(input.name == id){
            input.disabled = true;
        }
    })
}

function todasRespondidas(){
    let inputs = document.querySelectorAll('input');
    let inputsDesabilitados = 0;

    inputs.forEach( input => {
        if(input.disabled){
            inputsDesabilitados++;
        }
    })

    if(inputs.length === inputsDesabilitados){
        resultado()
    }
}


function resultado(){
    let quiz = document.getElementById("quiz");
    let nota = respostasCorretas / listaPerguntas.length * 100;

    quiz.innerHTML = `Seu resultado é: <h1>${nota}</h1>`;

    if(nota >= 7){
        document.querySelectorAll('h1').style.color = '#00ff00';
    }else{
        document.querySelectorAll('h1').style.color = '#ff0000'
    }
    
}