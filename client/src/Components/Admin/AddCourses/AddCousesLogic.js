import React, { useState } from "react"
import Axios from "axios"
import showNotification from "../../utils/ShowNotifications"
import ipfs from "../../utils/ipfs"
const CID = require("cids")

const useAddCourses = (currentAccount) => {
  const [buffer, setBuffer] = useState("")

  const captureFile = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const file = e.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader)
  }
  const convertToBuffer = async (reader) => {
    const buffer = Buffer.from(reader.result)
    setBuffer(buffer)
  }

  const setIpfsHashCourses = async () => {
    try {
      let hashV0 = await ipfs.add(buffer)
      let hashV1 = new CID(hashV0[0].path).toV1().toString("base32")
      
      await Axios.post("/api/setIPFSLinkCourses", {
        ipfsLinkCourses: hashV1,
        address: currentAccount 
      })
      showNotification("Success", "File Added to IPFS Successfully", "success")
    } catch (error) {
      // showNotification("Error", "File Not Added", "Danger")
      console.log(error)
    }
  }

  return { captureFile, convertToBuffer, setIpfsHashCourses }
}

export default useAddCourses
