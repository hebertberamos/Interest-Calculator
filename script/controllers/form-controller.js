import InputsConstructor from '../models/inputs-constructor.js';
import * as calcController from './calc-controller.js';

// TENTAR PASSAR O VALOR DO RESULTADO NO BOTÃO DE CALCULAR PARA DENTRO DO VIZUALIZADOR DE RESPOSTA

function State() {

    this.inputsConstructor = new InputsConstructor();

    this.simpleInterest = null;
    this.compoundInterest = null;

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
    state.inputAmount = document.getElementById("amount");
    state.inputInterestRate = document.getElementById("interest-rate");
    state.inputTime = document.getElementById("time");
    state.interestIncome = document.getElementById("interest-income");
    state.result = document.getElementById("result");
    state.btnCalc = document.getElementById("btnCalc");


    state.simpleInterest.addEventListener('click', (event) => {
        interestType = 1;
    });

    state.compoundInterest.addEventListener('click', (event) => {
        interestType = 2;
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
    });

    
    // Funções secundárias
    
    let interestType = "";    
    function verifySelectedInterestType(){
        const amountNumber = +state.inputsConstructor.amount;
        const interestRateNumber = +state.inputsConstructor.interestRate;
        const timeNumber = +state.inputsConstructor.time;
        switch(interestType){
            case 1: 
                console.log("simplificado");
                const resultSimple = calcController.simpleInteresCalc(amountNumber, interestRateNumber, timeNumber);
                const resultSimpleFormated = formatingValue(resultSimple);
                state.result.innerText = resultSimpleFormated;
                const resultSimpleNumber = +resultSimple;
                const resultInterestIncome = resultSimpleNumber - amountNumber;
                const resultInterestIncomeFormated = formatingValue(resultInterestIncome)
                state.interestIncome.innerText = resultInterestIncomeFormated;
                break;
            case 2:
                console.log("composto");
                
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

}