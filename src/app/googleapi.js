import { google } from "googleapis";

const { OAuth2 } = google.auth;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_ID = process.env.SECRET_ID;

const oAuth2Client = new OAuth2(CLIENT_ID, SECRET_ID);

export { oAuth2Client };
