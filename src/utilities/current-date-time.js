export const currentDate = () => {
  const today = new Date();
  let month = today.getMonth() + 1;
  month = month >= 10 ? month : `0${month}`;
  let currDate = today.getDate();
  currDate = currDate >= 10 ? currDate : `0${currDate}`;
  const date = `${today.getFullYear()}-${month}-${currDate}`;

  return date;
};

const currentDateTime = () => {
  /* Required format is yyyy-MM-ddThh:mm */

  const date = currentDate();
  const today = new Date();

  let hour = today.getHours();
  hour = hour >= 10 ? hour : `0${hour}`;
  let minutes = today.getMinutes();
  minutes = minutes >= 10 ? minutes : `0${minutes}`;
  const time = `${hour}:${minutes}`;

  const datetime = `${date}T${time}`;
  return datetime;
};

export default currentDateTime;
