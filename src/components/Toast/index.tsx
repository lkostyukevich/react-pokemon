import { useEffect } from 'react'
import './style.css'

type ToastProps = {
  message: string
  onClose: () => void
}

export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 1000)

    return () => clearTimeout(timer)
  }, [onClose])

  return <div className="toast">{message}</div>
}
