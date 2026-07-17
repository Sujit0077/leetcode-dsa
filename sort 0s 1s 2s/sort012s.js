let sortColors = function(nums) {
    let cnt0=0
    let cnt1=0
    let cnt2=0

    for(let i=0;i<nums.length;i++){
        if(nums[i]===0){
            cnt0+=1
        }else if(nums[i]===1){
            cnt1+=1
        }else{
            cnt2+=1
        }
    }
    for(let i=0;i<cnt0;i++){
        nums[i]=0
    }
    for(let i=cnt0;i<cnt0+cnt1;i++){
        nums[i]=1
    }
    for(let i=cnt0+cnt1;i<nums.length;i++){
        nums[i]=2
    }
    return nums
};

let nums = [2,0,2,1,1,0]
console.log(sortColors(nums))