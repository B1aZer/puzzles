Mathematical induction reminds us of reduction.

It consists of:

 - Prove of base case (0 or 1)
 - Prove of next step (base + 1)

Think of billion of dominos. How can we prove they all fold after we
fold first one? We have to prove that first domino will fold and the
domino will tip the next domino.

We can use the same logic on task solving.

Let's take factorial algorithm as example. 4! = 24.

1. Checking that algorithm works. Compute it on 4. if it gives 24 it
works.

2. Check that algorith is finite. I.e. it will stop after some condition is met.

3. Apply induction. Prove base case.

4. Prove base + 1 case. Prove loop invariant (loop condition is true).

We assume that the invariant is true for k. After going through the
loop k times, factorial should equal k! and i = k + 1.

Starting from that assumption we prove that invariant is also true for k + 1,
number after k. After going through the loop k + 1 times, factorial should
equal (k+1)! and i = (k + 1) + 1.

To do that, walk through the function factorial(k+1). After k repetitions
factorial stores k! and i stores k + 1. k+1 iteration, factorial set to k! *
(k+1) and i = k + 2. At this point i is greater than n (k + 1), algorithm
exits.

The invariant holds true. factorial stores k! * (k + 1), which is equivalent to
(k + 1)! and i = k + 2 = (k + 1) + 1.

We can conclude that factorial exits after n repetitions and returns n!.

If the alogirith is crucial than it's always should be mathematically proved
or, better, written in the language that support mathematical proving.
