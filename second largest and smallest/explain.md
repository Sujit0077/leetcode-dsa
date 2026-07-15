# Second Largest and Second Smallest Element

## Problem

Given an array of integers, find the second largest and the second smallest element in a single pass.

### Example

```text
nums = [3, 2, 1, 4, 5]

Second Largest  : 4
Second Smallest : 2
```

---

# Approach - Single Pass (JavaScript)

## Idea

Track two variables simultaneously.

For second largest: maintain `largest` and `slargest`.

For second smallest: maintain `smallest` and `ssmallest`.

Update both in one loop pass.

---

# Second Largest Element

## Code

```javascript
class Solution {
    secondLargestElement(nums) {
        let largest = nums[0];
        let slargest = -1;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] > largest) {
                slargest = largest;
                largest = nums[i];
            } else if (nums[i] < largest && nums[i] > slargest) {
                slargest = nums[i];
            }
        }
        return slargest;
    }
}
```

---

## Dry Run

```text
nums = [3, 2, 1, 4, 5]

largest  = 3
slargest = -1
```

| i | nums[i] | Condition          | largest | slargest |
|---|---------|---------------------|---------|----------|
| 1 | 2       | 2 < 3, 2 > -1 ✅    | 3       | 2        |
| 2 | 1       | 1 < 3, 1 > 2 ❌     | 3       | 2        |
| 3 | 4       | 4 > 3 ✅            | 4       | 3        |
| 4 | 5       | 5 > 4 ✅            | 5       | 4        |

Return

```text
4
```

---

# Second Smallest Element

## Code

```javascript
class Solution {
    secondSmallest(nums) {
        let smallest = nums[0];
        let ssmallest = Infinity;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] < smallest) {
                ssmallest = smallest;
                smallest = nums[i];
            } else if (nums[i] != smallest && nums[i] < ssmallest) {
                ssmallest = nums[i];
            }
        }
        return ssmallest;
    }
}
```

---

## Dry Run

```text
nums = [3, 2, 1, 4, 5]

smallest  = 3
ssmallest = Infinity
```

| i | nums[i] | Condition                    | smallest | ssmallest |
|---|---------|-------------------------------|----------|-----------|
| 1 | 2       | 2 < 3 ✅                      | 2        | 3         |
| 2 | 1       | 1 < 2 ✅                      | 1        | 2         |
| 3 | 4       | 4 != 1, 4 < 2 ❌              | 1        | 2         |
| 4 | 5       | 5 != 1, 5 < 2 ❌              | 1        | 2         |

Return

```text
2
```

---

## Why initialize ssmallest to Infinity?

Any real number in the array will be smaller than `Infinity`, so the first valid candidate will always be picked up correctly.

Similarly, `slargest` is initialized to `-1` assuming all array values are non-negative.

---

## Complexity

```text
Time  : O(n)
Space : O(1)
```

---

# Key Idea

Both variables are updated in a single pass.

When a new extreme is found, the old extreme becomes the second extreme.

When neither condition is met, the second variable is updated directly if the current element qualifies.
