export function getTimeInZones(utcTime: string) {
  const iso = `1970-01-01T${utcTime.replace("Z", "")}Z`;
  const date = new Date(iso);

  return {
    PT: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
      hour12: true,
    }),
    ET: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/New_York",
      hour12: true,
    }),
    UTC: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      hour12: true,
    }),
    Local: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }),
  };
}

export function getLocalTimeWithAbbreviation(utcTime: string): string {
  const iso = `1970-01-01T${utcTime.replace("Z", "")}Z`; // Ensure it's a proper ISO string
  const date = new Date(iso);

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short", // This gives the abbreviation like IST, PST
  });
}

