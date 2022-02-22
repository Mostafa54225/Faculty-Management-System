

class Roles {
  constructor() {
    this.roles = []

  }

  makeRoleAddress(address, role) {
    this.roles.push({ address: address, role: role })
  }

  // makeStudentAddress(address) {
  //   this.roles.push({address: address, role: 'student'})
  // }

  isAdmin(address) {
    return this.roles.find(
      (role) => role.address === address && role.role === "admin"
    )
  }
  isStudent(address) {
    return this.roles.find(
      (role) => role.address === address && role.role === "student"
    )
  }

  getRole(address) {
    return this.roles.find((role) => role.address === address)
  }

  deleteRoleAddress(address) {
    this.roles = this.roles.filter((role) => role.address !== address)
  }
}

module.exports = Roles
