export function debounce<T extends (...args: any[]) => any> (
  func: T,
  delay: number
): (this: any, ...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
