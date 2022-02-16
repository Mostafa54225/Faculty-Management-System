class IPFSStorage {
  constructor() {
    this.coursesLink = ""
  }
  addIpfsCoursesLink(coursesLink) {
    this.coursesLink = coursesLink
  }

  getIpfsCoursesLink() {
    return this.coursesLink
  }
}

module.exports = IPFSStorage