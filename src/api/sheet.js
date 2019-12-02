import config from './config';

const load = callback => {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: 'Sheet1!A1:C2'
      })
      .then(
        response => {
          const data = response.result.values;
          const items =
            data.map(item => ({
              id: item[0],
              name: item[1],
              meta: item[2]
            })) || [];
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
export default load;
