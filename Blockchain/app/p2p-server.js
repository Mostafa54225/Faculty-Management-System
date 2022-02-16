const Websocket = require("ws")

const P2P_PORT = process.env.P2P_PORT || 7001
const peers = process.env.PEERS ? process.env.PEERS.split(",") : []

const MESSAGE_TYPES = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
  clear_transactions: "CLEAR_TRANSACTIONS",
  ipfsLinkCourses: "IPFS_LINK_COURSES",
  role: "ROLE",
  deleteRole: "DELETE_ROLE",
}

class P2pServer {
  constructor(blockchain, transactionPool, ipfsStorage, roles) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.sockets = []
    this.ipfsStorage = ipfsStorage
    this.roles = roles
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT })
    server.on("connection", (socket) => this.connectSocket(socket))

    // handle later instances of the application connecting to the peers that are specified when the node start
    this.connectToPeers()

    console.log(`Listening for peer-to-peer connection on: ${P2P_PORT}`)
  }

  connectToPeers() {
    console.log(peers)
    peers.forEach((peer) => {
      const socket = new Websocket(peer)

      socket.on("open", () => this.connectSocket(socket))
    })
  }

  // all the sockets run in the connectSocket function
  connectSocket(socket) {
    console.log("Socket: " + socket)
    this.sockets.push(socket)
    console.log(`Connected to a peer: ${socket.url}`)

    // attach the message handler
    this.messageHandler(socket)

    this.sendChain(socket)
    this.broadCastIPFSLinkCourses(this.ipfsStorage.getIpfsCoursesLink())
  }

  // this function handle the messages that comes from sendChain and sendTransaction Functions
  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message)

      switch (data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replaceChain(data.chain)
          break

        case MESSAGE_TYPES.transaction:
          this.transactionPool.AddTransaction(data.transaction)
          break

        case MESSAGE_TYPES.clear_transactions:
          this.transactionPool.clear()
          break
        case MESSAGE_TYPES.ipfsLinkCourses:
          this.ipfsStorage.addIpfsCoursesLink(data.ipfsLinkCourses)
          break
        case MESSAGE_TYPES.role:
          this.roles.makeRoleAddress(data.address, data.role)
          break
        case MESSAGE_TYPES.deleteRole:
          this.roles.deleteRoleAddress(data.address)
          break

      }
    })
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.chain,
        chain: this.blockchain.chain,
      })
    )
  }
  
  sendTransaction(socket, transaction) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.transaction,
        transaction,
      })
    )
  }

  sendIPFSLinkCourses(socket, ipfsLinkCourses) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.ipfsLinkCourses,
        ipfsLinkCourses,
      })
    )
  }

  sendRoleAddress(socket, address, role) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.role,
        address,
        role,
      })
    )
  }

  snedDeleteRoleAddress(socket, address) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.deleteRole,
        address
      })
    )
  }

  syncChains() {
    this.sockets.forEach((socket) => this.sendChain(socket))
  }

  // broadcast one transaction to all nodes
  broadCastTransaction(transaction) {
    this.sockets.forEach((socket) => this.sendTransaction(socket, transaction))
  }

  broadCastIPFSLinkCourses(ipfsLinkCourses) {
    this.sockets.forEach((socket) => this.sendIPFSLinkCourses(socket, ipfsLinkCourses))
  }

  broadCastRoleAddress(address, role) {
    this.sockets.forEach((socket) => this.sendRoleAddress(socket, address, role))
  }

  broadCastDeleteRoleAddress(address) {
    this.sockets.forEach((socket) => this.snedDeleteRoleAddress(socket, address))
  }

  broadCastClearTransactions() {
    this.sockets.forEach((socket) =>
      socket.send(
        JSON.stringify({
          type: MESSAGE_TYPES.clear_transactions,
        })
      )
    )
  }
}

module.exports = P2pServer
