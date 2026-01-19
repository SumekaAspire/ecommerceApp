import bcrypt from 'bcryptjs';

/*
 bcrypt needs random bytes to generate a secure salt for hashing passwords.
 In web browsers / Node.js, bcrypt automatically gets secure random numbers.
 But in React Native, that secure random generator is missing.
 So bcrypt shows a warning:
 "Math.random is not cryptographically secure!"

 setRandomFallback() tells bcrypt:
 "If you don’t find a secure random generator,
 use this function to generate random bytes instead."
*/
bcrypt.setRandomFallback((len: number) => {
  /*
   len = number of random bytes bcrypt is requesting.
   bcrypt internally decides how many random bytes it needs
   for creating a salt. We don't manually pass len.
   bcrypt calls this function automatically with len value.
  */

  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes);
});

/** why 256:
 * A byte can store numbers from 0 to 255 (2⁸ = 256).
So to fill a byte array (Uint8Array) with random bytes, we need integers in [0, 255].
Math.random() * 256 → gives decimal numbers between 0 and 255.999...
Math.floor() → rounds down to integers from 0 to 255, perfect for a byte.
 */
