const reverseString = (str, reverse = '') => {
    return str.split("").reverse().join("");
}

const reverseStringLoop = (str, reversed = '') => {
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

const reverseStringRecursive = (str, reversed = '') => {
    if (str === '') {
        return '';
    } else {
        return reverseStringRecursive(str.substr(1)) + str.charAt(0);
    }
}

const reverseStringIterative = (str, reversed = '') => {
    for (let i = 0; i < str.length; i++) {
        reversed = str[i] + reversed;
    }
    return reversed;
}

const reverseStringForEach = (str, reversed = '') => {
    str.split('').forEach(function(char) {
        reversed = char + reversed;
    });
    return reversed;
}

const reverseStringMap = (str, reversed = '') => {
    return str.split('').map(function(char) {
        return char;
    }).reverse().join('');
}

const reverseStringReduce = (str, reversed = '') => {
    return str.split('').reduce(function(reversed, char) {
        return char + reversed;
    }, '');
}

const reverseStringFor = (str, reversed = '') => {
    for (let char of str) {
        reversed = char + reversed;
    }
    return reversed;
}


console.log(reverseString('Hello'));
console.log(reverseStringLoop('Hello'));
console.log(reverseStringRecursive('Hello'));
console.log(reverseStringIterative('Hello'));
console.log(reverseStringForEach('Hello'));
console.log(reverseStringMap('Hello'));
console.log(reverseStringReduce('Hello'));
console.log(reverseStringFor('Hello'));

