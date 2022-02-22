const ChainUtil = require('../util/chain-util');
const Transaction = require('./transaction');

// const { createSign, createVerify } = require('crypto');

class Wallet {
  constructor() {
    this.data = []
    
    this.keyPair = ChainUtil.genKeyPair()
    this.publicKey = this.keyPair.getPublic().encode('hex')
    // this.keyPair = ChainUtil.generateKeyPairRSA()
    // if(!roles.isAdmin(this.publicKey)) 
  }


  


  toString() {
    return `Wallet --
    data: ${JSON.stringify(this.data)}
    publicKey: ${this.publicKey.toString()}}`
  }


  generateKeys() {
    this.keyPair = ChainUtil.genKeyPair()
    this.publicKey = this.keyPair.getPublic().encode('hex')
  }

  sign(dataHash) {

    /*
      signature with RSA Algorithm
    */

    // const signer = createSign('sha256')
    // signer.update(dataHash)
    // const signature = signer.sign(this.pk.privateKey, 'hex')
    // console.log(signature)
    // return signature


    // elliptic model gives us a method called (sign) within keyPair object
    // this allows us to take any data and return a (Signature) based on a keyPair (private key and a Hash data)
    // Later on the generated (Signature and Public Key) will be used to verify the authenticity of the Signature
    /*
      signature with Elliptic Algorithm
    */
    return this.keyPair.sign(dataHash)

  }

  createTransaction(data, transactionPool) {
    // console.log("Private Key: " + this.keyPair.getPrivate().toString('hex'))
    // console.log("Public Key: " + this.publicKey)
    // console.log(this.pk)
    let transaction = transactionPool.existingTransaction(this.publicKey)
    transaction = Transaction.newTransaction(this, data)
    transactionPool.AddTransaction(transaction)
    
    return transaction
  }
}

module.exports = Wallet