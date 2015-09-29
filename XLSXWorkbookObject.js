function XLSXWorkbookObj(adress, sheetNumber) {
    this.XLSX = require('xlsx');
    this.workbook = this.XLSX.readFile(adress);
    var sheetName = this.workbook.SheetNames[1];
    this.worksheet = this.workbook.Sheets[sheetName];
}
XLSXWorkbookObj.prototype.getWorksheet = function() {
    return this.worksheet;
};

XLSXWorkbookObj.prototype.getWorksheetHeaders = function() {
    var headers = [];
    var row = 1;
    var col = 0;

    do {
        headers.push(this.getCell(col, row).v);
        col++;
    } while (this.worksheet[this.getCellReference(col, row)] !== undefined);
    return headers;
};

XLSXWorkbookObj.prototype.getCell = function (col, row) {
    return this.worksheet[this.getCellReference(col, row)];
};

XLSXWorkbookObj.prototype.getCellReference = function (col, row) {
    return this.XLSX.utils.encode_cell({
        'c': col,
        'r': row
    });
};

XLSXWorkbookObj.prototype.getLastRowNumber = function () {
    return Number(this.worksheet['!ref'].match(/[A-Z]+\d+:[A-Z]+(\d+)/)[1]);
};

XLSXWorkbookObj.prototype.assignCellValue = function (value, col, row) {
    if (typeof value === "string") {
        this.worksheet[this.getCellReference(col, row)] = {t: 's', v: value, r: '<t>' + value + '</t>', h: value, w: value};
    } else {
        this.worksheet[this.getCellReference(col, row)] = {t: 'n', v: value, w: value.toString()};
    }
};

XLSXWorkbookObj.prototype.assignCellValueWithFormula = function (col, row, formula, value) {
    this.worksheet[this.getCellReference(col, row)] = {t: 'n', v: value, f: formula, w: value.toString() + ' ˆ'};
};

XLSXWorkbookObj.prototype.addNewObjectsToTheWorksheet = function (objects, headers) {
    var row = this.getLastRowNumber();
    var cellRefHours;
    var cellRefMinutes;

    for (var i = 0; i < objects.length; i++, row++) {
        for (var j = 0, col = 0; j < headers.length; j++, col++) {
            if (headers[j] === "Day") {
                this.assignCellValue(objects[i].getDay(), col, row);
                continue;
            } else if (headers[j] === "Month") {
                this.assignCellValue(objects[i].getMonth(), col, row);
                continue;
            } else if (headers[j] === "Year") {
                this.assignCellValue(objects[i].getYear(), col, row);
                continue;
            } else if (headers[j] === "Calendar Week") {
                this.assignCellValue(objects[i].getCalendarWeek(), col, row);
                continue;
            } else if (headers[j] === "Vendor") {
                this.assignCellValue(objects[i].getVendor(), col, row);
                continue;
            } else if (headers[j].toLowerCase() === "dev. first name") {
                this.assignCellValue(objects[i].getDevFirstName(), col, row);
                continue;
            } else if (headers[j].toLowerCase() === "dev. last name") {
                this.assignCellValue(objects[i].getDevLastName(), col, row);
                continue;
            } else if (headers[j] === "Project") {
                this.assignCellValue(objects[i].getProject(), col, row);
                continue;
            } else if (headers[j] === "Topic") {
                this.assignCellValue(objects[i].getTopic(), col, row);
                continue;
            } else if (headers[j] === "Hours") {
                cellRefHours = this.getCellReference(col, row);
                this.assignCellValue(objects[i].getHours(), col, row);
                continue;
            } else if (headers[j] === "Minutes") {
                cellRefMinutes = this.getCellReference(col, row);
                this.assignCellValue(objects[i].getMinutes(), col, row);
                continue;
            } else if (headers[j] === "Costs") {
                objects[i].calculateCosts(this.getCell(11, 0).v, this.getCell(10, 0).v);
                this.assignCellValueWithFormula(col, row, cellRefHours + '*$L$1+(' + cellRefMinutes + '/$K$1)*$L$1',
                    objects[i].getCosts());
                continue;
            }
        }
    }
};

XLSXWorkbookObj.prototype.writeWorkbookToTheFile = function (adress) {
    this.XLSX.writeFile(this.workbook, adress);
};

XLSXWorkbookObj.prototype.increaseWorksheetRange = function (extraRange) {
    this.worksheet['!ref'] = "A1:M" + (this.getLastRowNumber() + extraRange);
};

module.exports = XLSXWorkbookObj;
