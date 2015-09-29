(function () {
    var VendorReportObj = require('./VendorReportObject.js');
    var XLSXWorkbookObj = require('./XLSXWorkbookObject.js');
    var csv = require('csv');
    var fs = require('fs');

    /** This function take path to csvFile with data you want to append to xlsxFile, and path to xlsxFile*/
    var main = function main(csvFileToRead , xlsxFileToRead) {
        var workbook = new XLSXWorkbookObj(xlsxFileToRead, 1);
        var readData = [];

        csv()
            .from.stream(fs.createReadStream(csvFileToRead))
            .to.path('./excelData/text.txt')
            .transform(function (row) {
                row.unshift(row.pop());
                return row;
            })
            .on('record', function (row, index) {
                /** hear we read data from csv file row by row and put it into array readData*/
                if (index !== 0) {
                    var rowStr = JSON.stringify(row);
                    rowStr = rowStr.replace(/"",/g, "").replace(/,"-"/g, "").replace(/"/g, "");
                    rowStr = rowStr.substring(1, rowStr.length - 1);

                    var dataArr = rowStr.split(',');
                    readData.push(dataArr);
                }
            })
            .on('end', function (count) {
                var vendorRepObjects = convertReceivedDataToObjectsArr(readData);
                workbook.addNewObjectsToTheWorksheet(vendorRepObjects, workbook.getWorksheetHeaders());
                workbook.getWorksheet()['!ref'] = "A1:M" + (workbook.getLastRowNumber() + vendorRepObjects.length);
                //console.log(workbook.getWorksheet());
                workbook.writeWorkbookToTheFile('./excelData/ven_rep_xlsx_editor.xlsx');
            })
            .on('error', function (error) {
                console.log(error.message);
            });
    };

    Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    /** this function convert our readData array of arrays into array of VendorReportObjects and return it */
    var convertReceivedDataToObjectsArr = function convertReceivedDataToObjectsArr(arr) {
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

    /** THIS IS ENTRY POINT*/
    main('./excelData/project_stat.csv' ,'./excelData/vendor_reporting_09_18.xlsx');
})();