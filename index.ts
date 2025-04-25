import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  deleteEmail,
  filterEmail,
  getUserProfile,
  sendMail,
} from "./functionCall";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

// Add an addition tool
server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

server.tool(
  "send_a_email",
  "used to send a email from anujkumarsingh6544@gmail.com to other user. From is always anujkumarsingh6544@gmail.com",

  {
    from: z.string().email(),
    to: z.string().email(),
    subject: z.string(),
    message: z.string(),
  },
  async ({ from, to, subject, message }) => {
    await sendMail(from, to, subject, message);
    return {
      content: [{ type: "text", text: String("Email sent!") }],
    };
  }
);

server.tool(
  "get_profile",
  "used to get profile for anujkumarsingh6544@gmail.com",

  {},
  async ({}) => {
    const data = await getUserProfile();
    return {
      content: [{ type: "text", text: String(data) }],
    };
  }
);

server.tool(
  "gmail_filter",
  "filters gmail by search, takes query as string , and maxresult which is optional , it don't assign it return top 5 results.",

  { query: z.string(), maxresult: z.number() },
  async ({ query, maxresult }) => {
    const data = await filterEmail(query, maxresult);
    return {
      content: [{ type: "text", text: String(data) }],
    };
  }
);

server.tool(
  "email_delete",
  "delete emails using their id, id is required here.",

  { id: z.string() },
  async ({ id }) => {
    await deleteEmail(id);

    return {
      content: [{ type: "text", text: String("Email Deleted") }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
