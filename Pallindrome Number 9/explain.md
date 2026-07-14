# LeetCode 9 - Palindrome Number

## Problem Statement

Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

A palindrome is a number that reads the same forward and backward.

---

## Examples

### Example 1

```text
Input: x = 121
Output: true
```

Explanation

```text
121 → Left to Right
121 → Right to Left

Both are the same.
```

---

### Example 2

```text
Input: x = -121
Output: false
```

Explanation

```text
Left to Right  : -121
Right to Left : 121-

Not the same.
```

---

### Example 3

```text
Input: x = 10
Output: false
```

Explanation

```text
10

Reverse

01

01 becomes 1

10 ≠ 1
```

---

# Approach 1 - Brute Force (Java - String)

## Idea

Convert the integer into a string.

Compare the first and last characters.

If they are equal, move inward.

Continue until all characters are checked.

If every character matches, the number is a palindrome.

---

## Algorithm

1. Convert the integer to a string.
2. Create two pointers:
   - `left = 0`
   - `right = length - 1`
3. Compare both characters.
4. If they are different, return `false`.
5. Otherwise move:
   - `left++`
   - `right--`
6. Continue until `left >= right`.
7. Return `true`.

---

## Java Code

```java
class Solution {
    public boolean isPalindrome(int x) {

        String str = Integer.toString(x);

        int left = 0;
        int right = str.length() - 1;

        while (left < right) {

            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}
```

---

# Step-by-Step Dry Run

Input

```text
x = 121
```

Convert to String

```text
"121"
```

Initial pointers

```text
left = 0
right = 2
```

---

## Iteration 1

Compare

```text
str[0] = '1'

str[2] = '1'
```

They match.

Move pointers.

```text
left = 1

right = 1
```

---

## Loop Condition

```text
left < right

1 < 1

False
```

Loop ends.

Return

```text
true
```

---

## Example

```text
x = 1231
```

String

```text
"1231"
```

Compare

```text
1 == 1 ✅
```

Move pointers.

```text
left = 1

right = 2
```

Compare

```text
2

3
```

They are different.

Return

```text
false
```

---

## Complexity

```text
Time  : O(n)

Space : O(n)
```

where `n` is the number of digits.

---

# Approach 2 - Optimal (JavaScript - Reverse Number)

## Idea

Instead of converting the number into a string,

reverse the number mathematically.

If the reversed number equals the original number,

then it is a palindrome.

---

## Algorithm

1. If the number is negative, return `false`.
2. Store the original number.
3. Extract the last digit.
4. Build the reversed number.
5. Remove the last digit.
6. Repeat until the number becomes `0`.
7. Compare the reversed number with the original.

---

## JavaScript Code

```javascript
var isPalindrome = function(x) {

    if (x < 0)
        return false;

    const original = x;
    let reverse = 0;

    while (x !== 0) {

        const digit = x % 10;

        reverse = reverse * 10 + digit;

        x = Math.floor(x / 10);
    }

    return original === reverse;
};
```

---

# Step-by-Step Dry Run

Input

```text
x = 121
```

Initial values

```text
original = 121

reverse = 0
```

---

## Iteration 1

Current number

```text
x = 121
```

Extract last digit

```text
digit = 121 % 10

= 1
```

Build reverse

```text
reverse = 0 × 10 + 1

= 1
```

Remove last digit

```text
x = Math.floor(121 / 10)

= 12
```

Current State

```text
x = 12

reverse = 1
```

---

## Iteration 2

Current number

```text
x = 12
```

Extract last digit

```text
digit = 12 % 10

= 2
```

Build reverse

```text
reverse = 1 × 10 + 2

= 12
```

Remove last digit

```text
x = Math.floor(12 / 10)

= 1
```

Current State

```text
x = 1

reverse = 12
```

---

## Iteration 3

Current number

```text
x = 1
```

Extract last digit

```text
digit = 1 % 10

= 1
```

Build reverse

```text
reverse = 12 × 10 + 1

= 121
```

Remove last digit

```text
x = Math.floor(1 / 10)

= 0
```

Current State

```text
x = 0

reverse = 121
```

Loop ends.

Compare

```text
original = 121

reverse = 121
```

Return

```text
true
```

---

## Example 2

Input

```text
x = -121
```

Check

```javascript
if (x < 0)
    return false;
```

Return

```text
false
```

---

## Example 3

Input

```text
x = 10
```

Reverse

```text
10

↓

1
```

Compare

```text
10 == 1

False
```

Return

```text
false
```

---

# How is the reverse built?

Suppose

```text
1234
```

Initially

```text
reverse = 0
```

Take the last digit

```text
4
```

Build

```text
reverse = 0 × 10 + 4

= 4
```

Next digit

```text
3
```

Build

```text
reverse = 4 × 10 + 3

= 43
```

Next

```text
2
```

Build

```text
reverse = 43 × 10 + 2

= 432
```

Next

```text
1
```

Build

```text
reverse = 432 × 10 + 1

= 4321
```

Finally

```text
1234

↓

4321
```

---

## Complexity

```text
Time  : O(n)

Space : O(1)
```

where `n` is the number of digits.

---

# Comparison

| Feature | Java (String) | JavaScript (Reverse Number) |
|---------|---------------|-----------------------------|
| Uses String | ✅ | ❌ |
| Mathematical Solution | ❌ | ✅ |
| Time Complexity | O(n) | O(n) |
| Space Complexity | O(n) | O(1) |
| Easy to Understand | ✅ | ✅ |
| Follow-up Solution | ❌ | ✅ |

---

# Key Takeaways

### Java (String)

- Convert the number into a string.
- Compare characters from both ends using two pointers.
- Easy and intuitive approach.

### JavaScript (Reverse Number)

- Reverse the number mathematically without converting it to a string.
- Compare the reversed number with the original.
- Uses constant extra space and satisfies the follow-up requirement.