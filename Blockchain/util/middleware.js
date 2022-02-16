

function onlyAdmin(wallet) {
  return async function (req, res, next) {
    // const address = req.body.address
    // const role = roles.getRole(address)
    const address = wallet.publicKey
    const role = wallet.role
    console.log(role)
    if(role !== 'admin') {
      return res.status(403).send({error: { status:403, message:'Access denied.'}});
    }
    next()
   } 
}


module.exports = {onlyAdmin}

