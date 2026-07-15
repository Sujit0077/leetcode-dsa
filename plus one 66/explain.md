# LeetCode 66 - Plus One

## Problem Statement

You are given a large integer represented as an array of digits.

Each element in the array is a single digit.

Add one to the integer and return the resulting array.

### Example

```text
Input  : digits = [1, 2, 3]
Output : [1, 2, 4]
```

```text
Input  : digits = [9, 9, 9]
Output : [1, 0, 0, 0]
```

---

# Approach - Reverse Traversal (JavaScript)

## Idea

Start from the last digit.

If the digit is less than 9, just increment it and return immediately.

If the digit is 9, set it to 0 and carry over to the next digit.

If all digits were 9, the loop ends with all zeros, so prepend a 1.

---

## Code

```javascript
let plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};
```

---

## Dry Run

### Example 1 - No carry

```text
digits = [1, 2, 3]

i = 2
```

| i | digits[i] | digits[i] < 9 | Action       |
|---|-----------|----------------|--------------|
| 2 | 3         | ✅              | digits[2]++, return |

Return

```text
[1, 2, 4]
```

---

### Example 2 - Carry propagates once

```text
digits = [1, 2, 9]

i = 2
```

| i | digits[i] | digits[i] < 9 | Action       |
|---|-----------|----------------|--------------|
| 2 | 9         | ❌              | digits[2] = 0 |
| 1 | 2         | ✅              | digits[1]++, return |

Return

```text
[1, 3, 0]
```

---

### Example 3 - All nines

```text
digits = [9, 9, 9]

i = 2
```

| i | digits[i] | digits[i] < 9 | Action        |
|---|-----------|----------------|---------------|
| 2 | 9         | ❌              | digits[2] = 0 |
| 1 | 9         | ❌              | digits[1] = 0 |
| 0 | 9         | ❌              | digits[0] = 0 |

Loop ends.

Array is now

```text
[0, 0, 0]
```

Prepend 1

```javascript
digits.unshift(1);
```

Return

```text
[1, 0, 0, 0]
```

---

## Why unshift(1) at the end?

The only case where the loop completes without returning early is when every digit was 9.

```text
999 + 1 = 1000
```

After the loop all digits become 0, so we just prepend a 1.

---

## Complexity

```text
Time  : O(n)
Space : O(1)  →  O(n) only in the all-nines case due to unshift
```

---

# Key Idea

Walk from the last digit.

If no carry is needed, increment and stop immediately.

If carry is needed, set the digit to 0 and move left.

If carry propagates through all digits, prepend 1.
