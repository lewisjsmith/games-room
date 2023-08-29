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
        });

        // Tests for keys here, title first
        test("should respond with a json object with the document", async () => {
            const response = await request(app).get("/api/v1/library/genre/64e4df9c0f790ff853699f88")
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
            const response = await request(app).get("/api/v1/library/genre/64e4df9c0f790ff853699f86")
            expect(response.statusCode).toBe(404);
        })
    })

})

describe.skip("POST /genre/create", () => {

    describe("Correct field details", () => {

        test("Should respond with 200/ok", async () => {
            const response = await request(app)
                .post("/api/v1/library/genre/create")
                .send({ title: "Genre success Test", founded: new Date() })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);
        })

    });

    describe("Incorrect field details", () => {

        test("Invalid title should notify", async () => {
            const response = await request(app)
                .post("/api/v1/library/genre/create")
                .send({ title: ""})
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Invalid input(s) for title");
        });

    });

});

describe.skip("POST /game/:id/update", () => {

    describe("Successful edit", () => {

        test("Valid id and title should respond with 200/ok", async () => {

            const title = `Title Random ${Math.ceil(Math.random()*100)}` 

            const response = await request(app)
                .post("/api/v1/library/genre/64edc7a1f3984f2bf7513c50/update")
                .send({
                    title: title
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);

            const review = await request(app)
                .get("/api/v1/library/genre/64edc7a1f3984f2bf7513c50")
            expect(review.statusCode).toBe(200);
            expect(review.body.title).toBe(title);

        });

    })

    describe("Edit errors", () => {

        test("invalid input, title", async () => {

            const response = await request(app)
                .post("/api/v1/library/genre/64edc7a1f3984f2bf7513c50/update")
                .send({
                    title: ""
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("No input title.");

        });

        test("invalid id but correct format", async () => {
            const response = await request(app)
                .post("/api/v1/library/genre/64edc7a1f3984f2bf7513c51/update")
                .send({
                    title: "Invalid ID"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(404);
            expect(response.body.errors).toBe("ID not found.");
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
            expect(response.body.errors).toBe("Invalid ID format.");
        });

    });

});

// describe.skip("DELETE /game/:id/delete", () => {

//     let testId: mongoose.Types.ObjectId;

//     beforeEach(async () => {

//         const response = await request(app)
//             .post("/api/v1/library/studio/create")
//             .send({
//                 title: "Testing delete function",
//                 founded: new Date()
//             })
//             .set('Content-Type', 'application/json')
//             .set('Accept', 'application/json')

//         if (response.statusCode === 200) {

//             console.log("Test studio created.");

//             const studio = await Studio
//                 .find({ "title": "Testing delete function" })
//                 .exec()

//             testId = studio[0]._id

//         }
//     })

//     test("Return 200, id no longer found", async () => {

//         const response = await request(app)
//             .post(`/api/v1/library/studio/${testId}/delete`)
//             .send("delete")
//         expect(response.statusCode).toBe(200);

//     })

//     test("Return 200, id no longer found", async () => {

//         const response = await request(app)
//             .post(`/api/v1/library/studio/${testId}/delete`)
//             .send("delete")
//         expect(response.statusCode).toBe(200);

//         const retry = await request(app)
//             .post(`/api/v1/library/studio/${testId}/delete`)
//             .send("delete")
//         expect(retry.statusCode).toBe(400);
//         expect(retry.body.errors).toBe("ID not found.");

//     })

// });

// describe("GET /api/v1/library/studios", () => {

//     test("a list of studios is returned", async () => {

//         const response = await request(app)
//         .get("/api/v1/library/studios")

//         expect(response.statusCode).toBe(200);
//         expect(response.body.length).toBeGreaterThan(0);

//     });

// });

