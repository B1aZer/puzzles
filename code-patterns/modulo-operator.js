// Wrong!
function isOdd(n) {
    return n % 2 === 1;
}
console.log(isOdd(-5)); // false

// Right
function isOdd(n) {
    return Math.abs(n % 2) === 1;
}
console.log(isOdd(-5)); // true
