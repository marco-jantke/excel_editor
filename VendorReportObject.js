function VendorReportObj(day, month, year, calendarWeek, vendor, devFirstName,
                         devLastName, project, topic, hours, minutes, costs, comments) {
    this.Day = day;
    this.Month = month;
    this.Year = year;
    this.CalendarWeek = calendarWeek;
    this.Vendor = vendor;
    this.DevFirstName = devFirstName;
    this.DevLastName = devLastName;
    this.Project = project;
    this.Topic = topic;
    this.Hours = hours;
    this.Minutes = minutes;
    this.Costs = costs;
    this.Comments = comments;
}

VendorReportObj.prototype.getDay = function () {
    return this.Day;
};
VendorReportObj.prototype.getMonth = function () {
    return this.Month;
};
VendorReportObj.prototype.getYear = function () {
    return this.Year;
};
VendorReportObj.prototype.getCalendarWeek = function () {
    return this.CalendarWeek;
};
VendorReportObj.prototype.getVendor = function () {
    return this.Vendor;
};
VendorReportObj.prototype.getDevFirstName = function () {
    return this.DevFirstName;
};
VendorReportObj.prototype.getDevLastName = function () {
    return this.DevLastName;
};
VendorReportObj.prototype.getProject = function () {
    return this.Project;
};
VendorReportObj.prototype.getTopic = function () {
    return this.Topic;
};
VendorReportObj.prototype.getHours = function () {
    return this.Hours;
};
VendorReportObj.prototype.getMinutes = function () {
    return this.Minutes;
};
VendorReportObj.prototype.getCosts = function () {
    return this.Costs;
};
VendorReportObj.prototype.getComments = function () {
    return this.Comments;
};
VendorReportObj.prototype.calculateCosts = function (constVar1, constVar2) {
    this.Costs = Math.round(this.Hours * constVar1 +
        (this.Minutes / constVar2) * constVar1);
};

module.exports = VendorReportObj;