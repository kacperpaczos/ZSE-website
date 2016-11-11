function easter_date(year) {
    // original by algorithm from polish wikipedia (http://pl.wikipedia.org/wiki/Wielkanoc)
    year = isNaN(year) ? new Date().getFullYear() : +year;
    var a = year % 19,
        b = year / 100 | 0,
        c = year % 100,
        h = (19 * a + b - (b / 4 | 0) - ((b - ((b + 8) / 25 | 0) + 1) / 3 | 0) + 15) % 30,
        l = (32 + 2 * (b % 4) + 2 * (c / 4 | 0) - h - c % 4) % 7,
        m = Math.floor((a + 11 * h + 22 * l) / 451);
    return new Date(year, Math.floor((h + l - 7 * m + 114) / 31) - 1, (h + l - 7 * m + 114) % 31 + 1);
}
// Źródło: http://jsfiddle.net/Jaason/rmg11npf/
//         http://forum.webhelp.pl/javascript/dni-swiateczne-wolne-od-pracy-t244839.html
function jestDniemRoboczym(date) {
    // sobota, niedziela?
    if ((date.getDay() == 0) || (date.getDay() == 6)) {
        return false;
    }

    var str = date.getDate() + "." + (date.getMonth());
    var swietaStale = ["1.0", "6.0", "1.4", "3.4", "15.7", "1.10", "11.10", "25.11", "26.11"];

    // święto stałe
    if (swietaStale.indexOf(str) >= 0) {
        return false;
    }

    var swietoRuchome = easter_date(date.getFullYear()); // Wielkanoc
    var przyrostyDni = [
        0, // Wielkanoc
        1, // Poniedzialek Wielkanocny
        48, // 49 dni po Wielkanocy mamy Zielone Swiatki
        11 // 60 dni po Wielkanocy jest Boze Cialo
    ];
    var i = 0;
    do {
        swietoRuchome.setDate(swietoRuchome.getDate() + przyrostyDni[i]);

        if (swietoRuchome.getDate() + "." + (swietoRuchome.getMonth() + 1) === str) {
            return false;
        }

        i++;
    } while (i < przyrostyDni.length);

    return true;
}
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}
function dayOfWeek(month,year, day) {
    return new Date(year, month, day).getDay();
}
$(function() {
    var _today = new Date();
    var _catering = 0;
    var _frithday = 0;
    for (i = 0; i < daysInMonth(_today.getMonth(), _today.getFullYear()); i++) { 
        if (jestDniemRoboczym(new Date(_today.getFullYear(),_today.getMonth(),i))){
            _catering++;
            if(dayOfWeek(_today.getFullYear(),_today.getMonth(),i) == 5)_frithday++;
        }
        else{

        }
    }
    console.log(_catering);
    console.log(_frithday);
    console.log(daysInMonth(_today.getMonth(), _today.getFullYear()));
    _catering = ((_catering-_frithday) * 13)+(_frithday*9);
    document.getElementById("catering").innerHTML = "wyżywienie: "+_catering+ " zł";
    document.getElementById("all").innerHTML = "wynosi "+(_catering+85)+ " zł";
});