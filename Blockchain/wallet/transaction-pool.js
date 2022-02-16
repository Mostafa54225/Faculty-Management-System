const Transaction = require("./transaction")

class TransactionPool {
  constructor() {
    this.transactions = []
  }

  AddTransaction(transaction) {
    // let transactionWithId = this.transactions.find(t => t.id === transaction.id)

    this.transactions.push(transaction)
  }

  validTransactions() {
    return this.transactions.filter((transaction) => {
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid Signature from ${transaction.input.address}`)
        return
      }
      return transaction
    })
  }

  existingTransaction(address) {
    return this.transactions.find((t) => t.input.address === address)
  }

  getAddressTransactions(address) {
    return this.transactions.filter((t) => t.input.address === address)
  }

  getAddressLastTransaction(address) {
    return this.transactions.find((t) => t.input.address === address)
  }

  clear() {
    this.transactions = []
  }
}

module.exports = TransactionPool
