export function getDate() {
    const today = new Date();

    const dateString =('0' + today.getDate()).slice(-2) + '/'
                    + ('0' + (today.getMonth()+1)).slice(-2) + '/'
                    + today.getFullYear();
    return dateString;
  }

export function getTime() {
    const today = new Date();
    const time =('0' + today.getHours()).slice(-2) + ':' + ('0' + (today.getMinutes())).slice(-2)
    return time;
  }

 export function getWeek() { // get current week 
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000) + 1);
  const weekNumber = Math.ceil(days / 7);
  return weekNumber 
 }


 export function getMyWeek(orderDate) { // get the week of a specific date if the date is specified
  const currentDate = new Date(orderDate);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000) + 1);
  const weekNumber = Math.ceil(days / 7);
  return weekNumber 
 }