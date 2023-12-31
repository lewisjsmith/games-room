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

describe.skip("GET /genres", () => {

    describe("given a valid ID", () => {
        // respond with JSON object of the game details
        // respond with a 200 status code 
        // specify json in the content type header
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/api/v1/library/genres/64f63d564ec1d8687b6f7006")
            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body)).toEqual(expect.arrayContaining(["title"]));
        });
    })

    describe("given an invalid ID", () => {

        // respond with 400 not found
        test("should respond with a 400 status code", async () => {
            const response = await request(app).get("/api/v1/library/genres/123")
            expect(response.statusCode).toBe(400);
            expect(response.body.errors).toBe("Not a valid ObjectId.");
        })

        // respond with 400 Invalid URL
        // test("shouldn't respond with all genres on this url", async () => {
        //     const response = await request(app).get("/api/v1/library/genres/")
        //     expect(response.statusCode).toBe(400);
        //     expect(response.body.errors).toBe("Invalid URL.");
        // })

        test("should respond with a 404 not found", async () => {
            const response = await request(app).get("/api/v1/library/genres/64e4df9c0f790ff853699f19")
            expect(response.statusCode).toBe(404);
        })
    })

})

describe.skip("POST /genres", () => {

    describe("Correct field details", () => {

        test("Should respond with 200/ok", async () => {
            const response = await request(app)
                .post("/api/v1/library/genres")
                .send({ title: `Genre Success Test ${Math.ceil(Math.random()*100)}`})
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);
        })

    });

    describe("Incorrect field details", () => {

        test("Invalid title should notify", async () => {
            const response = await request(app)
                .post("/api/v1/library/genres")
                .send({ title: "" })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400);
            expect(response.body.errors[0].path).toBe("title");
        });

    });

});

describe.skip("PUT /genre/:id", () => {

    describe("Successful edit", () => {

        test("Valid id and title should respond with 200/ok", async () => {

            const title = `Title Random ${Math.ceil(Math.random()*100)}` 

            const response = await request(app)
                .put("/api/v1/library/genres/64fafade9c04a2ed24beeb76")
                .send({
                    title: title
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);

            const review = await request(app)
                .get("/api/v1/library/genres/64fafade9c04a2ed24beeb76")
            expect(review.statusCode).toBe(200);
            expect(review.body.title).toBe(title);

        });

    })

    describe("Edit errors", () => {

        test("invalid input, title", async () => {

            const response = await request(app)
                .put("/api/v1/library/genres/64fafade9c04a2ed24beeb76")
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
                .put("/api/v1/library/genres/64eb7e040d1602d0a25fa2d4")
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
                .put("/api/v1/library/genres/invalid")
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

describe.skip("DELETE /genre/:id", () => {

    let testId: mongoose.Types.ObjectId;

    beforeEach(async () => {
        const title = `Delete test ${Math.ceil(Math.random() * 100)}`;
    
        const response = await request(app)
          .post("/api/v1/library/genres")
          .send({
            title: title,
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
    
        if (response.statusCode === 200) {
    
          console.log("Test genre created.");
          testId = response.body._id; 
    
        //   const gameResponse = await request(app)
        //   .post("/api/v1/library/game/create")
        //   .send({
        //     title: title,
        //     studio: "64e4df9c0f790ff853699f90",
        //     genre: testId,
        //     releaseDate: new Date()
        //   })
        //   .set("Content-Type", "application/json")
        //   .set("Accept", "application/json");

        //   console.log(gameResponse.statusCode);
    
        //   if (gameResponse.statusCode === 200) {
        //     console.log("Test game created.")
        //   }
    
        }
    
      });

    test("Return 200, id no longer found", async () => {

        const response = await request(app)
            .delete(`/api/v1/library/genres/${testId}`)
            .send("delete")
        expect(response.statusCode).toBe(200);

    })

    test("Return 200, id no longer found", async () => {

        const response = await request(app)
            .delete(`/api/v1/library/genres/${testId}`)
            .send("delete")
        expect(response.statusCode).toBe(200);

        const retry = await request(app)
            .delete(`/api/v1/library/genres/${testId}`)
            .send("delete")
        expect(retry.statusCode).toBe(400);
        expect(retry.body.errors).toBe("ID not found.");

    })

});

describe.skip("GET /api/v1/library/genres", () => {

    test("a list of genres is returned", async () => {

        const response = await request(app)
        .get("/api/v1/library/genres")

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

    });

});

