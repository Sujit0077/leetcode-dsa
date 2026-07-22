# LeetCode 584 - Find Customer Referee

## Problem Statement

Find the names of customers who were either:

- Not referred by anyone, or
- Referred by a customer whose id is not 2.

### Table: Customer

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
```

`referee_id` can be `NULL` if the customer was not referred by anyone.

### Example

Input

```text
+----+------+------------+
| id | name | referee_id |
+----+------+------------+
| 1  | Will | null       |
| 2  | Jane | null       |
| 3  | Alex | 2          |
| 4  | Bill | null       |
| 5  | Zack | 1          |
| 6  | Mark | 2          |
+----+------+------------+
```

Output

```text
+------+
| name |
+------+
| Will |
| Jane |
| Bill |
| Zack |
+------+
```

---

# Approach 1 - IS NULL OR != 2

## Idea

Include rows where `referee_id` is `NULL` or not equal to 2.

---

## Query

```sql
SELECT name
FROM Customer
WHERE referee_id IS NULL OR referee_id != 2;
```

---

## Dry Run

```text
| id | name | referee_id | IS NULL | != 2 | Include |
|----|------|------------|---------|------|---------|
| 1  | Will | null       | ✅       | -    | ✅       |
| 2  | Jane | null       | ✅       | -    | ✅       |
| 3  | Alex | 2          | ❌       | ❌    | ❌       |
| 4  | Bill | null       | ✅       | -    | ✅       |
| 5  | Zack | 1          | ❌       | ✅    | ✅       |
| 6  | Mark | 2          | ❌       | ❌    | ❌       |
```

Return

```text
Will, Jane, Bill, Zack
```

---

## Why can't we just use referee_id != 2?

In SQL, any comparison with `NULL` returns `UNKNOWN`, not `TRUE` or `FALSE`.

So `NULL != 2` does not evaluate to `TRUE`.

Rows with `NULL` would be excluded if we only wrote `referee_id != 2`.

That's why we must explicitly check `IS NULL` as well.

---

# Approach 2 - IFNULL (Cleaner)

## Idea

Use `IFNULL(referee_id, 0)` to replace `NULL` with `0`.

Then simply check if the result is not equal to 2.

Since `0 != 2` is `TRUE`, all `NULL` rows are included automatically.

---

## Query

```sql
SELECT name
FROM Customer
WHERE IFNULL(referee_id, 0) <> 2;
```

---

## Dry Run

```text
| id | name | referee_id | IFNULL(referee_id, 0) | <> 2 | Include |
|----|------|------------|-----------------------|------|---------|
| 1  | Will | null       | 0                     | ✅    | ✅       |
| 2  | Jane | null       | 0                     | ✅    | ✅       |
| 3  | Alex | 2          | 2                     | ❌    | ❌       |
| 4  | Bill | null       | 0                     | ✅    | ✅       |
| 5  | Zack | 1          | 1                     | ✅    | ✅       |
| 6  | Mark | 2          | 2                     | ❌    | ❌       |
```

Return

```text
Will, Jane, Bill, Zack
```

---

## Complexity

```text
Time  : O(n)   (full table scan)
Space : O(1)
```

---

# Comparison

| Feature | IS NULL OR != 2 | IFNULL <> 2 |
|---------|----------------|-------------|
| Handles NULL | ✅ | ✅ |
| Readability | Verbose | Cleaner |
| Preferred | ❌ | ✅ |

---

# Key Idea

### NULL trap in SQL

`NULL != 2` is not `TRUE` in SQL. It is `UNKNOWN`.

Always handle `NULL` explicitly using `IS NULL` or `IFNULL`.

### IFNULL approach

Replace `NULL` with a safe default value (0 here) so the comparison works correctly without needing a separate `IS NULL` check.
