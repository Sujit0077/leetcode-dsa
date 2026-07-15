class Solution {
    largestElement(nums) {
        let largest=nums[0]
        for (let i=1;i< nums.length;i++){
            if(nums[i] > largest){
                largest= nums[i]
            }
        }
        return largest
    }
}

const solution = new Solution();
let arr = [3, 5, 7, 2, 8];
console.log(solution.largestElement(arr));