exports.sqlToJsDate = (sqlDate) => {
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    let sqlDateArr1 = sqlDate.split("-");
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    let sYear = sqlDateArr1[0];
    let sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    let sqlDateArr2 = sqlDateArr1[2].split(" ");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    let sDay = sqlDateArr2[0];
    //var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    //var sHour = sqlDateArr3[0];
    //var sMinute = sqlDateArr3[1];
    //var sqlDateArr4 = sqlDateArr3[2].split(".");
    //format of sqlDateArr4[] = ['ss','ms']
    //var sSecond = sqlDateArr4[0];
    //var sMillisecond = sqlDateArr4[1];
    console.log(sYear, sMonth, sDay)
    return new Date(sYear,sMonth,sDay);
}

exports.escapeHtmlV2 = (text) => {
    let map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


exports.removeTags = (str) => {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

function rawurlencode(str) {
    //       discuss at: https://locutus.io/php/rawurlencode/
    //      original by: Brett Zamir (https://brett-zamir.me)
    //         input by: travc
    //         input by: Brett Zamir (https://brett-zamir.me)
    //         input by: Michael Grier
    //         input by: Ratheous
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Joris
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //           note 1: This reflects PHP 5.3/6.0+ behavior
    //           note 1: Please be aware that this function expects \
    //           note 1: to encode into UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: rawurlencode('Kevin van Zonneveld!')
    //        returns 1: 'Kevin%20van%20Zonneveld%21'
    //        example 2: rawurlencode('https://kvz.io/')
    //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
    //        example 3: rawurlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
    //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
    str = (str + '')
    // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
    // but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
}

exports.mapGoogle = (city, location) => {
    const zoom = 5000;

    const adresse = rawurlencode(location + " " + city);

    const langue = "fr";

    let url;
    return url = "https://www.google.com/maps/embed?pb=" +
        "!1m18" +
        "!1m12" +
        "!1m3" +
        "!1d" + zoom +
        "!2d0" +
        "!3d0" +
        "!2m3" +
        "!1f0" +
        "!2f0" +
        "!3f0" +
        "!3m2" +
        "!1i1024" +
        "!2i768" +
        "!4f13.1" +
        "!3m3" +
        "!1m2" +
        "!1s0" +
        "!2s" + adresse +
        "!5e0" +
        "!3m2" +
        "!1s" + langue +
        "!2s" + langue +
        "!4v1622749876688" +
        "!5m2" +
        "!1s" + langue +
        "!2s" + langue
}