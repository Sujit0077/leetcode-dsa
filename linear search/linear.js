class Solution {
    linearSearch(nums, target) {
        // Your code goes here


        for (let i=0;i<nums.length;i++){
            if(nums[i]===target){
                return i
            }

        }
        return -1
    }
}

const solution = new Solution();
const nums = [1, 2, 3, 4, 5];
const target = 3;
const result = solution.linearSearch(nums, target);
console.log(result); // Output: 2