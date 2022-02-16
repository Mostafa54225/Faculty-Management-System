const ChainUtil = require('../util/chain-util')
const { DIFFICULTY }= require('../util/config')
const MerkleTree = require('./merkleTree')
const fs = require('fs')
const cryptoHash = require('../util/crypto-hash')

class Block {
  constructor(timestamp, previousHash, hash, nonce, merkleRoot, height, data) {
    this.timestamp = timestamp
    this.previousHash = previousHash
    this.hash = hash
    this.nonce = nonce
    this.MerkleRoot = merkleRoot
    this.DIFFICULTY = DIFFICULTY
    this.height = height
    this.data = data

  }
  toString() {
    return `Block --
      Timestamp: ${this.timestamp}
      Previous Hash: ${this.previousHash.substring(0, 10)}
      Hash: ${this.hash.substring(0, 10)}
      Nonce: ${this.nonce}
      Merkle Root: ${this.merkleRoot}
      DIFFICULTY: ${this.DIFFICULTY}
      Block Height: ${this.height}
      Data: ${this.data}`
  }

  static genesis() {
    const block =  new this('Genesis time', '-----', 'f1r57-h45h', 0, 'm3rkl3-r00t', 1, [])
    return block
  }


  static mineBlock(previousBlock, data) {

    // Proof of Work
    let hash, timestamp
    const previousHash = previousBlock.hash
    let nonce = 0

    do {
      nonce++
      // console.log(nonce)
      timestamp = Date.now();
      
      hash = this.hash(previousHash, data, nonce)
    } while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))

    timestamp = this.convertTimestampToDate(timestamp)


    let txHashs = this.getTransactionsHashs(data)


    let root = MerkleTree.merkleRoot(txHashs)

    return new this(timestamp, previousHash, hash, nonce, root, previousBlock.height + 1, data)
  }

  static hash(timestamp, previousHash, data, nonce) {
    return cryptoHash(timestamp, previousHash, data, nonce)
    // return ChainUtil.hash(`${timestamp}${previousHash}${data}${nonce}`).toString()
  }
  
  static blockHash(block) {
    const { previousHash, data, nonce } = block
    return this.hash(previousHash, data, nonce)
  }


  static getTransactionsHashs(transactions) { 
    let txHashs = []
    transactions.forEach((transaction) => {
      txHashs.push(transaction.hash)
    })
    return txHashs
  }


  static convertTimestampToDate(timestamp) {
    const dateObject = new Date(timestamp)
    return dateObject.toLocaleString()
  }

}

module.exports = Block