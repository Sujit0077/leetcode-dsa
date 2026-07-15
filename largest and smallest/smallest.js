class Solution {
    smallestElement(nums) {
        let smallest=nums[0]
        for (let i=1;i< nums.length;i++){
            if(nums[i] < smallest){
                smallest= nums[i]
            }
        }
        return smallest
    }
}

const solution = new Solution();
let arr = [3, 5, 7, 2, 8];
console.log(solution.smallestElement(arr));