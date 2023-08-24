import makeApp from "./app";

const app = makeApp({});

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});