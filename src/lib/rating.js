/** Mahsulot ID bo‘yicha barqaror “reyting” (faqat ko‘rinish uchun) */
export function stableRating(id) {
  let n = 0
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) >>> 0
  return (45 + (n % 6)) / 10
}

export function stableReviewCount(id) {
  let n = 0
  for (let i = 0; i < id.length; i += 1) n = (n * 17 + id.charCodeAt(i)) >>> 0
  return 18 + (n % 312)
}
