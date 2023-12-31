// @ts-nocheck

import makeApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import Studio from "../models/studio";
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

describe.skip("GET /studio", () => {

    describe("given a valid ID", () => {
        // respond with JSON object of the game details
        // respond with a 200 status code 
        // specify json in the content type header
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/api/v1/library/studios/64f8a18b928453cb58661eb1")
            expect(response.statusCode).toBe(200);
        });

        // Tests for keys here, title first
        test("should respond with a json object with the document", async () => {
            const response = await request(app).get("/api/v1/library/studios/64f8a18b928453cb58661eb1")
            expect(Object.keys(response.body)).toEqual(expect.arrayContaining(["title", "founded"]));
        });
    })

    describe("given an invalid ID", () => {

        // respond with 400 not found
        test("should respond with a 400 status code", async () => {
            const response = await request(app).get("/api/v1/library/studios/123")
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Not a valid ObjectId.");
        })

        // respond with 400 Invalid URL
        // test("shouldn't respond with all studios on this url", async () => {
        //     const response = await request(app).get("/api/v1/library/studios/")
        //     expect(response.statusCode).toBe(400);
        //     expect(response.body.errors).toBe("Invalid URL.");
        // })

        test("should respond with a 404 not found", async () => {
            const response = await request(app).get("/api/v1/library/studios/64e4df9c0f790ff853699f19")
            expect(response.statusCode).toBe(404);
        })
    })

})

describe.skip("POST /studios", () => {

    describe("Correct field details", () => {

        test("Should respond with 200/ok", async () => {
            const response = await request(app)
                .post("/api/v1/library/studios")
                .send({ title: `Studio Success Test ${Math.ceil(Math.random()*100)}`, founded: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);
        })

    });

    describe("Incorrect field details", () => {

        test("Invalid title should notify", async () => {
            const response = await request(app)
                .post("/api/v1/library/studios")
                .send({ title: "", founded: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors[0].path).toBe("title");
        });

    });

});

describe.skip("PUT /studio/:id", () => {

    describe.skip("Successful edit", () => {

        test("Valid id and title should respond with 200/ok", async () => {

            const title = `Title Random ${Math.ceil(Math.random()*100)}` 

            const response = await request(app)
                .put("/api/v1/library/studios/64faf8dcc64d8a241cc30a2b")
                .send({
                    title: title
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);

            const review = await request(app)
                .get("/api/v1/library/studios/64faf8dcc64d8a241cc30a2b")
            expect(review.statusCode).toBe(200);
            expect(review.body.title).toBe(title);

        });

        test("Valid id and date should respond with 200/ok", async () => {

            const date = new Date();

            const response = await request(app)

                .put("/api/v1/library/studios/64faf8dcc64d8a241cc30a2b")
                .send({
                    founded: date
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            expect(response.statusCode).toBe(200);

        })

        test("Valid id && title && date should respond with 200/ok", async () => {

            const title = `Title Random ${Math.ceil(Math.random()*100)}` 
            const date = new Date();

            const response = await request(app)
                .put("/api/v1/library/studios/64faf8dcc64d8a241cc30a2b")
                .send({
                    title: title,
                    founded: date
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);

            // const review = await request(app)
            //     .get("/api/v1/library/studio/64eb7e040d1602d0a25fa2d6")
            // expect(review.statusCode).toBe(200);
            // expect(review.body.title).toBe(title);

        })

    })

    describe.skip("Edit errors", () => {

        test("invalid input, title", async () => {

            const response = await request(app)
                .put("/api/v1/library/studios/64faf8dcc64d8a241cc30a2b")
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
                .put("/api/v1/library/studios/64faf8dcc64d8a241cc30a2c")
                .send({
                    title: "Invalid ID"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(404);
            expect(response.body.errors).toBe("Studio not found.");
        })

        test("invalid id format", async () => {
            const response = await request(app)
                .put("/api/v1/library/studios/invalid")
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

describe.skip("DELETE /studios/:id", () => {

    let testId: mongoose.Types.ObjectId;

    beforeEach(async () => {

        const title = `Delete test ${Math.ceil(Math.random() * 100)}`;

        const response = await request(app)
            .post("/api/v1/library/studios")
            .send({
                title: title,
                founded: new Date()
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        if (response.statusCode === 200) {

            console.log("Test studio created.");

            const studio = await Studio
                .findOne({ "title": title })
                .exec()

            testId = studio._id

        }
    })

    test("Return 200, id no longer found", async () => {

        const response = await request(app)
            .delete(`/api/v1/library/studios/${testId}`)
            .send("delete")
        expect(response.statusCode).toBe(200);

    })

    test("Return 200, id no longer found", async () => {

        const response = await request(app)
            .delete(`/api/v1/library/studios/${testId}`)
            .send("delete")
        expect(response.statusCode).toBe(200);

        const retry = await request(app)
            .delete(`/api/v1/library/studios/${testId}`)
            .send("delete")
        expect(retry.statusCode).toBe(400);
        expect(retry.body.errors).toBe("ID not found.");

    })

});

describe.skip("GET /api/v1/library/studios", () => {

    test("a list of studios is returned", async () => {

        const response = await request(app)
        .get("/api/v1/library/studios")

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

    });

});

