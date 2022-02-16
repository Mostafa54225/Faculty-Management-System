const EC = require("elliptic").ec
const SHA256 = require("crypto-js/sha256")
const ec = new EC("secp256k1")

const { generateKeyPairSync } = require('crypto')


const { createVerify } = require('crypto');

// sec stands for Standards for Efficient Cryptography
// p for prime field
// 256 for bit length

const { v1: uuidv1 } = require('uuid')

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair()
  }

  static generateKeyPairRSA() {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    })

    return { publicKey, privateKey }
  }

  static id() {
    return uuidv1()
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString()
  }
  

 
  static verifySignature(publicKey, signature, dataHash) {


    /*
      Verification with RSA Algorithm
    */
    // const verifier = createVerify('sha256')
    // verifier.update(dataHash)

    // const isVerified = verifier.verify(publicKey, signature, 'hex')
    // console.log(isVerified)
    // return isVerified


    /*
      Verification with Elliptic Algorithm
    */
    // console.log(publicKey)
    // console.log(signature)
    // console.log(dataHash)
    // console.log(ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature))
    return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature)
  }
}



module.exports = ChainUtil
