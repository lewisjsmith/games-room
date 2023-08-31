// @ts-nocheck

import makeApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import Genre from "../models/genre";
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

describe.skip("GET /genre", () => {

    describe("given a valid ID", () => {
        // respond with JSON object of the game details
        // respond with a 200 status code 
        // specify json in the content type header
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/api/v1/library/genre/64e4df9c0f790ff853699f88")
            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body)).toEqual(expect.arrayContaining(["title"]));
        });
    })

    describe("given an invalid ID", () => {

        // respond with 400 not found
        test("should respond with a 400 status code", async () => {
            const response = await request(app).get("/api/v1/library/genre/123")
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Not a valid ObjectId.");
        })

        // respond with 400 Invalid URL
        test("shouldn't respond with all genres on this url", async () => {
            const response = await request(app).get("/api/v1/library/genre/")
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid URL.");
        })

        test("should respond with a 404 not found", async () => {
            const response = await request(app).get("/api/v1/library/genre/64e4df9c0f790ff853699f19")
            expect(response.statusCode).toBe(404);
        })
    })

})

describe.skip("POST /genre/create", () => {

    describe("Correct field details", () => {

        test("Should respond with 200/ok", async () => {
            const response = await request(app)
                .post("/api/v1/library/genre/create")
                .send({ title: `Genre Success Test ${Math.ceil(Math.random()*100)}`})
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);
        })

    });

    describe("Incorrect field details", () => {

        test("Invalid title should notify", async () => {
            const response = await request(app)
                .post("/api/v1/library/genre/create")
                .send({ title: "" })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors[0].path).toBe("title");
        });

    });

});

describe.skip("POST /genre/:id/update", () => {

    describe("Successful edit", () => {

        test("Valid id and title should respond with 200/ok", async () => {

            const title = `Title Random ${Math.ceil(Math.random()*100)}` 

            const response = await request(app)
                .post("/api/v1/library/genre/64efa351886f487ac9f6104a/update")
                .send({
                    title: title
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);

            const review = await request(app)
                .get("/api/v1/library/genre/64efa351886f487ac9f6104a")
            expect(review.statusCode).toBe(200);
            expect(review.body.title).toBe(title);

        });

    })

    describe("Edit errors", () => {

        test("invalid input, title", async () => {

            const response = await request(app)
                .post("/api/v1/library/genre/64efa351886f487ac9f6104a/update")
                .send({
                    title: ""
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("No changes requested.");

        });

        test("invalid id but correct format", async () => {
            const response = await request(app)
                .post("/api/v1/library/genre/64eb7e040d1602d0a25fa2d4/update")
                .send({
                    title: "Invalid ID"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(404);
            expect(response.body.errors).toBe("Genre not found.");
        })

        test("invalid id format", async () => {
            const response = await request(app)
                .post("/api/v1/library/genre/invalid/update")
                .send({
                    title: "Invalid ID"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Not a valid ObjectId.");
        });

    });

});

describe.skip("DELETE /genre/:id/delete", () => {

    let testId: mongoose.Types.ObjectId;

    beforeEach(async () => {

        const title = `Delete test ${Math.ceil(Math.random() * 100)}`;

        const response = await request(app)
            .post("/api/v1/library/genre/create")
            .send({
                title: title,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        if (response.statusCode === 200) {

            console.log("Test genre created.");

            const genre = await Genre
                .findOne({ "title": title })
                .exec()

            testId = genre._id

        }
    })

    test("Return 200, id no longer found", async () => {

        const response = await request(app)
            .post(`/api/v1/library/genre/${testId}/delete`)
            .send("delete")
        expect(response.statusCode).toBe(200);

    })

    test("Return 200, id no longer found", async () => {

        const response = await request(app)
            .post(`/api/v1/library/genre/${testId}/delete`)
            .send("delete")
        expect(response.statusCode).toBe(200);

        const retry = await request(app)
            .post(`/api/v1/library/genre/${testId}/delete`)
            .send("delete")
        expect(retry.statusCode).toBe(400);
        expect(retry.body.errors).toBe("ID not found.");

    })

});

describe.skip("GET /api/v1/library/genres", () => {

    test("a list of studios is returned", async () => {

        const response = await request(app)
        .get("/api/v1/library/genres")

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

    });

});

