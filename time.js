const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
 'July', 'August', 'September', 'October', 'November', 'December'];

const VALID_DATE_REGEX = /^[a-zA-Z]{3,9}\s[0-9]{1,2}\s[0-9]{1,4}/;

const getAlphaMonth = (value) => {
  return MONTHS.find((month) => {
    return month.toLowerCase().includes(value.slice(0,3).toLowerCase())
  });
}

module.exports = (dateString) => {
  if (dateString.match(VALID_DATE_REGEX)) {
    let [month, day, year] = dateString.split(' ');
    month = getAlphaMonth(month)
    if (month) {
      const natural = `${month} ${day}, ${year}`
      const unix = Date.parse(natural);
      if (!isNaN(unix)) {
        return {unix, natural};
      }
    }
  } else {
    const parsedDate = new Date(Number(dateString));
    if(isFinite(parsedDate)) {
      let day = parsedDate.getUTCDate();
      let month = MONTHS[parsedDate.getUTCMonth()];
      let year = parsedDate.getUTCFullYear();
      return {unix: dateString, natural: `${month} ${day}, ${year}`};
    }
  }
  throw new Error('Invalid Format');
}
