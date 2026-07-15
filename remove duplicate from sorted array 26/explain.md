# LeetCode 26 - Remove Duplicates from Sorted Array

## Problem Statement

Given a sorted array `nums`, remove the duplicates in-place so each unique element appears only once.

Return the count of unique elements `k`.

The first `k` elements of `nums` must hold the unique values in order.

### Example

```text
Input  : nums = [1, 1, 2, 2, 3, 4, 4, 5]
Output : k = 5, nums = [1, 2, 3, 4, 5, ...]
```

---

# Approach 1 - Two Pointers (JavaScript)

## Idea

Use two pointers `i` and `j`.

`i` tracks the position of the last unique element.

`j` scans forward through the array.

Whenever `nums[j]` differs from `nums[i]`, write it to `nums[i+1]` and advance `i`.

---

## Code

```javascript
let removeDuplicates = function(nums) {
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            nums[i + 1] = nums[j];
            i++;
        }
    }
    return [i + 1, nums];
};
```

---

## Dry Run

```text
nums = [1, 1, 2, 2, 3, 4, 4, 5]

i = 0
```

| j | nums[j] | nums[i] | nums[j] !== nums[i] | Action           | i |
|---|---------|---------|----------------------|------------------|---|
| 1 | 1       | 1       | ❌                   | skip             | 0 |
| 2 | 2       | 1       | ✅                   | nums[1] = 2, i++ | 1 |
| 3 | 2       | 2       | ❌                   | skip             | 1 |
| 4 | 3       | 2       | ✅                   | nums[2] = 3, i++ | 2 |
| 5 | 4       | 3       | ✅                   | nums[3] = 4, i++ | 3 |
| 6 | 4       | 4       | ❌                   | skip             | 3 |
| 7 | 5       | 4       | ✅                   | nums[4] = 5, i++ | 4 |

Return

```text
k = i + 1 = 5

nums = [1, 2, 3, 4, 5, 4, 4, 5]
```

The first 5 elements are the unique values.

---

## Complexity

```text
Time  : O(n)
Space : O(1)
```

---

# Approach 2 - Using Set (JavaScript)

## Idea

A `Set` automatically removes duplicates.

Spread the Set back into the array.

Return the count of unique elements.

---

## Code

```javascript
let removeDuplicates = function(nums) {
    let unique = [...new Set(nums)];

    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }

    return [unique.length, nums, unique];
};
```

---

## Dry Run

```text
nums = [1, 1, 2, 2, 3, 4, 4, 5]
```

Create Set

```text
Set → {1, 2, 3, 4, 5}
```

Spread into array

```text
unique = [1, 2, 3, 4, 5]
```

Copy back into nums

```text
nums = [1, 2, 3, 4, 5, 4, 4, 5]
```

Return

```text
length = 5
```

---

## Complexity

```text
Time  : O(n)
Space : O(n)
```

---

# Comparison

| Feature | Two Pointers | Using Set |
|---------|-------------|-----------|
| Time Complexity | O(n) | O(n) |
| Space Complexity | O(1) | O(n) |
| Modifies In-Place | ✅ | ✅ |
| Extra Memory | ❌ | ✅ |
| Preferred in Interviews | ✅ | ❌ |

---

# Key Idea

### Two Pointers

The array is already sorted, so duplicates are always adjacent.

`i` marks where the next unique element should be written.

`j` finds the next unique element.

### Using Set

A Set stores only unique values by nature.

Simpler to write but uses extra space, which violates the in-place constraint of the original problem.
