# Valid Parentheses (LeetCode 20)

## Problem Statement

Given a string `s` containing only the following characters:

```text
'(' ')' '{' '}' '[' ']'
```

Determine whether the string is **valid**.

A string is valid if:

- Every opening bracket has a corresponding closing bracket of the **same type**.
- Brackets are closed in the **correct order**.
- Every closing bracket has a matching opening bracket.

---

## Examples

### Example 1

```text
Input: "()"
Output: true
```

---

### Example 2

```text
Input: "()[]{}"
Output: true
```

---

### Example 3

```text
Input: "(]"
Output: false
```

---

### Example 4

```text
Input: "([])"
Output: true
```

---

### Example 5

```text
Input: "([)]"
Output: false
```

---

# Intuition

The last opening bracket must always be closed first.

For example:

```text
{ [ ( ) ] }
```

The closing order is:

1. `(` closes first
2. `[` closes second
3. `{` closes last

This follows the **Last In, First Out (LIFO)** principle.

A **Stack** is the perfect data structure for this behavior.

---

# Optimized Idea

Instead of storing the **opening brackets**, we store the **closing bracket that we expect**.

For example,

When we read:

```text
(
```

Instead of pushing `'('`, we push

```text
)
```

Similarly,

| Opening Bracket | Push Into Stack |
|-----------------|-----------------|
| ( | ) |
| [ | ] |
| { | } |

Later, whenever we encounter a closing bracket, we simply compare it with the top of the stack.

This removes the need for multiple comparison conditions.

---

# Algorithm

1. Create an empty stack.
2. Traverse each character in the string.
3. If the character is:
   - `(` → push `)`
   - `[` → push `]`
   - `{` → push `}`
4. Otherwise, the character is a closing bracket.
   - If the stack is empty, return `false`.
   - Pop the top element.
   - If it doesn't match the current character, return `false`.
5. After processing the entire string:
   - If the stack is empty → return `true`
   - Otherwise → return `false`

---

# Java Solution

```java
import java.util.Stack;

class Solution {
    public boolean isValid(String s) {

        Stack<Character> stack = new Stack<>();

        for (char ch : s.toCharArray()) {

            switch (ch) {

                case '(' -> stack.push(')');
                case '[' -> stack.push(']');
                case '{' -> stack.push('}');

                default -> {
                    if (stack.isEmpty() || stack.pop() != ch) {
                        return false;
                    }
                }
            }
        }

        return stack.isEmpty();
    }
}
```

---

# Dry Run (Valid Input)

## Input

```java
String input = "{[()]}"
```

### Initial Stack

```text
[]
```

---

## Step 1

Character:

```text
{
```

Push expected closing bracket.

```text
Stack:
[ } ]
```

---

## Step 2

Character:

```text
[
```

Push expected closing bracket.

```text
Stack:
[ }, ] ]
```

Top is on the right.

```text
Bottom → } ]
            ↑
           Top
```

---

## Step 3

Character

```text
(
```

Push expected closing bracket.

```text
Stack:
[ }, ], ) ]
```

---

## Step 4

Character

```text
)
```

Top of stack

```text
)
```

Matches current character.

Pop it.

```text
Stack:
[ }, ] ]
```

---

## Step 5

Character

```text
]
```

Top

```text
]
```

Matches.

Pop it.

```text
Stack:
[ } ]
```

---

## Step 6

Character

```text
}
```

Top

```text
}
```

Matches.

Pop it.

```text
Stack:
[]
```

Stack is empty.

Return

```text
true
```

---

# Dry Run (Invalid Input)

## Input

```java
String invalidInput = "{[(])}"
```

### Initial Stack

```text
[]
```

---

### Read

```text
{
```

Push expected

```text
}
```

```text
Stack:
[ } ]
```

---

### Read

```text
[
```

Push expected

```text
]
```

```text
Stack:
[ }, ] ]
```

---

### Read

```text
(
```

Push expected

```text
)
```

```text
Stack:
[ }, ], ) ]
```

---

### Read

```text
]
```

Now check the top.

Top is

```text
)
```

Current character is

```text
]
```

Comparison

```java
stack.pop() != ch
```

becomes

```java
')' != ']'
```

which is

```text
true
```

Therefore,

```java
return false;
```

The brackets are closed in the wrong order.

---

# Why Push Closing Brackets?

### Traditional Approach

Store opening brackets.

```text
(
[
{
```

When a closing bracket comes, multiple conditions are needed.

```java
if ((ch == ')' && top != '(') ||
    (ch == ']' && top != '[') ||
    (ch == '}' && top != '{'))
```

---

### Optimized Approach

Store expected closing brackets.

```text
)
]
}
```

Now only one comparison is required.

```java
stack.pop() != ch
```

This makes the solution cleaner, shorter, and easier to understand.

---

# Why Check `stack.isEmpty()` at the End?

Consider the input

```text
(((
```

Execution

```text
Read (
Push )

Read (
Push )

Read (
Push )
```

Final stack

```text
[ ), ), ) ]
```

The loop finishes.

If we simply returned `true`, the answer would be incorrect because three opening brackets were never closed.

Instead,

```java
return stack.isEmpty();
```

returns

```text
false
```

since the stack still contains expected closing brackets.

---

# Complexity Analysis

### Time Complexity

Each character is processed exactly once.

```text
O(n)
```

---

### Space Complexity

In the worst case (all opening brackets), every character is pushed onto the stack.

```text
O(n)
```

---

# Key Takeaways

- A **Stack** is the ideal data structure because brackets follow the **Last In, First Out (LIFO)** principle.
- Instead of storing opening brackets, store the **closing brackets you expect**.
- Every closing bracket must match the top of the stack.
- If the stack is empty when a closing bracket appears, the string is invalid.
- After processing the entire string, the stack **must be empty** for the string to be valid.

This optimized approach is concise, efficient, and easy to reason about, making it a common interview solution for the **Valid Parentheses** problem.