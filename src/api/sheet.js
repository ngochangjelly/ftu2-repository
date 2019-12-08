import config from './config';
const RANGE = 'Sheet1!A1:D1000';
export const load = callback => {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: RANGE
      })
      .then(
        response => {
          const data = response.result.values;
          let items = [];
          data.map((item, key) => {
            if (
              key !== 0 &&
              ((item[0] !== '' && item[1] !== '') ||
                item[2] !== '' ||
                item[3] !== '')
            ) {
              items.push({
                id: item[0],
                name: item[1],
                meta: item[2],
                url: item[3],
                route: `${item[0]}`
              });
            }
          });
          callback({
            items
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
};
export const makeApiCall = () => {
  var params = {
    // The spreadsheet to request.
    spreadsheetId: config.spreadsheetId,

    // The ranges to retrieve from the spreadsheet.
    ranges: [], // TODO: Update placeholder value.

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false // TODO: Update placeholder value.
  };

  var request = window.gapi.client.sheets.spreadsheets.get({
    spreadsheetId: params.spreadsheetId,
    range: 'Sheet1!A1:C2'
  });
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
    },
    function(reason) {
      console.error('error: ' + reason.result.error.message);
    }
  );
};
export const initClient = onLoad => {
  window.gapi.client
    .init({
      apiKey: process.env.REACT_APP_APIKEY,
      discoveryDocs: config.discoveryDocs
    })
    .then(() => {
      load(onLoad);
    });
};
