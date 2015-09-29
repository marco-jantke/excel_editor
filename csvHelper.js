var VendorReportObj = require('./VendorReportObject.js');

module.exports.addRowToArray = function addRowToArray(row, resArray) {
    var rowStr = JSON.stringify(row);
    rowStr = rowStr.replace(/"",/g, "").replace(/null,/g, "").replace(/,"-"/g, "").replace(/"/g, "");
    rowStr = rowStr.substring(1, rowStr.length - 1);
    resArray.push(rowStr.split(','));
};

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

/** this function convert our readData array of arrays into array of VendorReportObjects and return it */
module.exports.convertReceivedDataToObjectsArr = function convertReceivedDataToObjectsArr(arr) {
    var objArr = [];
    var date;
    var firstName;
    var lastName;
    for (var i = 0; i < arr.length; i++) {
        date = new Date(arr[i][2]);
        firstName = arr[i][0].split(" ")[0];
        lastName = arr[i][0].split(" ")[1];
        var vendorObj = new VendorReportObj(date.getDate(), date.getMonth() + 1, date.getFullYear(), date.getWeek(),
            "Mayflower", firstName, lastName, arr[i][1], arr[i][5], Number(arr[i][3]),
            Number(arr[i][4]), "", arr[i][6] ? arr[i][6] : "");
        objArr.push(vendorObj);
    }
    return objArr;
};
