import { useEffect, useState } from "react";
import Axios from 'axios'
const useRoles = () => {
  const [currentAccount, setCurrentAccount] = useState(undefined)
  const [role, setRole] = useState()

  useEffect(() => {
    let mounted = true
    async function fetchData() {
      if(mounted) {
        const account = await Axios.get("/api/public-key")
        setCurrentAccount(account.data.publicKey)
        setRole(account.data.role)
      }
    }
    fetchData()
    return () => (mounted = false)
  }, [])

  // useEffect(() => {
  //   let mounted = true
  //   async function fetchData() {
  //     if(mounted) {
  //       const r = await Axios.get("/api/role/" + currentAccount)        
  //       setRole(r.data.role)
  //     }
  //   }
  //   fetchData()
  //   return () => (mounted = false)
  // }, [currentAccount])


  
  
  
  return {currentAccount, role}
}
export default useRoles