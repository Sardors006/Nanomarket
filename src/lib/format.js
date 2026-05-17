export function formatSum(value) {
  const n = Number(value) || 0
  try {
    return `${new Intl.NumberFormat('uz-UZ').format(n)} so'm`
  } catch {
    return `${n.toLocaleString('en-US')} so'm`
  }
}
