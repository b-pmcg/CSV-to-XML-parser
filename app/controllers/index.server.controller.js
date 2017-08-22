var fs = require('fs');
var csv = require('csv-parser');
var builder = require('xmlbuilder');
var helpers = require('../../config/helpers');

//set license csv input filepath here:
var csvInput = '../../work/test2.csv';

function parseCsv(csvInput) {
    // specify optional quote character in stream options
    var stream = csv({
        // quote: '"'
    });

    //read the csv and turn it into an object
    fs.createReadStream(csvInput)
        .pipe(csv())
        .on('data', function(data) {

            //build the xml document
            var xml = builder.create('accounts', { version: '1.0', encoding: 'UTF-8' })
                .att('xmlns', 'http://com/exlibris/urm/repository/migration/license/xmlbeans')
                .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
                .att('xsi:schemaLocation', 'http://com/exlibris/urm/repository/migration/license/xmlbeansERM_license.xsd')
                .ele('account')
                .ele('vendorId', data["vendorId"])
                .up()
                .ele('customerNumber', data['customerNumber'])
                .up()
                .ele('type', data['type'])
                .up()
                .end({ pretty: true });

            //set output destination and write the files
            fs.writeFile('../../work/test2.xml', xml, function(err) {
                if (err) throw err;
            });
        });
}