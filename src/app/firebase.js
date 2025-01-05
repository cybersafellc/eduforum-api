import admin from "firebase-admin";
import serviceAccount from "../../edu-forum-4cf15-firebase-adminsdk-ak6xa-b612ddf9cd.json" assert { type: "json" };

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
export { admin };
