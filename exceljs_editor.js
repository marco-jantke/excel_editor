(function () {

    var VendorReportObj = require('./VendorReportObject.js');
    var Excel = require("./node_modules/exceljs/excel.js");
    var workbook = new Excel.Workbook();

    workbook.xlsx.readFile("./excelData/vendor_reporting_09_18.xlsx")
        .then(function () {
            var worksheet = workbook.getWorksheet(2);

            console.log(getRowData(worksheet, 12));

            var vendorObj = new VendorReportObj(22, 9, 2015, 34, "Mayflower", "Iuliia", "Snezhzha", "MVS", "Data Exports", 8, 10, 0, "");
            vendorObj.calculateCosts(worksheet.getCell('L1').value, worksheet.getCell('K1').value);
            addNewRow(worksheet, vendorObj);
            workbook.xlsx.writeFile("./excelData/vendor_reporting_09_18_edited.xlsx");
            console.log(getRowData(worksheet, 100));
        });


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
})();




