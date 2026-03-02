export function formatDate(date: string | Date | null) {
  if (!date) {
    return new Date().toLocaleString("ar-EG");
  }

  return new Date(date).toLocaleString("ar-EG")

}