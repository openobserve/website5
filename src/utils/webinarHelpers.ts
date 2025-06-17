export function isWebinarLive(webinar: any) {
  const now = new Date();
  if (!webinar.date) return false;
  const start = new Date(webinar.date);
  let duration = 60;
  if (webinar.duration) {
    const match = webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now >= start && now <= end;
}

// Helper to check if a webinar is in the future (not started yet)
export function isWebinarFuture(webinar: any) {
  const now = new Date();
  if (!webinar.date) return false;
  const start = new Date(webinar.date);
  return start > now;
}

// Helper to check if a webinar is in the past
export function isWebinarPast(webinar: any) {
  const now = new Date();
  if (!webinar.date) return true;
  const start = new Date(webinar.date);
  let duration = 60;
  if (webinar.duration) {
    const match = webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now > end;
}
