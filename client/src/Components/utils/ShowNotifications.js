import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


export default function showNotification(title, message, type){
  store.addNotification({
    title: title,
    message: message,
    type: type,
    container: "top-right",
    insert: "top",
    dismiss: {
      duration: 3500,
      onScreen: true
    }
  })
}