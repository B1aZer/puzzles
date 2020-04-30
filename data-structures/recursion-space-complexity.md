We can think of recursion as having the same complexity as data structure that
hold stack of all calls. Lets say recursion runs 5 times, then there is a data structure (say
linked list or tree if we have branching) that holds arguments and body of the function
for each call. There would 5 elements in such data structure.

Although we should remember that compilers can often optimize tail calls and reuse same
stack for recursion calls. Given that there are no closures, strict mode and so on.

https://exploringjs.com/es6/ch_tail-calls.html
