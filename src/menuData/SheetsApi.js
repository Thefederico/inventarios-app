// import gapi from "gapi-client";
// import { db } from "../Config/firebase/firebaseConfig";

// export const makeApiCall = async function (spreadsheetId, range) {
//   const params = {
//       spreadsheetId: spreadsheetId,  
//       range: range,  
//   };

//   let response = await gapi.client.sheets.spreadsheets.values.get(params);
//   while (response.result.values == null) { // or whatever you need to check
//       await new Promise(resolve => setTimeout(resolve, 5)); // delay the loop a bit
//       response = await gapi.client.sheets.spreadsheets.values.get(params); // try again
//   }
//   const dataOut = (response.result.values);

//   console.log(dataOut);
 
// }

// export const getDataFromSheet = async (spreadsheetId, range) => {
//   gapi.load("client:auth2", function () {
//     const API_KEY = "AIzaSyBuLnWyZWxTxCfYOSHYU1JSQ_o__HX5GLo"; // TODO: Update placeholder with desired API key.

//     const CLIENT_ID =
//       "542136692189-4t3d54ttd617onaup55i8ccrmga01e4h.apps.googleusercontent.com"; // TODO: Update placeholder with desired client ID.

//     const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

//     gapi.client
//       .init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         scope: SCOPE,
//         discoveryDocs: [
//           "https://sheets.googleapis.com/$discovery/rest?version=v4",
//         ],
//       })
//       .then(function () {
//         gapi.client.sheets.spreadsheets.values
//           .get({
//             spreadsheetId: spreadsheetId,
//             range: range,
//           })
//           .then((response) => {
//             let result = response.result;

//             let headers = result.values[0];

//             let objData = result.values.map(function (item) {
//               let objEnv = {};

//               headers.map((tit, j) => {
//                 objEnv[tit] = item[j];
//               });

//               let idData = `${objEnv["OT"]}`;
//               idData = idData.padStart(4, `0`);
//               let data = { ...objEnv, id: idData };

//               db.collection("ots-produccion").doc(`${data.id}`).set(data);

//               return { ...data };
//             });

//             objData.shift();

//             console.log("CONVERTIDO A OBJETO", objData);

//             // Nedesito que toda ésta función llamada getDataFromSheet me retorne este resultado
//           });
//       });
//   });
// };

// export const getDataFromSheet = async (spreadsheetId, range) => {
//   gapi.load("client:auth2", function () {
//     const API_KEY = "AIzaSyBuLnWyZWxTxCfYOSHYU1JSQ_o__HX5GLo"; // TODO: Update placeholder with desired API key.

//     const CLIENT_ID =
//       "542136692189-4t3d54ttd617onaup55i8ccrmga01e4h.apps.googleusercontent.com"; // TODO: Update placeholder with desired client ID.

//     const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

//     gapi.client
//       .init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         scope: SCOPE,
//         discoveryDocs: [
//           "https://sheets.googleapis.com/$discovery/rest?version=v4",
//         ],
//       })
//       .then(function () {
//         gapi.client.sheets.spreadsheets.values
//           .get({
//             spreadsheetId: spreadsheetId,
//             range: range,
//           })
//           .then((response) => {
//             let result = response.result;
//             console.log("resultado", result.values);

//             // Nedesito que toda ésta función llamada getDataFromSheet me retorne este resultado
//           });
//       });
//   });
// };
