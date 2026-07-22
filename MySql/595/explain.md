# LeetCode 595 - Big Countries

## Problem Statement

A country is considered big if:

- It has an area of at least 3,000,000 km², or
- It has a population of at least 25,000,000.

Find the `name`, `population`, and `area` of all big countries.

### Table: World

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |
+-------------+---------+
```

### Example

Input

```text
+-------------+-----------+---------+------------+--------------+
| name        | continent | area    | population | gdp          |
+-------------+-----------+---------+------------+--------------+
| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |
| Albania     | Europe    | 28748   | 2831741    | 12960000000  |
| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |
| Andorra     | Europe    | 468     | 78115      | 3712000000   |
| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |
+-------------+-----------+---------+------------+--------------+
```

Output

```text
+-------------+------------+---------+
| name        | population | area    |
+-------------+------------+---------+
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
+-------------+------------+---------+
```

---

# Approach 1 - WHERE with OR

## Idea

Use `OR` in the `WHERE` clause to include rows that satisfy either condition.

---

## Query

```sql
SELECT name, population, area
FROM World
WHERE area >= 3000000
OR population >= 25000000;
```

---

## Dry Run

```text
| name        | area    | population | area >= 3M | pop >= 25M | Include |
|-------------|---------|------------|------------|------------|---------|
| Afghanistan | 652230  | 25500100   | ❌          | ✅          | ✅       |
| Albania     | 28748   | 2831741    | ❌          | ❌          | ❌       |
| Algeria     | 2381741 | 37100000   | ❌          | ✅          | ✅       |
| Andorra     | 468     | 78115      | ❌          | ❌          | ❌       |
| Angola      | 1246700 | 20609294   | ❌          | ❌          | ❌       |
```

Return

```text
Afghanistan, Algeria
```

---

## Complexity

```text
Time  : O(n)
Space : O(1)
```

---

# Approach 2 - UNION

## Idea

Run two separate queries, one for each condition, and combine the results using `UNION`.

`UNION` automatically removes duplicate rows if a country satisfies both conditions.

---

## Query

```sql
SELECT name, population, area
FROM World
WHERE area >= 3000000

UNION

SELECT name, population, area
FROM World
WHERE population >= 25000000;
```

---

## Dry Run

Query 1 - area >= 3,000,000

```text
No country in the example has area >= 3,000,000.
Result: empty
```

Query 2 - population >= 25,000,000

```text
| name        | population | area    |
|-------------|------------|---------|
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
```

After UNION

```text
| name        | population | area    |
|-------------|------------|---------|
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
```

---

## UNION vs UNION ALL

```text
UNION     → removes duplicate rows
UNION ALL → keeps duplicate rows
```

Use `UNION` here because a country satisfying both conditions should appear only once.

---

## Complexity

```text
Time  : O(2n)
Space : O(n)   (stores results of both queries before merging)
```

---

# Comparison

| Feature | OR | UNION |
|---------|----|-------|
| Time Complexity | O(n) | O(2n) |
| Space Complexity | O(1) | O(n) |
| Duplicate handling | Automatic | Needs UNION (not UNION ALL) |
| Readability | Simpler | More verbose |
| Preferred | ✅ | ❌ |

---

# Key Idea

### OR approach

Single scan. Include a row if either condition is true.

Simpler and more efficient.

### UNION approach

Two separate scans merged together.

Useful when the two conditions come from different tables or subqueries, but unnecessary here since both conditions are on the same table.
