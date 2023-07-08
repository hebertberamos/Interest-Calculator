import InputsConstructor from '../models/inputs-constructor.js';
import * as calcController from './calc-controller.js';


function State() {

    this.inputsConstructor = new InputsConstructor();

    this.simpleInterest = null;
    this.compoundInterest = null;
    this.interestTypeSimple = null;
    this.interestTypeCompound = null;

    this.inputAmount = null;
    this.inputInterestRate = null;
    this.inputTime = null;

    this.result = null;
    this.interestIncome = null;

    this.btnCalc = null;
}

const state = new State();


export function init(){


    state.simpleInterest = document.getElementById("simple-interest");
    state.compoundInterest = document.getElementById("compound-interest");
    state.interestTypeSimple = document.getElementById("interest-type-simple");
    state.interestTypeCompound = document.getElementById("interest-type-compound");
    state.inputAmount = document.getElementById("amount");
    state.inputInterestRate = document.getElementById("interest-rate");
    state.inputTime = document.getElementById("time");
    state.interestIncome = document.getElementById("interest-income");
    state.result = document.getElementById("result");
    state.btnCalc = document.getElementById("btnCalc");


    state.simpleInterest.addEventListener('click', (event) => {
        interestType = 1;
        removeClassTwoInputRadio();
    });

    state.compoundInterest.addEventListener('click', (event) => {
        interestType = 2;
        removeClassTwoInputRadio();
    });


    //Pegando informações dos inputs

    state.inputAmount.addEventListener('change', (event) => {
        state.inputsConstructor.amount = event.target.value;
    });

    state.inputInterestRate.addEventListener("change", (event) => {
        state.inputsConstructor.interestRate = event.target.value;
    });

    state.inputTime.addEventListener("change", (event) => {
        state.inputsConstructor.time = event.target.value;
    });


    // Funcionalidade do botão de calcular

    state.btnCalc.addEventListener('click', (event) => {
        event.preventDefault();
        verifySelectedInterestType();

        if(!interestType == 1 || !interestType == 2){
            changeClassInputRadio('#interest-type-simple', 'uninformed');
            changeClassInputRadio('#interest-type-compound', 'uninformed');
        }
        else{
            //  VERIFICAÇÃO DOS INPUTS E SEUS VALORES
            if(state.inputAmount.value == "" || state.inputInterestRate.value == "" || state.inputTime.value == ""){
                    var inputs = document.querySelectorAll(".enter-input");

                    //  CASO OS VALORES ESTEJAM VAZIOS OS VALORES CONTINUARAM COMO ZERO

                    //  CAPTURA DOS INPUTS QUE ESTÃO VAZIOS
                    inputs.forEach((input) => {
                        if(input.value == ""){
                            input.classList.add('uninformed');
                            var parent = input.parentElement;
                            
                            // CAPTURANDO ELEMENTO DO P DA DIV FILHA DO INPUT QUE ESTÁ VAZIO
                            var paragraph = parent.querySelector(".error-paragraph");

                            //  REMOVENDO A CLASSE 'HIDE' DO PARAGRAFO
                            paragraph.classList.remove('hide');
                            
                            //  VERIFICANDO MUDANÇA NOS INPUTS
                            input.addEventListener('change', () => {
                                if(input.classList.contains('uninformed')){
                                    input.classList.remove('uninformed');
                                    paragraph.classList.add('hide');
                                } else {
                                    input.classList.add('uninformed');
                                    paragraph.classList.remove('hide');
                                }
                            });
                        }   
                    });
            }
        }
    });

    
    // Funções secundárias
    
    let interestType = "";    
    function verifySelectedInterestType(){
        const amountNumber = +state.inputsConstructor.amount;
        const interestRateNumber = +state.inputsConstructor.interestRate;
        const timeNumber = +state.inputsConstructor.time;
        switch(interestType){
            case 1: 
                const resultSimple = calcController.simpleInteresCalc(amountNumber, interestRateNumber, timeNumber);
                const resultSimpleFormated = formatingValue(resultSimple);
                state.result.innerText = resultSimpleFormated;
                const resultSimpleNumber = +resultSimple;
                const resultInterestIncome = resultSimpleNumber - amountNumber;
                const resultInterestIncomeFormated = formatingValue(resultInterestIncome)
                state.interestIncome.innerText = resultInterestIncomeFormated;
                break;
            case 2:
                const resultCompound = calcController.compoundInterestCalc(amountNumber, interestRateNumber, timeNumber);
                const resultCompoundFormated = formatingValue(resultCompound);
                state.result.innerText = resultCompoundFormated;
                const resultCompoundNumber = +resultCompound;
                const resultInterestIncomeCompound = resultCompoundNumber - amountNumber;
                const resultInterestIncomeCompoundFormated = formatingValue(resultInterestIncomeCompound);
                state.interestIncome.innerText = resultInterestIncomeCompoundFormated;
                break;
            default:
                return;
        }
    }


    function formatingValue(value){
        return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }

    function changeClassInputRadio(key, valueClass){
        const element = document.querySelector(`${key}`);
        element.classList.add(valueClass);
    }

    function removeClassInputRadio(key, valueClass){
        const element = document.querySelector(`${key}`);
        element.classList.remove(valueClass);
    }

    function removeClassTwoInputRadio(){
        removeClassInputRadio('#interest-type-simple', 'uninformed');
        removeClassInputRadio('#interest-type-compound', 'uninformed');
    }
}