import { getClient } from "./auth.ts";
import { google } from "googleapis";

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  message: string
) {
  const gmail = google.gmail({ version: "v1", auth: getClient() });

  const rawMessage = Buffer.from(
    `From: <${from}>\r\n` +
      `To: ${to}\r\n` +
      `Subject: ${subject ? subject : ""}\r\n\r\n` +
      `${message ? message : ""}`
  ).toString("base64");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: rawMessage.replace(/\+/g, "-").replace(/\//g, "_"),
    },
  });
}

export async function getUserProfile() {
  const gmail = google.gmail({ version: "v1", auth: getClient() });

  const data = await gmail.users.getProfile({
    userId: "me",
  });
  return JSON.stringify(data.data);
}

export async function filterEmail(query : string , maxresult?: (number | null) ){

    const gmail = google.gmail({ version: "v1", auth: getClient() });

    const res = await gmail.users.messages.list({
        userId: "me",
        q: query, 
        maxResults: maxresult ? maxresult : 5,              
      });
    
      const messages = res.data.messages || [];

      const response = [];

      for (const message of messages) {
        const full = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
          format: "full",
        });

        const headers = full.data.payload?.headers || [];
        const subjectHeader = headers.find(h => h.name === "Subject");
        const subject = subjectHeader?.value || "(No Subject)";
      
        response.push({ 
          id:full.data.id,
          subject,
          date : full.headers.date,
          snippet: full.data.snippet 
        });
      }
      
      return JSON.stringify(response)
}



export async function deleteEmail( id : string ){

    const gmail = google.gmail({ version: "v1", auth: getClient() });

    await gmail.users.messages.delete({
        userId: "me",
        id:id
    })
}




filterEmail("Hello")
