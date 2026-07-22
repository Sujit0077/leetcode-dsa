# LeetCode 1757 - Recyclable and Low Fat Products

## Problem Statement

Find the `product_id` of all products that are both low fat and recyclable.

### Table: Products

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
```

`low_fats` and `recyclable` are ENUM columns with values `'Y'` or `'N'`.

### Example

Input

```text
+-------------+----------+------------+
| product_id  | low_fats | recyclable |
+-------------+----------+------------+
| 0           | Y        | N          |
| 1           | Y        | Y          |
| 2           | N        | Y          |
| 3           | Y        | Y          |
| 4           | N        | N          |
+-------------+----------+------------+
```

Output

```text
+-------------+
| product_id  |
+-------------+
| 1           |
| 3           |
+-------------+
```

Only products 1 and 3 have both `low_fats = 'Y'` and `recyclable = 'Y'`.

---

# Approach - WHERE with AND

## Idea

Filter rows where both conditions are true using `AND` in the `WHERE` clause.

---

## Query

```sql
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';
```

---

## Dry Run

Check each row against both conditions.

```text
| product_id | low_fats = 'Y' | recyclable = 'Y' | Both ✅ |
|------------|----------------|------------------|---------|
| 0          | ✅              | ❌                | ❌       |
| 1          | ✅              | ✅                | ✅       |
| 2          | ❌              | ✅                | ❌       |
| 3          | ✅              | ✅                | ✅       |
| 4          | ❌              | ❌                | ❌       |
```

Rows 1 and 3 pass both conditions.

Return

```text
+-------------+
| product_id  |
+-------------+
| 1           |
| 3           |
+-------------+
```

---

## Complexity

```text
Time  : O(n)   (full table scan)
Space : O(1)
```

---

# Key Idea

Use `AND` to combine multiple filter conditions in `WHERE`.

Both conditions must be true for a row to be included in the result.
