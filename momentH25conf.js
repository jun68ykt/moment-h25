function momentH25conf(startHour) {

  // checking the parameter "startHour"
  if (!Number.isInteger(startHour)) return;
  if (startHour <= 0 || startHour > 12) return;

  // add getter "hhmm"
  moment()
    .constructor
    .prototype
    .__defineGetter__('hhmm', function() {
      let hour = this.hour();
      if (hour < startHour)
        hour += 24;
      const hh = `${hour < 10 ? '0':''}${hour}`;
      return `${hh}:${this.format('mm')}`;
    });

  // enhance moment() to handle the parameter with "HH:mm"(HH >= 25) format String
  const _moment = moment;

  window.moment = function() {
    if (arguments.length === 2 && arguments[1]=== 'HH:mm') {
      const matches = /^([0-9]{2}):([0-9]{2})$/.exec(arguments[0]);
      if (matches) {
        const h = parseInt(matches[1]);
        if (24 < h && h < 24 + startHour) {
          return _moment().add(1, 'day').hour(h-24).minute(parseInt(matches[2])).second(0);
        }
      }
    }
    return _moment(...[...arguments]);
  };

  window.hhmm = function(s) {
    return window.moment(s, 'HH:mm');
  };
}
