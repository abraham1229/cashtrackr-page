'use client'

import { useLoading as useLoadingContext } from '@/src/contexts/LoadingContext'

export function useLoading() {
  return useLoadingContext()
}

// Hook para manejar loading en operaciones async
export function useAsyncLoading() {
  const { startLoading, stopLoading } = useLoadingContext()

  const executeWithLoading = async <T>(
    asyncFunction: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading()
      const result = await asyncFunction()
      return result
    } finally {
      stopLoading()
    }
  }

  return { executeWithLoading }
}
