'use client'

import { useLoading } from '@/src/contexts/LoadingContext'
import Spinner from './Spinner'

export default function LoadingOverlay() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-4">
        <Spinner size="lg" />
      </div>
    </div>
  )
}
