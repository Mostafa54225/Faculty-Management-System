
function onlyAdmin(roles) {
  return async function (req, res, next) {
    const address = req.body.address
    const role = roles.getRole(address)
    if(role === undefined || role.role !== 'admin') {
      return res.status(403).send({error: { status:403, message:'Access denied.'}});
    }
    next()
   }  
}


module.exports = {onlyAdmin}

