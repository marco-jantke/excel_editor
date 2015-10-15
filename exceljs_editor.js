var csvHelper = require('./csvHelper.js');
var VendorReportObj = require('./VendorReportObject.js');
var Excel = require("./node_modules/exceljs/excel.js");
var workbook = new Excel.Workbook();

var getRowData = function getRowData(worksheet, rowNumber) {
    var row = worksheet.getRow(rowNumber);
    var vendorObj = new VendorReportObj(row.getCell(1).value, row.getCell(2).value, row.getCell(3).value, row.getCell(4).value,
        row.getCell(5).value, row.getCell(6).value, row.getCell(7).value, row.getCell(8).value,
        row.getCell(9).value, row.getCell(10).value, row.getCell(11).value, row.getCell(12).value,
        row.getCell(13).value);
    return vendorObj;
};

var addNewRow = function addNewRow(worksheet, vendorObj) {
    var cells = [];
    for (var prop in vendorObj) {
        if (typeof(vendorObj[prop]) !== "function") {
            cells.push(vendorObj[prop]);
        }
    }
    worksheet.addRow(cells);
};

var readDataFromCsvFileAndWriteToXlsx = function readDataFromCsvFileAndWriteToXlsx(pathCsv, pathXlsx) {
    var arr = [];
    workbook.csv.readFile(pathCsv)
        .then(function (worksheet) {
            worksheet.eachRow(function (row, rowNumber) {
                if (rowNumber !== 1) {
                    csvHelper.addRowToArray(row.values, arr);
                }
            });
            arr = csvHelper.convertReceivedDataToObjectsArr(arr);
        }).then(function () {
            console.log(pathCsv + " was successfully read!\n");
            writeXlsxFile(arr, pathXlsx);
        });
};

var writeXlsxFile = function writeXlsxFile(readData, path) {
    workbook.xlsx.readFile(path)
        .then(function () {
            var worksheet = workbook.getWorksheet(2);
            for (var i = 0; i < readData.length; i++) {
                readData[i].setCostsByHourPrice(worksheet.getCell("L1").value, worksheet.getCell("K1").value);
                addNewRow(worksheet, readData[i]);
            }
            workbook.xlsx.writeFile("./excelData/ven_rep_exceljs_editor.xlsx");
            console.log(pathCsv + " was successfully edited!\n");
        });
};

/** ENTRY POINT */
var paths = csvHelper.getPathsFromUser();
readDataFromCsvFileAndWriteToXlsx(paths.csvFilePath, paths.xlsxFilePath);

//./excelData/project_stat.csv
//./excelData/vendor_reporting_09_18.xlsx
