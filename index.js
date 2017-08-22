var fs = require('fs');
var csv = require('csv-parser');
var builder = require('xmlbuilder');

(function parseCsv() {
    console.log("Function executed");
    //set license csv input filepath here:
    var csvInput = '../../work/Book7.csv';

    //read the csv and turn it into an object
    fs.createReadStream(csvInput)
        .pipe(csv())
        .on('data', function(data) {
            //build the xml document
            var root = builder.create('accounts', { version: '1.0', encoding: 'UTF-8' });

            var accounts = root.ele('account');
            accounts.ele('vendorId', data['officeName'])
                .up().ele('customerNumber', data['customerNumber'])
                .up().ele('type', data['Type'])
                .up().ele('officeName', data['officeName'])
                .up().ele('Address1', data['Address1'])
                .up().ele('Address2', data['Address2'])
                .up().ele('city', data['city'])
                .up().ele('stateCode', data['stateCode'])
                .up().ele('postalCode', data['postalCode'])
                .up().ele('telephoneNumber', data['telephoneNumber'])
                .up().ele('faxnumber', data['faxnumber'])
                .up().ele('emailAddress', data['emailAddress'])
                .up().ele('providerCount', data['providerCount'])
                .up().ele('isClaimSubmitter', data['isClaimSubmitter']);
            var taxIds = accounts.ele('taxIds');
            // New nested level
            for (i = 0; i < Object.keys(data).length; i++) {
                taxIds.ele('taxId').ele('taxIdValue', data['TaxIdValue'])
                    .up().ele('npi', data['NPI'])
                    .up().ele('providerFirstName', data['Providor First Name'])
                    .up().ele('providerLastName', data['Provider Last Name'])
                    .up().ele('DoingBusinessAsName', data['Doing Business as Name'])
                    .up().ele('contactName', data['Contact Name'])
                    .up().ele('address1', data['Address1'])
                    .up().ele('address2', data['Address2'])
                    .up().ele('city', data['City'])
                    .up().ele('stateCode', data['StateCode'])
                    .up().ele('postalCode', data['PostalCode'])
                    .up().ele('emailAddress', data['EmailAddress'])
                    .up().ele('telephoneNumber', data['Telephone Number'])
                    .up().ele('faxNumber', data['Fax Number'])
                    .up().ele('isGroupPractice', data['IsGroupPractice']);
            }

            // .up().ele('Enrollments')
            // // New nested level
            // .ele('Enrollment')
            // .ele('Enroll', 1) //hardcode for now
            // .up().ele('PayerID')
            // .up().ele('RenderingProviders')
            // .ele('Provider')
            // .ele('Name')
            // .up().ele('NPI')
            // .up().up().up().ele('ProviderLicense')
            // .ele('IssuingState')
            // .up().ele('LicenseNumber')
            // .up().up().ele('TaxIDType', 'EIN') //hardcode for now
            // .up().ele('TaxonomyCode')
            // .up().ele('TradingPartnerID')
            // .up().ele('GroupNumber')
            // .up().ele('PreferenceForAggregationOfRemittanceData', 'TIN') //hardcode for now
            // .up().ele('ERAStartDate', '01/01/2000')

            taxIds.end({ pretty: true });

            //set output destination and write the files
            fs.writeFile('../../work/orthofiPractices.xml', root, function(err) {
                if (err) throw err;
            });
        });
})();