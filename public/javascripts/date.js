const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

formatedDate = function(date) {
    var d = new Date(date),
        month = '' + (monthNames[d.getMonth()]),
        day = '' + d.getDate(),
        year = d.getFullYear();
        


    //if (month.length < 2) 
     //   month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    console.log(day)
    return `${day} ${month} ${year}`;
};

formatedTime = function(date) {
    var d = new Date(date),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes();

    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;

    return [hours, minutes].join(':');
};

fullDate = function (tid, id) {
    date = formatedDate(tid);
    time = formatedTime(tid);
    document.getElementById(id).innerHTML = `${time} | ${date}`;

}

