let removeDuplicates = function(nums) {
     let unique = [...new Set(nums)];

    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }

    return [unique.length, nums, unique];
};

let nums = [1, 1, 2, 2, 3, 4, 4, 5];
let [length, numscopy, unique] = removeDuplicates(nums);
console.log(length);
console.log(numscopy);
console.log(unique);