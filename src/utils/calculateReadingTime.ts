export function calculateReadingTime(text: string | undefined): string {
  if (!text) return "0 min read"; // fallback if no text
  const wordsPerMinute = 200;
  const numberOfWords = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes} min read`;
}
