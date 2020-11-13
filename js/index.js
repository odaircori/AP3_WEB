function iniciarQuiz(){
    botaoIniciar = document.getElementById("iniciar");
    quiz = document.getElementById("quiz");
    
    botaoIniciar.hidden = "true";
    
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

    quiz.innerHTML = perguntas.join(" ");
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
                            console.log("Resposta Correta");
                            label.style.color = "#00ff00"
                        }else{
                            if(label.title == perg.id){
                                disableInput(label.title)
                                console.log("Resposta Incorreta");
                                label.style.color = "#ff0000"                      
                            }

                        }
                    })
                }
            })
        }
    })
}

function disableInput(id){
    inputs = document.querySelectorAll('input');

    inputs.forEach( input => {
        console.log(input);
        if(input.name == id){
            input.disabled = true;
        }
    })
}