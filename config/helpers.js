var dateFormat = require('dateformat');

module.exports = {

    confidentialConvert: function(input) {
        if (input === "c") {
            var newVal = "All Confidential";
        } else if (input === "p") {
            var newVal = "Price Only Confidential";
        } else if (input === "n") {
            var newVal = "Not Confidential";
        } else if (input === "u" || input === "-") {
            var newVal = "Unknown Confidentiality";
        }
        return newVal;
    },
    //RENEWTYPE
    autorenewConvert: function(input) {
        if (input === "n") {
            var newVal = "Explicit";
        } else if (input === "y") {
            var newVal = "Automatic";
        } else if (input === "u" || input === "-") {
            var newVal = "";
        }
        return newVal;
    },
    //Type
    typeConvert: function(input) {
        if (input === "s") {
            var newVal = "Site License Type";
        } else if (input === "c") {
            var newVal = "Consortium License Type";
        } else if (input === "-") {
            var newVal = "Unknown License Type";
        }
        return newVal;
    },
    //ARCHIVEN
    archProvisionConvert: function(input) {
        if (input === "l") {
            var newVal = "LOCKSS";
        } else if (input === "p") {
            var newVal = "Portico";
        } else if (input === "m") {
            var newVal = "Multiple Archival Provisions";
        } else if (input === "r") {
            var newVal = "Provider";
        } else if (input === "s") {
            var newVal = "See Resource Record";
        } else if (input === "n") {
            var newVal = "None";
        } else if (input === "u" || input === "-") {
            var newVal = "Unknown";
        }
        return newVal;
    },

    indemnConvert: function(input) {
        if (input === "w") {
            var newVal = "By Institution";
        } else if (input === "u" || input === "-") {
            var newVal = "Unknown";
        } else if (input === "p") {
            var newVal = "By Provider";
        } else if (input === "m") {
            var newVal = "Mutual";
        } else if (input === "s") {
            var newVal = "Silent";
        }
        return newVal;
    },

    lawvenueConvert: function(input) {
        if (input === "n") {
            var newVal = "Country";
        } else if (input === "w") {
            var newVal = "Institution";
        } else if (input === "s") {
            var newVal = "Silent";
        } else if (input === "u" || input === "-") {
            var newVal = "Unknown";
        }
        return newVal;
    },

    illConvert: function(input) {
        if (input === "y") {
            var newVal = "Yes ILL Allowed";
        } else if (input === "n") {
            var newVal = "No ILL Allowed";
        } else if (input === "b") {
            var newVal = "ILL Allowed but See Notes";
        } else if (input === "u") {
            var newVal = "Unknown ILL Status";
        } else if (input === "-") {
            var newVal = "";
        }
        return newVal;
    },
    //converts date to ExLibris required formatting
    dateConvert: function(dateParam) {
        if (dateParam) {
            var dateParsed = Date.parse(dateParam);
            var dateFormatted = dateFormat(dateParsed, "yyyymmdd");
            //console.log(dateParam);
            return dateFormatted;
        } else {
          return ""
        }
    },
    startdateConvert: function(dateParam) {
        if (dateParam) {
            var dateParsed = Date.parse(dateParam);
            var dateFormatted = dateFormat(dateParsed, "yyyymmdd");
            console.log(dateParam);
            return dateFormatted;
        }
    },

    ynConvert: function(confParam) {
        var newVal;
        if (confParam == "y") {
            var newVal = "YES";
            return newVal;
        } else {
            confParam = "NO";
            return confParam;
        }
    },

    //IPWARRI
    lnConvert: function(confParam) {
        var newVal;
        if (confParam == "l") {
            var newVal = "YES";
            return newVal;
        } else {
            confParam = "NO";
            return confParam;
        }
    }
};
