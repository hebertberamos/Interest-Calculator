export function simpleInteresCalc(amount, tax, time){
    const taxRedefined = tax / 100;
    const interestAmount = amount * taxRedefined * time;
    const result = amount + interestAmount;
    return result;
}

export function compoundInterestCalc(amount, tax, time){
    const taxRedefined = tax / 100;
    const firstTimeCalc = Math.pow(1+taxRedefined, time); 
    const secundTimeCalc = amount * firstTimeCalc;
    const result = amount + secundTimeCalc; 
    return result;
}