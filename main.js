// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [1, 4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];
const iBatch = [invalid1, invalid2, invalid3, invalid4, invalid5];
const vBatch = [valid1, valid2, valid3, valid4, valid5];


//Takes an input, verifies if string. If so, converts to array and pushes to batch array. If array, just pushes to batch array.

const convertString = (input) => {

  if (typeof input === 'string') {

    stringToArray = input.split('');
    const newCardArray = stringToArray.map(Number);

    batch.push(newCardArray);
    return newCardArray;
  }

  batch.push(input);
  return input;
}

//enter input:
convertString(`1234567890987654`);


const somaTudo = (soma, currentValue, index, array) => {
  let sum = 0;
  if (array.length %2 === 0){
    sum =
    index %2 !==0 ?
    soma + currentValue :
    2*currentValue <= 9 ?
    soma + 2*currentValue :
    soma + 2*currentValue - 9;
  } else {
    sum =
    index %2 ===0 ?
    soma + currentValue :
    2*currentValue <= 9 ?
    soma + 2*currentValue :
    soma + 2*currentValue - 9;
  }
  // console.log(`length ${array.length} par? ${array.length %2 === 0} index: ${index}${index %2 !==0} soma ${soma} sum: ${sum} current value ${currentValue} <9 ${2*currentValue <=9}`);
  return sum;
}

// Checks individual Card Number Arrays:
const validateCred = (numArray) => {

  const sumAll = numArray.reduceRight(somaTudo);

  sumTimesNine = sumAll*9;

  const modulo = sumTimesNine%10;
  // console.log(`sumAll is ${sumAll}, multiSum is${sumTimesNine}, modulo is ${modulo}`);
  //Returns modulo of sum by 10. If true, card is invalid. If false, card is valid.
  return modulo;
}


//Analyses an array of arrays of Credit Card Numbers and - if invalid - saves to invalidBatch array. Returns invalidBatch.
const findInvalidCards = arrayBatch => invalidBatch = arrayBatch.filter(validateCred);

console.log(findInvalidCards(batch));


//Takes invalid Credit Card Numbers in invalidBatch and converts into valid numbers:

const convertToValid = (invalidCreditCardsArray, validateCred) => invalidCreditCardsArray.map(creditCard => {
    const modulo = validateCred(creditCard);
    return creditCard.splice(creditCard.length -1, 0, modulo, 0);
  })

const convertInvalid = (arrayInvalid) => {
  const newValid = [];
  for (let i = 0; i< arrayInvalid.length; i++) {
    newValid.push(arrayInvalid[i]);
      const modulo = validateCred(newValid[i]);

      newValid[i].splice(newValid[i].length -1, 0, modulo, 0);

      //console.log(`invalid ${arrayInvalid[i]} valid ${newValid[i]}`);
  }
return newValid;
}
//console.log(findInvalidCards(convertInvalid(findInvalidCards(iBatch))));
//console.log(findInvalidCards(convertInvalid(iBatch)));



//Takes an array of arrays of invalid Credit Card Numbers, finds and returns Card Provider based on the first digit.
const invalidCardCompanies = (arrayInvalid) => {
  const arrayCompanies = [];
  for (let i = 0; i< arrayInvalid.length; i++ ) {
    //console.log(arrayInvalid[i][0])

    if (!arrayCompanies.includes(`Amex`) && arrayInvalid[i][0] === 3) {
      arrayCompanies.push(`Amex`);
    } else if   (!arrayCompanies.includes(`Visa`) && arrayInvalid[i][0] === 4) {
      arrayCompanies.push(`Visa`);
    } else if (!arrayCompanies.includes(`Mastercard`) && arrayInvalid[i][0] === 5) {
      arrayCompanies.push(`Mastercard`);
    } else if (!arrayCompanies.includes(`Discover`) && arrayInvalid[i][0] === 6) {
      arrayCompanies.push(`Discover`);
    } else if (arrayInvalid[i][0] < 3 || arrayInvalid[i][0] > 6) {
      arrayCompanies.push(`Unknown Provider`);
    }
  }
  return arrayCompanies;
}
//Sets into motion:
console.log(invalidCardCompanies(findInvalidCards(batch)));
