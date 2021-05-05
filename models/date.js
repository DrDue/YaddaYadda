const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

exports.formatedDate = function() {
    var d = new Date(),
        month = '' + (monthNames[d.getMonth()]),
        day = '' + d.getDate(),
        year = d.getFullYear();
        


    //if (month.length < 2) 
     //   month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;


    return [day, month, year].join(' ');
};
exports.formatedTime = function() {
    var d = new Date(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes();

    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;

    return [hours, minutes].join(':');
}