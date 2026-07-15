class Solution {
    secondLargestElement(nums) {
        let largest=nums[0];
        let slargest=-1
        for(let i=1;i<nums.length;i++){
            if(nums[i]>largest){
                slargest=largest
                largest=nums[i]
            }else if(nums[i]<largest && nums[i]>slargest){
                slargest=nums[i]
            }
        }
        return slargest

    }
}
const solution = new Solution();
const nums = [3, 2, 1, 4, 5];
const result = solution.secondLargestElement(nums);
console.log(result); // Output: 4