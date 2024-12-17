const oneMinuteInMilliseconds = 1e3 * 60;
const timezoneOffsetInMilliseconds = (/* @__PURE__ */ new Date()).getTimezoneOffset() * oneMinuteInMilliseconds;
const hasTimeElapsedInMinutes = (eventUTCDatetime, minutes = 1) => {
  const timeDifference = Date.now() + timezoneOffsetInMilliseconds - Date.parse(eventUTCDatetime);
  return timeDifference - minutes * oneMinuteInMilliseconds >= 0;
};
export {
  hasTimeElapsedInMinutes as h,
  oneMinuteInMilliseconds as o
};
//# sourceMappingURL=time-562db5c1.js.map
