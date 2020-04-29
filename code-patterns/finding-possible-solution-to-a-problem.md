Most of computer problems can be solved either iteratively or through
recurrence. Sometimes these solutions can be telescoped to a closed form and
solved for N.

But in most cases it would be hard to do, especially for recurrence. In these cases we
could rely on following techniques:

 - Brute force algorithm
 - Backtracking
 - Dynamic programming

In a general sense. The most optimal solution is a closed form. Closed form
derived through mathematics and can be calculated without use of computer. Brute force is
naive programming approach for the problem. Backtracking is a programmatically optimized brute
force algorithm (optimal data structure). Dynamic programming is mathematically and
programmatically (caching, data structure) optimized algorithm 


Let's look at example:

Consider the problem of assigning values, either zero or one, to the positions of an n × n
matrix, with n even, so that each row and each column contains exactly n / 2 zeros and n /
2 ones. We ask how many different assignments there are for a given n.
For example, when n = 4, four possible solutions are:

```
0 1 0 1   0 0 1 1   1 1 0 0   1 0 0 1
1 0 1 0   0 0 1 1   0 0 1 1   0 1 1 0
0 1 0 1   1 1 0 0   1 1 0 0   0 1 1 0
1 0 1 0   1 1 0 0   0 0 1 1   1 0 0 1
```

Brute force consists of checking all assignments of zeros and ones and counting those that
have balanced rows and columns (n / 2 zeros and n / 2 ones). As there are [n n/2]^n possible assignments, this strategy is not
practical except maybe up to n=6.

Backtracking for this problem consists of choosing some order of the matrix elements and
recursively placing ones or zeros, while checking that in every row and column the number
of elements that have not been assigned plus the number of ones or zeros are both at least
n / 2. While more sophisticated than brute force, this approach will visit every solution
once, making it impractical for n larger than six, since the number of solutions is
already 116,963,796,250 for n = 8, as we shall see.

Dynamic programming makes it possible to count the number of solutions without visiting
them all. Imagine backtracking values for the first row – what information would we
require about the remaining rows, in order to be able to accurately count the solutions
obtained for each first row value? We consider k × n boards, where 1 ≤ k ≤ n, whose k rows
contain n/2 zeros and n/2 ones. The function f to which memoization is applied maps
vectors of n pairs of integers to the number of admissible boards (solutions). There is
one pair for each column, and its two components indicate respectively the number of zeros
and ones that have yet to be placed in that column. We seek the value of
f((n/2,n/2),(n/2,n/2),... (n/2,n/2)) (n arguments or one vector of n elements). The
process of subproblem creation involves iterating over every one of g possible assignments
for the top row of the board, and going through every column, subtracting one from the
appropriate element of the pair for that column, depending on whether the assignment for
the top row contained a zero or a one at that position. If any one of the results is
negative, then the assignment is invalid and does not contribute to the set of solutions
(recursion stops). Otherwise, we have an assignment for the top row of the k × n board and
recursively compute the number of solutions to the remaining (k − 1) × n board, adding the
numbers of solutions for every admissible assignment of the top row and returning the sum,
which is being memoized. The base case is the trivial subproblem, which occurs for a 1 × n
board. The number of solutions for this board is either zero or one, depending on whether
the vector is a permutation of n / 2 g(0,1) and n / 2 g(1,0) pairs or not.

The number of solutions is

```
1,2,90,297200,116963796250,6736218287430460752,...
```

https://en.wikipedia.org/wiki/Dynamic_programming#A_type_of_balanced_0%E2%80%931_matrix

Be aware that some sequences already have solutions in OEIS database

https://oeis.org/
