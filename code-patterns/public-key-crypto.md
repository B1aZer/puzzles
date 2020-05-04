Cryptography is used everywhere and were used from ancient times, when
Generals had to sent messages to troops.

It was mathematically proved that if we use new key each time and we have equal
distribution in cyphertext it is not possiblt to decrypt it. The scheme is
called one time pad. Or symmetric encryption. Symmetric encryption requires key
which can be obtained through public/private key cryptography.

Public/private key cryptography is based on notion that function is easy in one
direction, but is hard in reverse.

For example, it's easy to mix colors but hard to find color mixed from result.
Or in math terms, it's easy to multiply numbers but hard to find factors of
the product.

This logic lies in the heart of Diffie-Hellman key exchange. Protocol uses
multiplicative group of integers modulo p, where p is prime and g is a
primitive root modulo p. Or in simpler terms, it's easy to compute powers
modulo a prime, but hard to reverse. Which power of 2 modulo 11 is 7? (See
discrete logarithm).

The problem with Diffie-Hellman exchange is that we need to send and receive
message from recipient in order to set common key. This means recipient should
have private key and we need to store key for each recipient. The better
algorithm is RSA.

RSA algorithm allows to send public key which can be used to encrypt message.
Encrypted message can then be decrypted with private key. Or in simpler terms,
instead of obtaining and storing key we have one key and send lock over the
public canal. Recipient put message in the lock and send it back to us. We need
only one key, which we store and recipient does not require to have private
key. But RSA algorithm requires so, since private key can also
be used to sign message and prove identity (or holder of the private key).

Digital signatures are a way to validate the authenticity and integrity
of any data. To create a digital signature, the signing software creates a
one-way hash of the data to be signed. The private key is then used to encrypt
the hash. The resulting sequence is again interpreted as in integer, and
exponentiated modulo N, but this time the private exponent is used. Moreover,
most RSA implementations actually optimize that operation by using the Chinese
Remainder Theorem through their knowledge of the factors of N (these factors
are part of the private key).

Or in simpler terms:

 - generate 2 prime numbers p,q
 - compute product n
 - compute totient function and coprime to it's output t,e
 - compute modular multiplicative inverse d
 - pad message m

Then public key function is c(m) = m^e mod n
The private key function is m(c) = c^d mod n


```js
'use strict';

/**
 * RSA hash function reference implementation.
 * Uses BigInteger.js https://github.com/peterolson/BigInteger.js
 * Code originally based on https://github.com/kubrickology/Bitcoin-explained/blob/master/RSA.js
 */
const RSA = {};

/**
 * Generates a k-bit RSA public/private key pair
 * https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Code
 *
 * @param   {keysize} int, bitlength of desired RSA modulus n (should be even)
 * @returns {array} Result of RSA generation (object with three bigInt members: n, e, d)
 */
RSA.generate = function(keysize) {
  /**
   * Generates a random k-bit prime greater than √2 × 2^(k-1)
   *
   * @param   {bits} int, bitlength of desired prime
   * @returns {bigInt} a random generated prime
   */
  function randomPrime(bits) {
    const min = bigInt(6074001000).shiftLeft(bits - 33);  // min ≈ √2 × 2^(bits - 1)
    const max = bigInt.one.shiftLeft(bits).minus(1);  // max = 2^(bits) - 1
    for (;;) {
      const p = bigInt.randBetween(min, max);  // WARNING: not a cryptographically secure RNG!
      if (p.isProbablePrime(256)) {
        return p;
      }
    }
  }

  // set up variables for key generation
  const e = bigInt(65537);  // use fixed public exponent
  let p;
  let q;
  let lambda;

  // generate p and q such that λ(n) = lcm(p − 1, q − 1) is coprime with e and |p-q| >= 2^(keysize/2 - 100)
  do {
    p = randomPrime(keysize / 2);
    q = randomPrime(keysize / 2);
    lambda = bigInt.lcm(p.minus(1), q.minus(1));
  } while (bigInt.gcd(e, lambda).notEquals(1) || p.minus(q).abs().shiftRight(
      keysize / 2 - 100).isZero());

  return {
    n: p.multiply(q),  // public key (part I)
    e: e,  // public key (part II)
    d: e.modInv(lambda),  // private key d = e^(-1) mod λ(n)
  };
};

/**
 * Encrypt
 *
 * @param   {m} int / bigInt: the 'message' to be encoded
 * @param   {n} int / bigInt: n value returned from RSA.generate() aka public key (part I)
 * @param   {e} int / bigInt: e value returned from RSA.generate() aka public key (part II)
 * @returns {bigInt} encrypted message
 */
RSA.encrypt = function(m, n, e) {
  return bigInt(m).modPow(e, n);
};

/**
 * Decrypt
 *
 * @param   {c} int / bigInt: the 'message' to be decoded (encoded with RSA.encrypt())
 * @param   {d} int / bigInt: d value returned from RSA.generate() aka private key
 * @param   {n} int / bigInt: n value returned from RSA.generate() aka public key (part I)
 * @returns {bigInt} decrypted message
 */
RSA.decrypt = function(c, d, n) {
  return bigInt(c).modPow(d, n);
};
```
