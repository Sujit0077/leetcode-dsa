# Move Zeroes to End

## Problem Statement

Given an array `nums`, move all zeroes to the end while maintaining the relative order of non-zero elements.

Do it in-place.

### Example

```text
Input  : nums = [0, 1, 0, 3, 12]
Output : [1, 3, 12, 0, 0]
```

---

# Approach 1 - Temp Array (JavaScript)

## Idea

Create a temporary array filled with zeros.

Copy all non-zero elements from `nums` into the temp array in order.

Copy the temp array back into `nums`.

Zeros are already at the end because the temp array was initialized with zeros.

---

## Code

```javascript
let moveZeroes = function(nums) {
    let temp = new Array(nums.length).fill(0);
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            temp[index] = nums[i];
            index++;
        }
    }
    for (let i = 0; i < nums.length; i++) {
        nums[i] = temp[i];
    }
    return nums;
};
```

---

## Dry Run

```text
nums = [0, 1, 0, 3, 12]

temp  = [0, 0, 0, 0, 0]
index = 0
```

Phase 1 - Copy non-zero elements into temp

| i | nums[i] | nums[i] !== 0 | Action           | index |
|---|---------|----------------|------------------|-------|
| 0 | 0       | ❌              | skip             | 0     |
| 1 | 1       | ✅              | temp[0] = 1      | 1     |
| 2 | 0       | ❌              | skip             | 1     |
| 3 | 3       | ✅              | temp[1] = 3      | 2     |
| 4 | 12      | ✅              | temp[2] = 12     | 3     |

temp after Phase 1

```text
[1, 3, 12, 0, 0]
```

Phase 2 - Copy temp back into nums

```text
nums = [1, 3, 12, 0, 0]
```

Return

```text
[1, 3, 12, 0, 0]
```

---

## Complexity

```text
Time  : O(n)
Space : O(n)
```

---

# Approach 2 - Two Pointers / Optimal (JavaScript)

## Idea

Find the first zero using pointer `j`.

Then scan ahead with pointer `i`.

Whenever a non-zero element is found at `i`, swap it with `j`.

Advance `j` after every swap.

This pushes non-zero elements to the front and zeros to the back in-place.

---

## Code

```javascript
let moveZeroes = function(nums) {
    let j = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            j = i;
            break;
        }
    }
    if (j === -1) return;
    for (let i = j + 1; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }
    return nums;
};
```

---

## Dry Run

```text
nums = [0, 1, 0, 3, 12]
```

Phase 1 - Find first zero

```text
nums[0] = 0 → j = 0, break
```

Phase 2 - Swap non-zero elements with j

```text
i starts at j + 1 = 1
```

| i | nums[i] | nums[i] !== 0 | Swap             | nums                  | j |
|---|---------|----------------|------------------|-----------------------|---|
| 1 | 1       | ✅              | swap(1, 0)       | [1, 0, 0, 3, 12]      | 1 |
| 2 | 0       | ❌              | skip             | [1, 0, 0, 3, 12]      | 1 |
| 3 | 3       | ✅              | swap(3, 1)       | [1, 3, 0, 0, 12]      | 2 |
| 4 | 12      | ✅              | swap(12, 2)      | [1, 3, 12, 0, 0]      | 3 |

Return

```text
[1, 3, 12, 0, 0]
```

---

## What if there are no zeros?

```text
nums = [1, 2, 3]
```

Phase 1 - No zero found, j stays -1.

```javascript
if (j === -1) return;
```

Return early. Array is already correct.

---

## Complexity

```text
Time  : O(n)
Space : O(1)
```

---

# Comparison

| Feature | Temp Array | Two Pointers |
|---------|-----------|--------------|
| Time Complexity | O(n) | O(n) |
| Space Complexity | O(n) | O(1) |
| In-Place | ❌ | ✅ |
| Preferred in Interviews | ❌ | ✅ |

---

# Key Idea

### Temp Array

Fill a new array with zeros, copy non-zero elements in order, copy back.

Simple but uses extra space.

### Two Pointers

`j` always points to the leftmost zero.

`i` scans for the next non-zero element.

Swapping brings non-zero elements forward and pushes zeros back without any extra memory.
