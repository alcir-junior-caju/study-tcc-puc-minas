export default function truncateString(str: string, num: number): string {
  if (str.length > num) {
    return `${str.slice(0, num)}...`;
  }

  return str;
}
