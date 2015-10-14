function VendorReportObj(day, month, year, calendarWeek, vendor, devFirstName,
                         devLastName, project, topic, hours, minutes, costs, comments) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.calendarWeek = calendarWeek;
    this.vendor = vendor;
    this.devFirstName = devFirstName;
    this.devLastName = devLastName;
    this.project = project;
    this.topic = topic;
    this.hours = hours;
    this.minutes = minutes;
    this.costs = costs;
    this.comments = comments;
}

VendorReportObj.prototype.getDay = function () {
    return this.day;
};
VendorReportObj.prototype.getMonth = function () {
    return this.month;
};
VendorReportObj.prototype.getYear = function () {
    return this.year;
};
VendorReportObj.prototype.getCalendarWeek = function () {
    return this.calendarWeek;
};
VendorReportObj.prototype.getVendor = function () {
    return this.vendor;
};
VendorReportObj.prototype.getDevFirstName = function () {
    return this.devFirstName;
};
VendorReportObj.prototype.getDevLastName = function () {
    return this.devLastName;
};
VendorReportObj.prototype.getProject = function () {
    return this.project;
};
VendorReportObj.prototype.getTopic = function () {
    return this.topic;
};
VendorReportObj.prototype.getHours = function () {
    return this.hours;
};
VendorReportObj.prototype.getMinutes = function () {
    return this.minutes;
};
VendorReportObj.prototype.getCosts = function () {
    return this.costs;
};
VendorReportObj.prototype.getComments = function () {
    return this.comments;
};
VendorReportObj.prototype.setCostsByHourPrice = function (hourPrice, minutesConst) {
    this.costs = Math.round(this.Hours * hourPrice +
        (this.Minutes / minutesConst) * hourPrice);
};

module.exports = VendorReportObj;
