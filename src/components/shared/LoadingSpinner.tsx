import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingSpinner = ({className}:{className?:string}) => {
  return (
    <div className={cn("flex justify-center items-center min-h-[calc(100vh-96px)]", className)}>
      <Loader2 className="w-10 h-10 animate-spin text-black" />
    </div>
  )
}

export default LoadingSpinner