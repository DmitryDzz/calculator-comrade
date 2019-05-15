---
layout: page
title: Tips & Tricks
permalink: /tips-n-tricks/
---

# M+, M-, MRC use case

|          |   Price  | Quantity |
|:---------|:---------|:---------|
|  Coffee  |    10    |    13    |
|  Sugar   |     5    |    17    |
|  Milk    |     7    |    20    |

To calculate the total price press `10 * 13 M+ 5 * 17 M+ 7 * 20 M+ MRC`. You’ll get `355`.

# % operation

What is 25% of 40? `40 × 25 %`

If 10 is 25%. What is 100%? `10 ÷ 25 %`

What is 40 + 25%? `40 + 25 %`

40 - 25%? `40 – 25 %`

# MU operation

The product’s price is 100 after 20% discount. What’s the initial price? `100 MU 20 %`.

# Overflow error

`12345678 × 1234 =` returns `ERROR 152.34566`.
The real result is `15234566652` but the calculator has only 8 digits, so it tries to say: `15234566???`.
ERROR flag means that overflow occurred during the calculation and the point after the third digit means that there are three unknown digits more.

# Repeat the last operation

`10 + 5 =` The result is `15`. Press `=` again and get `20`. `=` ⇒ `25`, and so on.

`10 – 5 =` ⇒ `5`, again `=` ⇒ `0`, `=` ⇒ `-5`, and so on.

`24 ÷ 2 =` ⇒ `12`, `=` ⇒ `6`, `=` ⇒ `3`, `=` ⇒ `1.5`.

**Note #1.** With multiplication, the trick works in another way. `2 × 3 =` ⇒ `6`, `=` ⇒ `12`, `=` ⇒ `24`. The result is multiplied by 2 (the first operand, not the second one, as for `+`, `–` and `÷` operations).

**Note #2.** You can’t repeat % and MU operations.

# Counter (+=)

`1 + =` returns `1`. Press `=` again and get `2`, one more `=` will return `3` and so on. Note, that later you can type a new number and continue counting from it.

# Power (×=)

`2 × =` ⇒ `4` (2²)

`2 × = =` ⇒ `8` (2³)

`2 × = = =` ⇒ `16` (2⁴)

or

`2 × = × =` ⇒ `16` (2⁴)

# 1/x (÷=)

`10 ÷ =` ⇒ `0.1`

`5 + 5 ÷ =` ⇒ `0.1`

`2 × 3 + 4 ÷ =` ⇒ `0.1`

# Change sign (–=)

`5 – =` will return `-5`. You can use it in expressions.

`2 + 3 – =` ⇒ `-5`

`7 – 2 – =` ⇒ `-5`

`10 ÷ 2 – =` ⇒ `-5`

**WARNING:** this trick doesn’t work if the last operation in the expression is multiplication:

`1 + 2 × 3 – =` the result is `-4` while we expect `-9`.

**Workaround:** `1 + 2 × 3 + 0 – =` ⇒ `-9`

# Quadratic equations

ax²+bx+c=0

D=b²–4ac

x₁=(-b–√D)/(2a)

x₂=(-b+√D)/(2a)

A quick method of calculating √D and saving it to memory:

`b × = M+ 4 × a × c M- MRC MRC √ M+ C/AC`.

x₁: `– b – MRC ÷ 2 ÷ a`

x₂: `– b + MRC ÷ 2 ÷ a`

# Fibonacci numbers

`1 + =` ⇒ `1`

`+ =` ⇒ `2`

`+ =` ⇒ `3`

`+ =` ⇒ `5`

`+ =` ⇒ `8`
