var fs = require('fs');
var csv = require('csv-parser');
var builder = require('xmlbuilder');

(function parseCsv() {
    console.log("Function executed");
    //set license csv input filepath here:
    var csvInput = '../../work/Book7.csv';

    var root = builder.create('accounts', { version: '1.0', encoding: 'UTF-8' });
    var accounts = root.ele('account');
    accounts.ele('vendorId', '123')
        .up().ele('customerNumber', '321')
        .up().ele('type', 'Enroll')
        .up().ele('officeName', 'OrthoFi')
        .up().ele('Address1', '444 Street')
        .up().ele('Address2', 'Apartment 1')
        .up().ele('city', 'Denver')
        .up().ele('stateCode', 'CO')
        .up().ele('postalCode', '80210')
        .up().ele('telephoneNumber', '3333333333')
        .up().ele('faxnumber', '4444444444')
        .up().ele('emailAddress', 'info@orthofi.com')
        .up().ele('providerCount', '1000')
        .up().ele('isClaimSubmitter', 1);
    var taxIds = accounts.ele('taxIds');

    //read the csv and turn it into an object
    fs.createReadStream(csvInput)
        .pipe(csv())
        .on('data', function(data) {
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