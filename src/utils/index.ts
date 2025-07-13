export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(quantity)
}

export function formatDate(isoString: string) {
  const date = new Date(isoString)

  const formatter = new Intl.DateTimeFormat('en-EN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return formatter.format(date)
}