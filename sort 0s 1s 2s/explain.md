# Sort 0s, 1s, and 2s (Dutch National Flag Problem)

## Problem Statement

Given an array `nums` containing only 0s, 1s, and 2s, sort it in-place so all 0s come first, then 1s, then 2s.

### Example

```text
Input  : nums = [2, 0, 2, 1, 1, 0]
Output : [0, 0, 1, 1, 2, 2]
```

---

# Approach 1 - Count and Overwrite (JavaScript)

## Idea

Count the number of 0s, 1s, and 2s in one pass.

Overwrite the array using those counts.

Fill the first `cnt0` positions with 0, next `cnt1` with 1, rest with 2.

---

## Code

```javascript
let sortColors = function(nums) {
    let cnt0 = 0, cnt1 = 0, cnt2 = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) cnt0++;
        else if (nums[i] === 1) cnt1++;
        else cnt2++;
    }

    for (let i = 0; i < cnt0; i++) nums[i] = 0;
    for (let i = cnt0; i < cnt0 + cnt1; i++) nums[i] = 1;
    for (let i = cnt0 + cnt1; i < nums.length; i++) nums[i] = 2;

    return nums;
};
```

---

## Dry Run

```text
nums = [2, 0, 2, 1, 1, 0]
```

Phase 1 - Count

| i | nums[i] | cnt0 | cnt1 | cnt2 |
|---|---------|------|------|------|
| 0 | 2       | 0    | 0    | 1    |
| 1 | 0       | 1    | 0    | 1    |
| 2 | 2       | 1    | 0    | 2    |
| 3 | 1       | 1    | 1    | 2    |
| 4 | 1       | 1    | 2    | 2    |
| 5 | 0       | 2    | 2    | 2    |

```text
cnt0 = 2, cnt1 = 2, cnt2 = 2
```

Phase 2 - Overwrite

```text
Fill indices 0 to 1 with 0  → [0, 0, _, _, _, _]
Fill indices 2 to 3 with 1  → [0, 0, 1, 1, _, _]
Fill indices 4 to 5 with 2  → [0, 0, 1, 1, 2, 2]
```

Return

```text
[0, 0, 1, 1, 2, 2]
```

---

## Complexity

```text
Time  : O(2n) → O(n)   (two passes)
Space : O(1)
```

---

# Approach 2 - Dutch National Flag Algorithm / Optimal (JavaScript)

## Idea

Use three pointers: `low`, `mid`, `high`.

- Everything before `low` is 0.
- Everything between `low` and `mid` is 1.
- Everything after `high` is 2.

Process elements at `mid` one by one until `mid` crosses `high`.

---

## Rules

```text
nums[mid] === 0 → swap with low,  low++, mid++
nums[mid] === 1 → mid++
nums[mid] === 2 → swap with high, high--
```

---

## Code

```javascript
let sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
    return nums;
};
```

---

## Dry Run

```text
nums = [2, 0, 2, 1, 1, 0]

low = 0, mid = 0, high = 5
```

### Step 1

```text
mid = 0, nums[mid] = 2
```

nums[mid] === 2 → swap(mid, high), high--

```text
swap(0, 5) → [0, 0, 2, 1, 1, 2]

low = 0, mid = 0, high = 4
```

---

### Step 2

```text
mid = 0, nums[mid] = 0
```

nums[mid] === 0 → swap(low, mid), low++, mid++

```text
swap(0, 0) → [0, 0, 2, 1, 1, 2]   (no change, same position)

low = 1, mid = 1, high = 4
```

---

### Step 3

```text
mid = 1, nums[mid] = 0
```

nums[mid] === 0 → swap(low, mid), low++, mid++

```text
swap(1, 1) → [0, 0, 2, 1, 1, 2]   (no change)

low = 2, mid = 2, high = 4
```

---

### Step 4

```text
mid = 2, nums[mid] = 2
```

nums[mid] === 2 → swap(mid, high), high--

```text
swap(2, 4) → [0, 0, 1, 1, 2, 2]

low = 2, mid = 2, high = 3
```

---

### Step 5

```text
mid = 2, nums[mid] = 1
```

nums[mid] === 1 → mid++

```text
low = 2, mid = 3, high = 3
```

---

### Step 6

```text
mid = 3, nums[mid] = 1
```

nums[mid] === 1 → mid++

```text
low = 2, mid = 4, high = 3
```

mid > high → loop ends.

Return

```text
[0, 0, 1, 1, 2, 2]
```

---

## Why don't we increment mid when swapping with high?

When we swap `nums[mid]` with `nums[high]`, the element that comes to `mid` is unknown.

It could be 0, 1, or 2, so we must check it again.

That's why `mid` stays and only `high` decreases.

When we swap with `low`, we know `nums[low]` must be 1 (since `low` to `mid-1` is already sorted as 1s), so it's safe to advance both `low` and `mid`.

---

## Complexity

```text
Time  : O(n)   (single pass)
Space : O(1)
```

---

# Comparison

| Feature | Count & Overwrite | Dutch National Flag |
|---------|------------------|---------------------|
| Time Complexity | O(2n) | O(n) |
| Space Complexity | O(1) | O(1) |
| Passes Required | 2 | 1 |
| Preferred in Interviews | ❌ | ✅ |

---

# Key Idea

### Count and Overwrite

Count each value, then fill the array in order.

Simple but requires two passes.

### Dutch National Flag

Three pointers divide the array into four regions at all times.

```text
[  0s  |  1s  |  unsorted  |  2s  ]
        ↑      ↑            ↑
       low    mid          high
```

Single pass. Most efficient solution.
