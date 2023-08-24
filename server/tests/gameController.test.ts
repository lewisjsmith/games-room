import makeApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import Game from "../models/game";
import * as dotenv from "dotenv";

let app;

async function connectDB() {
    dotenv.config();
    const mongo = process.env.SECURE_KEY;
    app = makeApp(mongo);
}

async function disconnectDB() {
    await mongoose.connection.close();
}

beforeAll(async () => {
    connectDB();
});

afterAll(async () => {
    disconnectDB();
});

describe.skip("GET /game", () => {

    describe("given an valid ID", () => {
        // respond with JSON object of the game details
        // respond with a 200 status code 
        // specify json in the content type header
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/api/v1/library/game/64e4df9c0f790ff853699f97")
            expect(response.statusCode).toBe(200);
        });

        // Tests for keys here, title first
        test("should respond with a json object with needed keys", async () => {
            const response = await request(app).get("/api/v1/library/game/64e4df9c0f790ff853699f97")
            expect(Object.keys(response.body)).toContain("title");
        });
    })

    describe("given an invalid ID", () => {
        // respond with 400 not found
        test("should respond with a 400 status code", async () => {
            const response = await request(app).get("/api/v1/library/game/123")
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid URL");
        })

        // respond with 400 Invalid URL
        test("shouldn't respond with all games on this url", async () => {
            const response = await request(app).get("/api/v1/library/game/")
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid URL");
        })
    })

})

describe.skip("POST /game/create", () => {

    describe("Correct field details", () => {

        test("Should respond with 200/ok", async () => {
            const response = await request(app)
                .post("/api/v1/library/game/create")
                .send({ title: "Success Test", studio: "64e4df9c0f790ff853699f8f", genre: "64e4df9c0f790ff853699f88", releaseDate: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);
        })

        test("Should respond with new ObjectId", async () => {
            const response = await request(app)
                .post("/api/v1/library/game/create")
                .send({ title: "Success Test", studio: "64e4df9c0f790ff853699f8f", genre: "64e4df9c0f790ff853699f88", releaseDate: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(Object.keys(response.body)).toContain("_id");
        })

    });

    describe("Incorrect field details", () => {

        test("Invalid title should notify", async () => {
            const response = await request(app)
                .post("/api/v1/library/game/create")
                .send({ title: "", studio: "64e4df9c0f790ff853699f8f", genre: "64e4df9c0f790ff853699f88", releaseDate: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid input(s) for title");
        });

        test("Invalid studio should notify", async () => {
            const response = await request(app)
                .post("/api/v1/library/game/create")
                .send({ title: "Missing Studio", studio: "", genre: "64e4df9c0f790ff853699f88", releaseDate: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid input(s) for studio");
        });

        test("Invalid genre should notify", async () => {
            const response = await request(app)
                .post("/api/v1/library/game/create")
                .send({ title: "Missing Genre", studio: "64e4df9c0f790ff853699f8f", genre: "", releaseDate: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid input(s) for genre");
        });

        test("Invalid releaseDate should notify", async () => {

            const response = await request(app)
                .post("/api/v1/library/game/create")
                .send({ title: "Missing Date", studio: "64e4df9c0f790ff853699f8f", genre: "64e4df9c0f790ff853699f88", releaseDate: "s" })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid input(s) for releaseDate");

        });

        test("Multiple invalid should notify", async () => {

            const response = await request(app)
                .post("/api/v1/library/game/create")
                .send({ title: "Missing Date", studio: "", genre: "", releaseDate: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid input(s) for studio and genre");

        });



    });

});

describe("POST /game/:id/update", () => {

    describe("Successful edit", () => {

        test.skip("Valid id and title should respond with 200/ok", async () => {

            const title = "v2"

            const response = await request(app)
                .post("/api/v1/library/game/64e744efee633153e98c0aca/update")
                .send({
                    title: title
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);

            const review = await request(app)
                .get("/api/v1/library/game/64e744efee633153e98c0aca")
            expect(review.statusCode).toBe(200);
            expect(review.body.title).toBe(title);

        });

        test.skip("Valid id and studio should respond with 200/ok", async () => {

            const studio = "Nintendo"

            const response = await request(app)

                .post("/api/v1/library/game/64e744efee633153e98c0aca/update")
                .send({
                    studio: studio
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            expect(response.statusCode).toBe(200);

        })

        test.skip("Valid id and genre should respond with 200/ok", async () => {

            const genre = "RPG"

            const response = await request(app)

                .post("/api/v1/library/game/64e744efee633153e98c0aca/update")
                .send({
                    genre: genre
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            expect(response.statusCode).toBe(200);

        })

        test.skip("Valid id && studio && genre should respond with 200/ok", async () => {

            const title = "v4"
            const studio = "Activision"
            const genre = "Racing"

            const response = await request(app)

                .post("/api/v1/library/game/64e744efee633153e98c0aca/update")
                .send({
                    title: title,
                    studio: studio,
                    genre: genre
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            expect(response.statusCode).toBe(200);

        })

        test("Valid id && date should respond with 200/ok", async () => {

            const placeholder = new Date();
            const offset = placeholder.getTimezoneOffset() / 60;
            const d = new Date(1070, 7, 17, -offset)

            const response = await request(app)

                .post("/api/v1/library/game/64e744efee633153e98c0aca/update")
                .send({
                    releaseDate: d
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            expect(response.statusCode).toBe(200);

        });

        // Need to alter game instances
        // Don't allow duplicate names

    })

});