function test() {

  console.log('TEST.1 --------');
  const t0 = hhmm('00:00');
  console.log(t0.format('YYYY/MM/DD HH:mm'));
  console.log(t0.hhmm); // "24:00"

  console.log('TEST.2 --------');
  const t1 = hhmm('24:00');
  console.log(t1.format('YYYY/MM/DD HH:mm'));
  console.log(t1.hhmm); // "24:00"

  console.log('TEST.3 --------');
  const t2 =hhmm('21:45');
  console.log(t2.format('YYYY/MM/DD HH:mm'));
  console.log(t2.hhmm); // "21:45"

  console.log('TEST.4 --------');
  const t3 = hhmm('05:21');
  console.log(t3.format('YYYY/MM/DD HH:mm'));
  console.log(t3.hhmm); // "29:21"

  console.log('TEST.5 --------');
  const t4 = hhmm('28:15');
  console.log(t4.format('YYYY/MM/DD HH:mm'));
  console.log(t4.hhmm); // "28:15"

  console.log('TEST.6 --------');
  const t5 = hhmm('21:00');
  const t6 = hhmm('26:45');
  console.log(t6.isAfter(t5));  // true
  console.log(t5.isBefore(t6)); // true
  console.log(t6.diff(t5, 'minutes')); // 345
  console.log(t6.diff(t5, 'hours'));   // 5
  console.log(t6.diff(t5, 'hours', true)); // 5.750271388888889 (or float value nearly 5.75 )

  console.log('TEST.7 --------');
  const t7 = hhmm('22:45');
  const t8 = t7.add(4.5, 'hours');
  console.log(t8.hhmm); // "27:15"

  const t9 = t8.add(-20, 'minutes');
  console.log(t9.hhmm); // "26:55"
}
