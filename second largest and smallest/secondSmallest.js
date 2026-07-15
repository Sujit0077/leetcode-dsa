class Solution{
    secondSmallest(nums){
        let smallest=nums[0]
        let ssmallest=Infinity
        for (let i=1; i<nums.length; i++){
            if(nums[i]<smallest){
                ssmallest=smallest
                smallest=nums[i]
            }else if(nums[i]!=smallest && nums[i]<ssmallest){
                ssmallest=nums[i]
            }
        }
        return ssmallest
    }
}
const solution = new Solution();
const nums=[3,2,1,4,5]
const result = solution.secondSmallest(nums);
console.log(result); // Output: 2