const express = require("express")
const Blockchain = require("../blockchain/blockchain")
const IPFSStorage = require("../blockchain/ipfsStorage")
const P2pServer = require("./p2p-server")
const Wallet = require("../wallet")
const TransactionPool = require("../wallet/transaction-pool")
const Miner = require("./miner")
const path = require('path')
const cors = require('cors')
const Roles = require('../wallet/roles')
const { onlyAdmin } = require("../util/middleware")


const HTTP_PORT = process.env.HTTP_PORT || 5001

const app = express()
const bc = new Blockchain()
const ipfsStorage = new IPFSStorage()
const roles = new Roles()
const wallet = new Wallet()
const tp = new TransactionPool()
const p2pServer = new P2pServer(bc, tp, ipfsStorage, roles)

const miner = new Miner(bc, tp, wallet, p2pServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../client/dist')))
app.use(cors())

app.get("/api/blocks", (req, res) => {
  res.json(bc.chain)
})

app.post("/api/mine", (req, res) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New Block Added: ${block.toString()}`)

  p2pServer.syncChains()

  res.redirect("/api/blocks")
})

app.post("/api/transact", (req, res) => {
  const {data, type} = req.body
  const transaction = wallet.createTransaction(data, tp, type)
  p2pServer.broadCastTransaction(transaction)
  res.redirect("/api/transactions")
})

app.get("/api/transactions", (req, res) => {
  res.json(tp.transactions)
})

app.get("/api/mine-transactions", (req, res) => {
  try {
    const block = miner.mine()
    // res.redirect("/api/blocks")
    res.sendStatus(200)
  } catch(error) {
    res.status(400).json({ type: "error", message: error.message })
  }
})

app.get("/api/public-key", (req, res) => {
  const address = wallet.publicKey
  res.json({ publicKey: address })
})


app.get('/api/address/:address', (req, res) => {
  const address = req.params.address
  const addressTransactions = bc.getAddressData(address)
  res.json(addressTransactions)
})
app.post("/api/makeRole", (req, res) => {
  
  const { address, roleName } = req.body
  try {
    roles.makeRoleAddress(address, roleName)
    p2pServer.broadCastRoleAddress(address, roleName)
    res.json(200)
  } catch(error) {
    res.send(400)
  }
})

app.get("/api/role/:address", (req, res) => {  
  const address = req.params.address
  const role = roles.getRole(address)

  res.json(role)
})

app.post("/api/deleteStudent", onlyAdmin(roles), (req, res) => {
  const studentAddress = req.body.studentAddress
  roles.deleteRoleAddress(studentAddress)
  p2pServer.broadCastDeleteRoleAddress(studentAddress)
  res.json(200)
})


app.get("/api/getAddressTransactions/:address", (req, res) => {
  const address = req.params.address
  const transactions = tp.getAddressTransactions(address)
  res.json(transactions)
})


app.get("/api/:block/:transactionHash", (req, res) => {
  // const block = bc.chain[parseInt(req.params.block)]
  // const root = block.MerkleRoot
  // const tx = block.data.find(
  //   (transaction) => transaction.hash === req.params.transactionHash
  // )
  // if (tx === undefined) {
  //   res.json(false)
  //   return
  // }
  // const txs = Block.getTransactionsHashs(block.data)
  // let hash = tx.hash

  // const proof = MerkleTree.merkleProof(txs, hash)
  // res.json(MerkleTree.merkleProofRoot(proof, hash) === root)
})


app.post("/api/setIPFSLinkCourses", onlyAdmin(roles),  (req, res) => {
  ipfsStorage.addIpfsCoursesLink(req.body.ipfsLinkCourses)
  p2pServer.broadCastIPFSLinkCourses(req.body.ipfsLinkCourses)
  res.json("ok")
})


app.get("/api/getIPFSLinkCourses", (req, res) => {
  res.json(ipfsStorage.getIpfsCoursesLink())
})



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
p2pServer.listen()