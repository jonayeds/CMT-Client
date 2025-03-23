import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-96px)]">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  )
}

export default LoadingSpinner