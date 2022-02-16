// every miner has a wallet 
class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.wallet = wallet
    this.p2pServer = p2pServer
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions()
    if(validTransactions.length !== 0) {
      // add valid transactions from the transaction pool
      const block = this.blockchain.addBlock(validTransactions)
      // sync chain for all the nodes in the network
      this.p2pServer.syncChains()


      // clear the transaction pool after mining
      this.transactionPool.clear()

      // broadcast the cleared transaction  pool
      this.p2pServer.broadCastClearTransactions()

      return block
    }
    return null
  }
}

module.exports = Miner