Probability of independent events

```
P(A) = num of events satisfying A / num of all equally likely events
```

Addition rule (mutually exclusive)

```
P(A or B) = P(A) + P(B) - P(A and B)
```

Succesive events

```
P(AA) = P(A) * P(A)
```

At least 1

```
P(1A) = num of combinations with 1 / all combinations

P(1A) = 1 - P(not 1A)

1 = P(not 1A) + P(1A)
```

Dependent events
Probability of 1 st event multiple second event given 1 even successful

```
P(2A) = P(1A) * P(1A | 1A)
```

If we have multiple event and we need to give common (sum of) probability. We
construct a probability tree and calculate probability for each node of the
tree, given 1st event, 2nd event and so on. Then we sum up all probabilities.

Determine probability of coin (it could be either fair (50%) or unfair(51% t))
pulled out of 5 (4 fair, 1 unfair) coins flipps 2 heads.
```
Sum P(2H) - (1/5 * (0.49 (h) * 0.49 (h)) + (4/5 * 0.5 (h) * 0.5 (h))
```
