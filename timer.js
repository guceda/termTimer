'use strict';

const MS_HH = 3.6e+6;
const MS_MM = 60000;
const MS_SS = 1000;

function printProgress(progress) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress);
}

function log0(timeLeft, interval) {
    printProgress(`⏰⏰⏰⏰ ${msToTime(timeLeft)} ⏰⏰⏰⏰`)
    if (timeLeft <= 0) {
        printProgress('🛎️🛎️🛎️🛎️ TIME IS UP! 🛎️🛎️🛎️🛎️');
        process.stdout.write("\n");
        clearInterval(interval);
    }
}

function timeToMS([hh, mm, ss]) {
    return (parseInt(hh) * MS_HH) + (parseInt(mm) * MS_MM) + (parseInt(ss) * MS_SS)
}

function msToTime(ms) {
    const format = number => ("0" + parseInt(number)).slice(-2);
    const hh = format(ms / MS_HH);
    const mm = format(((ms - (hh * MS_HH)) / MS_MM));
    const ss = format(((ms - (hh * MS_HH) - (mm * MS_MM)) / MS_SS));
    return [hh, mm, ss].join(':');
}

function validate([hh, mm, ss]) {
    const isValid = x => parseInt(x) >= 0 && parseInt(x) < 60;
    return isValid(hh) && isValid(mm) && isValid(ss);
}

function getMagnitudes(time) {
    return time.split(':');
}

function invalidInput() {
    printProgress('❌❌❌❌ INVALID TIME! ❌❌❌❌');
    process.stdout.write("\n");
}

function interval(time, log = log0, step = 1000) {
    const [hh, mm, ss] = getMagnitudes(time);
    const isValidTime = validate([hh, mm, ss]);

    if (!isValidTime) return invalidInput();

    let msLeft = timeToMS([hh, mm, ss]);
    const interval = setInterval(() => {
        log(msLeft, interval)
        msLeft -= step;
    }, step);
}

interval('00:00:51');


