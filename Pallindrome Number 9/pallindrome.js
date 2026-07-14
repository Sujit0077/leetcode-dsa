var isPalindrome = function(x) {
    if (x < 0) return false;

    const original = x;
    let reverse = 0;

    while (x !== 0) {
        const digit = x % 10;

        reverse = reverse * 10 + digit;

        x = Math.floor(x / 10);
    }

    return original === reverse;
};

console.log(isPalindrome(121)); // Output: true
console.log(isPalindrome(-121)); // Output: false
console.log(isPalindrome(10)); // Output: false