const tweetnacl = require("tweetnacl");
const { box, randomBytes } = tweetnacl;
const tweetUtil = require("tweetnacl-util");

const generateKeyPair = () => box.keyPair();

// const obj = { hello: "world" };

module.exports.getKeyPair = () => {
  const pairA = generateKeyPair();
  const pairB = generateKeyPair();
  const sharedA = box.before(pairB.publicKey, pairA.secretKey);
  const sharedB = box.before(pairA.publicKey, pairB.secretKey);

  return { sharedA, sharedB };
};

// const encrypted = encrypt(sharedA, obj);
// const decrypted = decrypt(sharedB, encrypted);
// console.log(obj, encrypted, decrypted);
