var VendorReportObj = require('./VendorReportObject.js');
var XLSXWorkbookObj = require('./XLSXWorkbookObject.js');
var csvHelper = require('./csvHelper.js');
var csv = require('csv');
var fs = require('fs');

/** This function take path to csvFile with data you want to append to xlsxFile, and path to xlsxFile*/
var main = function main(csvFileToRead, xlsxFileToRead) {
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
                csvHelper.addRowToArray(row, readData);
            }
        })
        .on('end', function () {
            var vendorRepObjects = csvHelper.convertReceivedDataToObjectsArr(readData);
            workbook.addNewObjectsToTheWorksheet(vendorRepObjects, workbook.getWorksheetHeaders());
            workbook.increaseWorksheetRange(vendorRepObjects.length);
            //console.log(workbook.getWorksheet());
            workbook.writeWorkbookToTheFile('./excelData/ven_rep_xlsx_editor.xlsx');
        })
        .on('error', function (error) {
            console.log(error.message);
        });
};

/** THIS IS ENTRY POINT*/
main('./excelData/project_stat.csv', './excelData/vendor_reporting_09_18.xlsx');
