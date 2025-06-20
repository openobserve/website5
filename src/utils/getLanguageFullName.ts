export function getLanguageFullName(initials: string, locale = "en"): string {
  const displayNames = new Intl.DisplayNames([locale], { type: "language" });
  return displayNames.of(initials.toLowerCase()) || "Unknown Language";
}