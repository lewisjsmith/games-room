import app from "../server";
import request from "supertest";
import mongoose from "mongoose";

describe("GET /game", () => {

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
            expect(Object.keys(response.body[0])).toContain("title");
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