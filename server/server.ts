import makeApp from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const mongo = process.env.SECURE_KEY;

if (mongo === undefined) {

    console.log("Invalid key")

} else {

    const app = makeApp(mongo);

    app.listen(3000, () => {
        console.log(`Server listening on port 3000`);
    });

}
