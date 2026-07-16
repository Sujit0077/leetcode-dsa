let moveZeroes = function(nums) {
    let temp=new Array(nums.length).fill(0)
    let index =0
    for (let i=0;i<nums.length;i++){
        if(nums[i]!==0){
            temp[index]=nums[i]
            index++
        }
    }
    for(let i=0;i<nums.length;i++){
        nums[i]=temp[i]
    }
    return nums
};

let nums = [0,1,0,3,12]
console.log(moveZeroes(nums))