# LeetCode 58 - Length of Last Word

## Problem Statement

Given a string `s` consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

### Example

```text
Input  : s = "Hello World"
Output : 5
```

```text
Input  : s = "   fly me   to   the moon  "
Output : 4
```

---

# Approach 1 - trim() + split(" ") (JavaScript)

## Idea

Trim the trailing and leading spaces.

Split the string by a single space `" "`.

Return the length of the last element.

---

## Code

```javascript
var lengthOfLastWord = function(s) {
    let words = s.trim().split(" ");
    return words[words.length - 1].length;
};
```

---

## Dry Run

```text
s = "Hello World"
```

After trim()

```text
"Hello World"
```

After split(" ")

```text
["Hello", "World"]
```

Last element

```text
"World"
```

Return

```text
5
```

---

## Problem with multiple spaces

```text
s = "   fly me   to   the moon  "
```

After trim()

```text
"fly me   to   the moon"
```

After split(" ")

```text
["fly", "me", "", "", "to", "", "", "the", "moon"]
```

Empty strings are created by consecutive spaces.

But the last element is still

```text
"moon"
```

So it returns

```text
4
```

This works here, but it is fragile if the last word had trailing spaces before trim was applied.

---

## Why use /\s+/ instead?

```javascript
s.trim().split(/\s+/)
```

`\s` matches any whitespace (space, tab, newline).

`+` means one or more.

So

```text
"fly me   to   the moon".split(/\s+/)
```

returns

```text
["fly", "me", "to", "the", "moon"]
```

No empty strings. Cleaner and safer.

---

## Complexity

```text
Time  : O(n)
Space : O(n)
```

---

# Approach 2 - strip() + split() (Python)

## Idea

Same idea as Approach 1 but in Python.

`strip()` removes leading and trailing whitespace.

`split()` with no argument splits on any whitespace and ignores multiple spaces automatically.

`[-1]` gets the last word.

---

## Code

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        word = s.strip().split()[-1]
        return len(word)
```

---

## Dry Run

```text
s = "   fly me   to   the moon  "
```

After strip()

```text
"fly me   to   the moon"
```

After split()

```text
["fly", "me", "to", "the", "moon"]
```

`[-1]` gives

```text
"moon"
```

Return

```text
4
```

---

## Why is Python split() better than JavaScript split(" ")?

Python's `split()` with no argument automatically handles multiple consecutive spaces and produces no empty strings.

JavaScript's `split(" ")` splits on exactly one space, so multiple spaces create empty strings in the array.

---

## Complexity

```text
Time  : O(n)
Space : O(n)
```

---

# Approach 3 - Reverse Traversal (JavaScript)

## Idea

Start from the end of the string.

Skip all trailing spaces.

Count characters until the next space or the start of the string.

Return the count.

No splitting or extra arrays needed.

---

## Code

```javascript
let lengthOfLastWord = function(s) {
    let i = s.length - 1;
    let count = 0;

    while (i >= 0 && s[i] === " ") {
        i--;
    }

    while (i >= 0 && s[i] !== " ") {
        count++;
        i--;
    }

    return count;
};
```

---

## Dry Run

### Example 1

```text
s = "Hello World"

i = 10
count = 0
```

Phase 1 - Skip trailing spaces

```text
s[10] = 'd'  → not a space, stop immediately
```

Phase 2 - Count the last word

| i  | s[i] | s[i] !== " " | count |
|----|------|--------------|-------|
| 10 | d    | ✅            | 1     |
| 9  | l    | ✅            | 2     |
| 8  | r    | ✅            | 3     |
| 7  | o    | ✅            | 4     |
| 6  | W    | ✅            | 5     |
| 5  | " "  | ❌            | stop  |

Return

```text
5
```

---

### Example 2

```text
s = "   fly me   to   the moon  "

i = 26
count = 0
```

Phase 1 - Skip trailing spaces

```text
s[26] = " "  → i--
s[25] = " "  → i--
s[24] = "n"  → stop

i = 24
```

Phase 2 - Count the last word

| i  | s[i] | s[i] !== " " | count |
|----|------|--------------|-------|
| 24 | n    | ✅            | 1     |
| 23 | o    | ✅            | 2     |
| 22 | o    | ✅            | 3     |
| 21 | m    | ✅            | 4     |
| 20 | " "  | ❌            | stop  |

Return

```text
4
```

---

## Complexity

```text
Time  : O(n)
Space : O(1)
```

---

# Comparison

| Feature | split(" ") JS | split() Python | Reverse Traversal |
|---------|--------------|----------------|-------------------|
| Time Complexity | O(n) | O(n) | O(n) |
| Space Complexity | O(n) | O(n) | O(1) |
| Handles multiple spaces | ⚠️ fragile | ✅ | ✅ |
| Extra array created | ✅ | ✅ | ❌ |
| Preferred in Interviews | ❌ | ❌ | ✅ |

---

# Key Idea

### split() approaches

Trim the string, split into words, return the length of the last one.

Simple and readable but uses extra space.

### Reverse Traversal

Walk from the end of the string.

Skip spaces, then count characters.

No extra memory needed. Most efficient and interview-preferred.
