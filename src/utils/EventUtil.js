const getDateRangeText = dateRange => {
  let dateRangeText;

  switch (dateRange) {
    case "year":
      dateRangeText = "All Events";
      break;
    case "week":
      dateRangeText = "Events Happening This Week";
      break;
    case "month":
      dateRangeText = "Events Happening This Month";
      break;
    default:
      dateRangeText = "Events Happening Today";
  }
  return dateRangeText;
};

export default {
  getDateRangeText
};
