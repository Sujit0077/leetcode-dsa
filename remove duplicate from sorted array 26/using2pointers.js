let removeDuplicates = function(nums) {
    let i=0
    for (let j=1;j<nums.length;j++){
        if(nums[j]!==nums[i]){
            nums[i+1]=nums[j]
            i++
        }
    }
    return [i+1, nums]
};

let nums = [1, 1, 2, 2, 3, 4, 4, 5];
let [length, numscopy] = removeDuplicates(nums)
console.log(length)
console.log(numscopy)