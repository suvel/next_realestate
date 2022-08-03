const debug = 1;
const debugLog = function debugLog() {
  if (debug) console.log(arguments);
};

export default debugLog;
