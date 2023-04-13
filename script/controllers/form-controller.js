import inputContructor from '../constructors/inputs-constructor.js';


function State() {
    this.simpleInterest = null;
    this.compoundInterest = null;

    this.inputAmount = null;
    this.inputInterestRate = null;
    this.inputTime = null;

    this.btnCalc = null;
}

const state = new State();


export function init(){


    state.simpleInterest = document.getElementById("simple-interest");
    state.compoundInterest = document.getElementById("compound-interest");
    state.inputAmount = document.getElementById("amount");
    state.inputInterestRate = document.getElementById("interest-rate");
    state.inputTime = document.getElementById("time");
    state.btnCalc = document.getElementById("show-result");


    state.simpleInterest.addEventListener('click', (event) => {
        interestType = 1;
        verifySelectedInterestType();
    });

    state.compoundInterest.addEventListener('click', (event) => {
        interestType = 2;
        verifySelectedInterestType();
    });

    //Pegando informações dos inputs
    state.inputAmount.addEventListener('input', (event) => {
    });




    let interestType = "";    
    function verifySelectedInterestType(){
        switch(interestType){
            case 1: 
                console.log("simples");
                break;
            case 2:
                console.log("composto");
                break;
            default:
                return;
        }
    }




}