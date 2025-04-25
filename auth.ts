
import  express  from 'express';
import  {google }  from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
    "client_id",
    "client_secret",
    "http://localhost:3000/auth/callback"
  );


  oAuth2Client.setCredentials({
    access_token: 'access_token',
    scope: 'https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly',
    token_type: 'Bearer',
    expiry_date: 1745530485961, 
  });
  

// export function getAuthUrl() {
//     const SCOPES = [
//         'https://www.googleapis.com/auth/gmail.readonly',       
//         'https://www.googleapis.com/auth/gmail.modify',         
//         'https://www.googleapis.com/auth/gmail.send',           
//         'https://www.googleapis.com/auth/gmail.labels'        
//       ];
      
// return oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
// });
// }

// export async function getTokens(code) {
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);
//     return tokens;
//   }
  
//   export function setTokens(tokens) {
//     oAuth2Client.setCredentials(tokens);
//   }
  
 export function getClient() {
    return oAuth2Client;
  }

  



// const app = express();

// app.get('/auth', (req, res) => {
//   res.redirect(getAuthUrl());
// });

// app.get('/auth/callback', async (req, res) => {
//   const code = req.query.code;
//   const tokens = await getTokens(code);
//   res.send(`Tokens received! <pre>${JSON.stringify(tokens, null, 2)}</pre>`);
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));
