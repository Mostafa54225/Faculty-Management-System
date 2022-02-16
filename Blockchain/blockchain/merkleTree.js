const ChainUtil = require("../util/chain-util")

class MerkleTree {
  static merkleRoot(txHashs) {
    let result = []

    this.toPairs(txHashs).forEach((pair, i) => {
      console.log(pair)
      result.push(this.hashPair(...pair))
      // console.log(result)
    })

    if (result.length === 1) {
      return result.join("")
    }
    return this.merkleRoot(result)
  }

  static merkleProof(txs, tx, proof = []) {
    if (txs.length === 1) return proof

    const tree = []
    this.toPairs(txs).forEach((pair) => {

      const hash = this.hashPair(...pair)

      if (pair.includes(tx)) {
        const index = (pair[0] === tx) | 0
        proof.push([index, pair[index]])
        tx = hash
      }
      // console.log(hash)
      tree.push(hash)
    })
    return this.merkleProof(tree, tx, proof)
  }

  static merkleProofRoot(proof, tx) {
    return proof.reduce(
      (root, [index, tx]) =>
        index ? this.hashPair(root, tx) : this.hashPair(tx, root),
      tx
    )
  }

  static hashPair(a, b = a) {
    return ChainUtil.hash(`${a}${b}`)
  }

  static toPairs(arr) {
    return Array.from(Array(Math.ceil(arr.length / 2)), (_, i) =>
      arr.slice(i * 2, i * 2 + 2)
    )
  }



}

module.exports = MerkleTree
