# TL;DR

This repo contains some JS codes which I spiked to enhance [Moment.js](https://momentjs.com/) to have getter __hhmm__.
This __hhmm__ returns a "HH:mm" formatted String. Moreover it may returns a string like "25:30", which means 1:30 AM of 
one day.

# motivation

In some circumstances, 
For example, suppose that some shops open from midday to 6 o'clock in the next morning,
staffs who work in those may want to take up "2018/11/7 01:30" as **"2018/11/6 25:30"**.
To deal with situations like this, I want to let Moment.js to be able to handle `'HH:mm'` strings whose hour parts `HH` are greater than 24.

# design

- function `momentH25conf(startHour)`: It receives a one integer startHour which is >= 1 and < 12. The parameter startHour means
the start hour of the day. In the preceding example of shops, the start hour is 6, and thus we should 
do `moment25conf(6)` firstly before using the following features, `.hhmm` getter and `hhmm(string)` function.

After `moment25conf` is invoked, we can use following two features:

- function `hhmm(string)` : It receives a string parameter with 'HH:mm' format. `"25:30"` can be allowed as a parameter
to this function.

- Moment object's getter `hhmm`: This is a getter returning a string formatted in `'HH:mm'`. If we do setStartHour(6) and
a moment object `x` has the date of `"2018/11/8 01:30:55"`, `x.hhmm` returns `"25:30"`.

# implementations

This repo contains the following three files:

- `momentH25conf.js`: javascript file which contains the above function momentH25conf(startHour) 

- `test.js`: sample use cases of the function `hhmm(string)` and the getter `.hhmm` illustrated above. 

- `index.html`: sample HTML to run tests in test.js

# samples

The following setting line is included in the `DOMContentLoaded` handler of `index.html`.
```javascript
momentH25conf(6); // at first, set 6 o'clock as the start hour
```

The following 7 snippets are written in `test.js`.

```javascript
const t0 = hhmm('00:00');
console.log(t0.hhmm); // "24:00"
```

```javascript
const t1 = hhmm('24:00');
console.log(t1.hhmm); // "24:00"
```

```javascript
const t2 =hhmm('21:45');
console.log(t2.hhmm); // "21:45"
```

```javascript
const t3 = hhmm('05:21');
console.log(t3.hhmm); // "29:21"
```

```javascript
const t4 = hhmm('28:15');
console.log(t4.hhmm); // "28:15"
```

```javascript
const t5 = hhmm('21:00');
const t6 = hhmm('26:45');
console.log(t6.isAfter(t5));  // true
console.log(t5.isBefore(t6)); // true
console.log(t6.diff(t5, 'minutes')); // 345
console.log(t6.diff(t5, 'hours'));   // 5
console.log(t6.diff(t5, 'hours', true)); // 5.750271388888889 (or float value nearly 5.75 ) 
```

```javascript
const t7 = hhmm('22:45');
const t8 = t7.add(4.5, 'hours');
console.log(t8.hhmm); // "27:15"

const t9 = t8.add(-20, 'minutes');
console.log(t9.hhmm); // "26:55"
```
