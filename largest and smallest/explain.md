# Largest and Smallest Element

## Problem

Given an array of integers, find the largest and the smallest element.

### Example

```text
nums = [3, 5, 7, 2, 8]

Largest  : 8
Smallest : 2
```

---

# Approach - Linear Scan (JavaScript)

## Idea

Start by assuming the first element is the largest (or smallest).

Loop through the rest of the array.

If a bigger (or smaller) element is found, update the result.

---

# Largest Element

## Code

```javascript
class Solution {
    largestElement(nums) {
        let largest = nums[0];
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] > largest) {
                largest = nums[i];
            }
        }
        return largest;
    }
}
```

---

## Dry Run

```text
nums = [3, 5, 7, 2, 8]

largest = 3
```

| i | nums[i] | nums[i] > largest | largest |
|---|---------|-------------------|---------|
| 1 | 5       | 5 > 3 ✅           | 5       |
| 2 | 7       | 7 > 5 ✅           | 7       |
| 3 | 2       | 2 > 7 ❌           | 7       |
| 4 | 8       | 8 > 7 ✅           | 8       |

Return

```text
8
```

---

# Smallest Element

## Code

```javascript
class Solution {
    smallestElement(nums) {
        let smallest = nums[0];
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] < smallest) {
                smallest = nums[i];
            }
        }
        return smallest;
    }
}
```

---

## Dry Run

```text
nums = [3, 5, 7, 2, 8]

smallest = 3
```

| i | nums[i] | nums[i] < smallest | smallest |
|---|---------|---------------------|----------|
| 1 | 5       | 5 < 3 ❌             | 3        |
| 2 | 7       | 7 < 3 ❌             | 3        |
| 3 | 2       | 2 < 3 ✅             | 2        |
| 4 | 8       | 8 < 2 ❌             | 2        |

Return

```text
2
```

---

## Complexity

```text
Time  : O(n)
Space : O(1)
```

---

# Key Idea

Only one pass through the array is needed.

Keep track of the current best value and update it whenever a better one is found.
