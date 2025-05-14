export const formatPublishDate = (dateString: string) => {
 const parts = dateString.split(',');
  parts.shift(); // remove the weekday
  return parts.join(',').trim(); // join "Month and, Date" and " Year" => "Month Date, Year"
}