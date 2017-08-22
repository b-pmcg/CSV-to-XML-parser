'use strict';

var fs = require('fs');
var csv = require('csv-parser');
var builder = require('xmlbuilder');
var helpers = require('../../config/helpers')

//set license csv input filepath here:

var licenseInput = './public/docs/Licenses_nolinebrk.csv'

//var licenseInput = './public/docs/Licenses_051116-350nonotes.csv';
//var licenseInput = './public/docs/Licenses_01292016.csv';
//var licenseInput = './public/docs/license-perl160512.csv';

exports.render = function(req, res) {

        // specify optional quote character in stream options
    var stream = csv({
      // quote: '"'
    })

    //read the csv and turn it into an object
    fs.createReadStream(licenseInput)
  		.pipe(csv())
  		.on('data', function(data) {

        //build the xml document
        var xml = builder.create('license', { version: '1.0', encoding: 'UTF-8'})
        .att('xmlns', 'http://com/exlibris/urm/repository/migration/license/xmlbeans')
        .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
        .att('xsi:schemaLocation', 'http://com/exlibris/urm/repository/migration/license/xmlbeansERM_license.xsd')
          .ele('license_details')
            .ele('license_code', data["RECORD #"]) //was L RECORD #
              .up()
            .ele('license_name', data['Notice Requirement'])
              .up()
            .ele('license_status', 'ACTIVE') //No mapping, default ACTIVE
              .up()
            .ele('review_status', 'ACCEPTED') //No mapping, default Accepted.
              .up()
            // .ele('signed_by', data['Licensee'])
            //   .up()
            .ele('start_date', helpers.dateConvert(data["Contract Start Date"])) //contract start date NEW
  	  				.up()
            // .ele('end_date', helpers.dateConvert(data["Contract End Date"])) //contract end date new
            //   .up()
            // .ele('signed_on', helpers.dateConvert(data["Licensee Sign Date"])) //Licensee Sign Date
            //   .up() //end date and signed on removed by request of vendor
            .ele('ownered_entity') //this element is required
              .ele('creation_date', helpers.dateConvert(data["CREATED"])) //CREATED not expected by XSD
                .up()
              .up()
            .ele('URI', data['URL']) //URL changed to URI
              .up()
            .ele('type', 'LICENSE') //No mappingLicense is default. Options: LICENSE, ADDENDUM, NEGOTIATION
              .up()
              .up()
          .ele('term_list')
            .ele('term')
              .ele('term_code', 'CONFA')
                .up()
              .ele('term_value', helpers.confidentialConvert(data["Confidential"]) )
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'RENEWTYPE')
                .up()
              .ele('term_value', helpers.autorenewConvert(data["Auto Renew"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'PERPETUAL')
                .up()
              .ele('term_value', helpers.ynConvert(data["Perpetual Access"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'ARCHIVEN')
                .up()
              .ele('term_value', helpers.archProvisionConvert(data["Archival Provisions"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'IPWARRI')
                .up()
              .ele('term_value', helpers.lnConvert(data["Warranty"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'ACCESSIBILITY')
                .up()
              .ele('term_value', helpers.ynConvert(data["Disability Compliance"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'INDEMN')
                .up()
              .ele('term_value', helpers.indemnConvert(data["Indemnification"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'GOVLAW')
                .up()
              .ele('term_value', helpers.lawvenueConvert(data["Law & Venue"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'CONFUSERI')
                .up()
              .ele('term_value', helpers.ynConvert(data["User Confidentiality"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'ILLN')
                .up()
              .ele('term_value', helpers.illConvert(data["Interlibrary Loan Allowed"]))
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'CONCURUSER')
                .up()
              .ele('term_value', data["Concurrent Users"])
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'CUREBREACH')
                .up()
              .ele('term_value', data["Breach Cure"])
                .up()
                .up()
            .ele('term')
              .ele('term_code', 'AUTHUSERDEF')
                .up()
              .ele('term_value', data["Authorized Users"])
                .up()
                .up()
                .up()
          .ele('note_list')
            // .ele('note')
            //   .ele('content', helpers.dateConvert(data["UPDATED"])) //modified
            //     .up()
            //   .ele('ownered_entity')
            //     .up()
            //     .up()
            .ele('note')
              .ele('content', helpers.typeConvert(data["Type"]))
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["Authentication Method"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["License Notes"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["Special Terms"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["Terms of use notes (Patron)"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["Terms of use (Staff)"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["Terms of use notes (Staff)"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["Licensor"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
            .ele('note')
              .ele('content', data["Licensee"])
                .up()
              .ele('ownered_entity')
                .up()
                .up()
  			.end({ pretty: true});

        //set output destination and write the files
  			fs.writeFile('./public/docs/licenseoutput/'+ data["docnum"] + '.xml', xml, function (err) {
  				if (err) throw err;
  			})
  		})

    res.render('index', {
      title: 'ERM License CSV to XML',
      body: 'Refresh page to run operation.'
  	})

};
