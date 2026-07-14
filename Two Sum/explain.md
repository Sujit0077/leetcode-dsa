# Two Sum - Step by Step Explanation

## Problem

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

### Example

```text
nums = [2, 7, 11, 15]
target = 9

Output: [0, 1]
```

Because:

```text
nums[0] + nums[1]
= 2 + 7
= 9
```

---

# Approach 1: Brute Force (Java)

## Idea

Check every possible pair of numbers.

For every element, compare it with every element after it.

If their sum equals the target, return their indices.

## Code

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {

        for (int i = 0; i < nums.length; i++) {

            for (int j = i + 1; j < nums.length; j++) {

                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }

            }

        }

        return new int[]{};
    }
}
```

---

## Dry Run

```text
nums = [2, 7, 11, 15]
target = 9
```

### i = 0

Current number

```text
2
```

### j = 1

```text
2 + 7 = 9 ✅
```

Target found.

Return

```text
[0,1]
```

No further iterations are needed.

---

### What if the first pair wasn't correct?

Suppose:

```text
nums = [2,7,11,15]
target = 13
```

Iterations:

```text
2 + 7  = 9
2 + 11 = 13 ✅
```

Return

```text
[0,2]
```

---

## Time Complexity

```
Outer loop : O(n)
Inner loop : O(n)

Overall : O(n²)
```

## Space Complexity

```
O(1)
```

---

# Approach 2: Optimal (JavaScript - HashMap)

## Idea

Instead of checking every pair, remember the numbers we've already seen.

For every number:

1. Calculate the number needed to reach the target.
2. Check if that number already exists in the HashMap.
3. If yes → return the indices.
4. Otherwise, store the current number and continue.

---

## Code

```javascript
var twoSum = function(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }
};
```

---

# Step-by-Step Dry Run

Input

```text
nums = [2, 7, 11, 15]
target = 9
```

---

## Step 1

Create an empty Map.

```javascript
const map = new Map();
```

Initially

```text
{}
```

The map stores

```text
number → index
```

---

## Step 2

### i = 0

Current number

```text
nums[0] = 2
```

Find the complement.

```text
complement = target - nums[i]
           = 9 - 2
           = 7
```

Ask:

> Have we already seen **7**?

Current Map

```text
{}
```

Answer

```text
No
```

Store the current number.

```javascript
map.set(2, 0);
```

Map becomes

```text
{
 2 → 0
}
```

---

## Step 3

### i = 1

Current number

```text
nums[1] = 7
```

Find the complement.

```text
9 - 7 = 2
```

Ask

> Have we already seen **2**?

Current Map

```text
{
 2 → 0
}
```

Answer

```text
Yes
```

Retrieve its index.

```javascript
map.get(2)
```

returns

```text
0
```

Return

```javascript
[
    0,
    1
]
```

Done!

---

# Visualization

### Before Loop

```text
Map

{}
```

---

### i = 0

Current Number

```text
2
```

Need

```text
7
```

Map

```text
{}
```

Not found.

Store

```text
2 → 0
```

Map

```text
{
2 → 0
}
```

---

### i = 1

Current Number

```text
7
```

Need

```text
2
```

Map

```text
{
2 → 0
}
```

Found!

Return

```text
[0,1]
```

---

# Why do we check before storing?

Consider

```text
nums = [3,3]
target = 6
```

### i = 0

Need

```text
3
```

Map

```text
{}
```

Not found.

Store

```text
3 → 0
```

---

### i = 1

Need

```text
3
```

Map

```text
{
3 → 0
}
```

Found!

Return

```text
[0,1]
```

If we stored first and then checked, the first element could match itself, which is not allowed.

---

# Complexity

## Brute Force

```text
Time  : O(n²)
Space : O(1)
```

## Optimal (HashMap)

```text
Time  : O(n)
Space : O(n)
```

---

# Comparison

| Feature | Brute Force | HashMap |
|----------|------------|----------|
| Time Complexity | O(n²) | O(n) |
| Space Complexity | O(1) | O(n) |
| Uses Extra Memory | ❌ | ✅ |
| Preferred in Interviews | ❌ | ✅ |

---

# Key Idea

For every element, instead of searching the entire array again, ask:

> **"What number do I need to reach the target?"**

That number is called the **complement**.

```text
complement = target - currentNumber
```

If the complement has already been seen, we've found the answer immediately.

That's why the HashMap solution only needs **one pass** through the array.