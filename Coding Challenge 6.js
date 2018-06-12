// Question 1
const inputArray = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];
//desired output
const desiredOutput = [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]; 
//bonus, strings get organized differntly than numbers
const bonusArray = [1, "2", "3", 2];
const tartgetOutput = [[1,2], ["2", "3"]];

const cleanRoomFunction = (inputArray) => {
    //splits elements into 2 arrays based on their data type
    let intArray = inputArray.filter(elem => typeof(elem) === 'number');
    let strArray = inputArray.filter(elem => typeof(elem) === 'string');
    //sorts the given array into ascending order
    let sortedIntArray = intArray.sort((a,b) => a - b);
    let sortedStrArray = strArray.sort((a,b) => a - b); 
    let result = [];
    if (sortedIntArray.length) {
        result.push(groupOccurences(sortedIntArray));
    }
    if (sortedStrArray.length) {
        result.push(groupOccurences(sortedStrArray));
    }
    return result;
}

const groupOccurences = (sortedArray) => {
    //count the occurrences of the element
    let hashMap = {}; 
    for (let i=0; i < sortedArray.length; i++) {
        let num = sortedArray[i];
        hashMap[num] = hashMap[num] ? hashMap[num] + 1 : 1;
    }
    //group all the multiple occurences into a separate list
    let groupedArray = [];
    for (let key in hashMap) {
        let tempArray = [];
        //appends the mulitple occurences
        if (hashMap[key] > 1) {
            for (let i=0;i < hashMap[key]; i++ ) {
                (typeof(sortedArray[i]) === 'number') 
                ? tempArray.push(parseInt(key))
                : tempArray.push(key);  
            }
        }
        //appends the single occurences
        else if (hashMap[key] === 1){
            (typeof(sortedArray[0]) === 'number') 
            ? groupedArray.push(parseInt(key))
            : groupedArray.push(key);
        }
        //only add the tempArray is it has something
        if (tempArray.length) {
            groupedArray.push(tempArray);
        }
    }
    return groupedArray;
}

console.log(cleanRoomFunction(inputArray));
console.log('bonus',cleanRoomFunction(bonusArray))
const test1Array = [10,10,9,8,7,5,5,5,5,2,3,1,1];
const test2Array = [10,10,9,8,7,5,5,5,5,2,3,1,1,'5','1','2','3','4','6','9'];
const test3Array = ['10','10','9','8','7','5','5','5','5','2','3','1','1'];
console.log('test1Array', cleanRoomFunction(test1Array));
console.log('test2Array', cleanRoomFunction(test2Array));
console.log('test3Array', cleanRoomFunction(test3Array));

// Question 2
// answer([1,2,3], 4) should return [1,3]

const findTerms = (arr, sum) => {
    //start the list with one elem
    //find the differnce with the sum
    //find that difference in the given arr
    let result = []; 
    let hashTable = {};
    for (let i=0;i < arr.length; i++) {
        let difference = sum - arr[i];
        if (hashTable[arr[i]]) {
            result.push(arr[i], difference);
        }
        hashTable[difference] = difference;
    }
    return result;
}

console.log(findTerms([1,2,3], 4)); //[1,3]
console.log(findTerms([1,2,3], 6)); //[]
console.log(findTerms([1,3,3], 6)); //[3,3]
console.log(findTerms([1,2,3,5,6,4,5], 10)); //[5,5,6,4]

// Question 3
// Write a function that converts HEX to RGB. 
// Then Make that function autodect the formats 
// so that if you enter HEX color format it returns 
// RGB and if you enter RGB color format it returns HEX. 
// Bonus: Release this tool as a npm package.

// HEX = #FF0000
// RGB = rgb(255, 0, 0)

const rgbToHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}

console.log(rgbToHex(80)) //50 
console.log(rgbToHex(123)); //7b

const hexToRgb = (rgbInput) => {
    rgbDict = {'A': 10,'B':11,'C':12,'D':13,'E':14,'F':15}
    firstDigit = rgbInput[0].toUpperCase();
    secondDigit = rgbInput[1].toUpperCase();
    rgbDict[firstDigit]
        ? convertedFirstDigit = rgbDict[firstDigit]
        : convertedFirstDigit = rgbInput[0];
    rgbDict[secondDigit]
        ? convertedSecondDigit = rgbDict[secondDigit]
        : convertedSecondDigit = rgbInput[1];
    return parseInt(convertedFirstDigit) * 16 + parseInt(convertedSecondDigit);
    
}

const ColorCodeConversion = (colorCode) => {
    // detect what kind of color it is
    // proceed to convert and return value 

    //rgbToHex 
    if (colorCode.charAt(0) === '(' && colorCode.slice(-1) === ')') {
        let rgb = colorCode.slice(1,-1);
        rgb = rgb.split(',');
        let hex = '#';
        for (let i=0;i < rgb.length; i++) {
            hex += rgbToHex(rgb[i]);
        }
        // return hex;
    }
    else if (colorCode.charAt(0) === '#') {
        let hex = colorCode.slice(1);
        let r = hexToRgb(hex.slice(0,2));
        let g = hexToRgb(hex.slice(2,4));
        let b = hexToRgb(hex.slice(4,6));
        return '(' + r + ',' + g + ',' + b + ')'
    }
}

// rgb to hex test cases
console.log(ColorCodeConversion('(192,192,192)')); 
console.log(ColorCodeConversion('(255,0,0)')); 
console.log(ColorCodeConversion('(255,255,0)')); 
console.log(ColorCodeConversion('(128,0,0)')); 
console.log(ColorCodeConversion('(192,192,192)'));

// hex to rgb 
console.log(ColorCodeConversion('#FF5733'));
console.log(ColorCodeConversion('#2874A6'));
console.log(ColorCodeConversion('#1ABC9C'));
console.log(ColorCodeConversion('#F5B041'));

