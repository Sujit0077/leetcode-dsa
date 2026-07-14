# LeetCode 13 - Roman to Integer

## Problem Statement

Given a Roman numeral, convert it to an integer.

Roman numerals are represented by the following symbols:

| Symbol | Value |
| :----: | :---: |
| I | 1 |
| V | 5 |
| X | 10 |
| L | 50 |
| C | 100 |
| D | 500 |
| M | 1000 |

### Subtractive Cases

Normally, Roman numerals are written from largest to smallest and their values are added together.

However, there are six special cases where subtraction is used:

| Roman | Value |
| :---: | :---: |
| IV | 4 |
| IX | 9 |
| XL | 40 |
| XC | 90 |
| CD | 400 |
| CM | 900 |

---

# Approach

## Intuition

Traverse the Roman numeral from **left to right**.

For every character:

- Convert the current Roman symbol to its integer value.
- Compare it with the next character (if one exists).
- If the current value is **less than** the next value, it is a subtractive case, so subtract it from the answer.
- Otherwise, add it to the answer.

This works because in Roman numerals, a smaller value appearing before a larger value indicates subtraction.

---

# Algorithm

1. Initialize `sum = 0`.
2. Traverse the string from index `0` to `n - 1`.
3. Get the integer value of the current Roman symbol.
4. If there is a next character:
   - Get its value.
   - If `current < next`
     - Subtract the current value from `sum`.
   - Otherwise
     - Add the current value to `sum`.
5. If the current character is the last character:
   - Simply add its value.
6. Return `sum`.

---

# Java Code

```java
class Solution {

    public int getVal(char ch) {
        return switch (ch) {
            case 'I' -> 1;
            case 'V' -> 5;
            case 'X' -> 10;
            case 'L' -> 50;
            case 'C' -> 100;
            case 'D' -> 500;
            case 'M' -> 1000;
            default -> 0;
        };
    }

    public int romanToInt(String s) {
        int sum = 0;

        for (int i = 0; i < s.length(); i++) {

            int curr = getVal(s.charAt(i));

            if (i + 1 < s.length()) {

                int next = getVal(s.charAt(i + 1));

                if (curr < next) {
                    sum -= curr;
                } else {
                    sum += curr;
                }

            } else {
                sum += curr;
            }
        }

        return sum;
    }
}
```

---

# Dry Run

## Input

```
MCMXCIV
```

| Index | Current | Current Value | Next | Next Value | Operation | Sum |
|------:|:--------:|--------------:|:----:|-----------:|----------:|----:|
| 0 | M | 1000 | C | 100 | +1000 | 1000 |
| 1 | C | 100 | M | 1000 | -100 | 900 |
| 2 | M | 1000 | X | 10 | +1000 | 1900 |
| 3 | X | 10 | C | 100 | -10 | 1890 |
| 4 | C | 100 | I | 1 | +100 | 1990 |
| 5 | I | 1 | V | 5 | -1 | 1989 |
| 6 | V | 5 | — | — | +5 | **1994** |

Final Answer:

```
1994
```

---

# Why This Works

Whenever a smaller Roman numeral appears before a larger one, it represents subtraction.

For example:

```
IV

I = 1
V = 5

Since 1 < 5

Answer = -1 + 5 = 4
```

Another example:

```
VI

V = 5
I = 1

Since 5 > 1

Answer = 5 + 1 = 6
```

The algorithm simply checks this condition for every adjacent pair.

---

# Complexity Analysis

### Time Complexity

- We traverse the string only once.

**O(n)**

where `n` is the length of the Roman numeral.

---

### Space Complexity

Only a few integer variables are used.

**O(1)**

---

# Key Takeaways

- Traverse the string once.
- Compare each symbol with the next symbol.
- If the current value is smaller than the next value, subtract it.
- Otherwise, add it.
- This is the standard optimal solution for the Roman to Integer problem.