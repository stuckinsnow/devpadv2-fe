export const formatDateTime = (timestamp: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)
  const months = date.getMonth()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = date.getDate()
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  // const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
  const DD = days < 10 ? `0${days}` : days
  const YYYY = date.getFullYear()
  // const AMPM = hours < 12 ? 'AM' : 'PM';
  // const HH = hours > 12 ? hours - 12 : hours;
  // const MinMin = (minutes < 10) ? `0${minutes}` : minutes;
  // const SS = (seconds < 10) ? `0${seconds}` : seconds;

  return `${monthNames[months]} ${DD}, ${YYYY}`
}





export const formatDateTimePosts = (timestamp: string, format: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)
  const months = date.getMonth()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = date.getDate()
  const DD = days < 10 ? `0${days}` : days.toString()
  const YYYY = date.getFullYear().toString()

  switch (format) {
    case 'month':
      return monthNames[months];
    case 'day':
      return DD;
    case 'year':
      return YYYY;
    default:
      return '';
  }
} 