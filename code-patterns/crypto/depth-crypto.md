Stream cypher

In stream cypher each plaintext digit combined with cooresponding digit of key
to produce cypher digit. In practice digit is typically a bit and operation is
XOR. Example - Vernam cypher.

Block cypher

Block cypher operates on large block of digits with a fixed unvarying
transformation. Block cypher also aplies diffusion (letter distribution should
not correlate with cyphertext distribution) to the cyphertext (in
contrast of confusion in stream cypher). Example - Fiestel cypher.

Indicator

Usually, the transmitting operator informed the receiving operator of this
message key by transmitting some plaintext and/or ciphertext before the
enciphered message. This is termed the indicator, as it indicates to the
receiving operator how to set his machine to decipher the message.

Depth

Sending two or more messages with the same key is an insecure process. To a
cryptanalyst the messages are then said to be "in depth."

Generally, the cryptanalyst may benefit from lining up identical enciphering
operations among a set of messages. For example, the Vernam cipher enciphers by
bit-for-bit combining plaintext with a long key using the "exclusive or"
operator, which is also known as "modulo-2 addition".

Plaintext XOR Key = Ciphertext

Deciphering combines the same key bits with the ciphertext to reconstruct the plaintext.

Ciphertext XOR Key = Plaintext

When two such ciphertexts are aligned in depth, combining them eliminates the common key, leaving just a combination of the two plaintexts.

Ciphertext1 XOR Ciphertext2 = Plaintext1 XOR Plaintext 2

The individual plaintexts can then be worked out linguistically by trying
probable words (or phrases), also known as "cribs," at various locations; a
correct guess, when combined with the merged plaintext stream, produces
intelligible text from the other plaintext component.

(Plaintext1 XOR Plaintext2) XOR Plaintext1 = Plaintext2

The recovered fragment of the second plaintext can often be extended in one or
both directions, and the extra characters can be combined with the merged
plaintext stream to extend the first plaintext. Working back and forth between
the two plaintexts, using the intelligibility criterion to check guesses, the
analyst may recover much or all of the original plaintexts. When a recovered
plaintext is then combined with its ciphertext, the key is revealed.

Ciphertext XOR Plaintext = Key
