const ChainUtil = require('../util/chain-util');

class Transaction {
  constructor() {
    // this.id = ChainUtil.id()
    this.hash = null
    this.input = null
    this.outputs = null
  }


  static newTransaction(senderWallet, data) {
    const transaction = new this()


    // if Elliptic Algorithm
    // transaction.outputs.push(...[
    //   {data, address: senderWallet.publicKey},
    // ])

    transaction.outputs = {
      data,
      address: senderWallet.publicKey,
    }

    // if RSA Algoithm
    // transaction.outputs.push(...[
    //   {data, address: senderWallet.keyPair.publicKey},
    // ])


    Transaction.signTransaction(transaction, senderWallet)
    return transaction
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: this.convertTimestampToDate(Date.now()),
      // data: senderWallet.data,
      address: senderWallet.publicKey,
      // address: senderWallet.keyPair.publicKey,     // if RSA Algorithm
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
    transaction.hash = ChainUtil.hash(transaction)
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    )
  }

  
  static convertTimestampToDate(timestamp) {
    const dateObject = new Date(timestamp)
    return dateObject.toLocaleString()
  }
}

module.exports = Transaction