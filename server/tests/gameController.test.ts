// @ts-nocheck

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
  describe("given a valid ID", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get(
        "/api/v1/library/game/64e797aa6f6e45da032679a6"
      );
      expect(response.statusCode).toBe(200);
    });

    // Tests for keys here, title first
    test("should respond with a json object of the document", async () => {
      const response = await request(app).get(
        "/api/v1/library/game/64e797aa6f6e45da032679a6"
      );
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          "_id",
          "title",
          "studio",
          "genre",
          "releaseDate",
        ])
      );
    });
  });

  describe("given an invalid ID", () => {
    // respond with 400 not found
    test("invalid format should respond with a 400 status code", async () => {
      const response = await request(app).get("/api/v1/library/game/123");
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBe("Not an ObjectId.");
    });

    // respond with 400 Invalid URL
    test("index page should respond with an error", async () => {
      const response = await request(app).get("/api/v1/library/game/");
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBe("Invalid URL.");
    });

    test("correct objectId format but not found on DB", async () => {
      const response = await request(app).get(
        "/api/v1/library/game/64e797aa6f6e45da032679a5"
      );
      expect(response.statusCode).toBe(404);
    });
  });
});

describe.skip("POST /game/create", () => {
  describe("Correct field details", () => {
    test("Should respond with 200/ok", async () => {
      const response = await request(app)
        .post("/api/v1/library/game/create")
        .send({
          title: "Testing game creation",
          studio: "64e4df9c0f790ff853699f8f",
          genre: "64e4df9c0f790ff853699f88",
          releaseDate: new Date(),
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body)).toContain("_id");
    });
  });

  describe("Incorrect field details", () => {
    test("Invalid title should notify", async () => {
      const response = await request(app)
        .post("/api/v1/library/game/create")
        .send({
          title: "",
          studio: "64e4df9c0f790ff853699f8f",
          genre: "64e4df9c0f790ff853699f88",
          releaseDate: new Date(),
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].path).toBe("title");
    });
  });
});

describe.skip("POST /game/:id/update", () => {
  describe("Successful edit", () => {
    test("Valid id and title should respond with 200/ok", async () => {
      const title = `v${Math.ceil(Math.random() * 100)}`;

      const response = await request(app)
        .post("/api/v1/library/game/64ede7bf0412fbed05bf7eee/update")
        .send({
          title: title,
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);

      const review = await request(app).get(
        "/api/v1/library/game/64ede7bf0412fbed05bf7eee"
      );
      expect(review.statusCode).toBe(200);
      expect(review.body.title).toBe(title);
    });
  });

  describe("Edit errors", () => {

    test("invalid id but correct format", async () => {
      const response = await request(app)
        .post("/api/v1/library/game/64ede7bf0412fbed05bf7eef/update")
        .send({
          title: "ID shouldn't be found",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(404);
    });

    test("invalid id format", async () => {
      const response = await request(app)
        .post("/api/v1/library/game/invalid/update")
        .send({
          title: "ID must be an ObjectID",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBe("Not a valid ObjectId.");
    });

    test("repeated titles", async () => {
      const response = await request(app)
        .post("/api/v1/library/game/64eccecdb5c60932e8f0a770/update")
        .send({
          title:"v4",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBe("Name in use.");
    });
  });
});

describe.skip("DELETE /game/:id/delete", () => {
  let testId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    const title = `Delete test ${Math.ceil(Math.random() * 100)}`;

    const response = await request(app)
      .post("/api/v1/library/game/create")
      .send({
        title: title,
        studio: "64e4df9c0f790ff853699f90",
        genre: "64e4df9c0f790ff853699f88",
        releaseDate: new Date(),
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    if (response.statusCode === 200) {

      console.log("Test game created.");
      testId = response.body._id; 

      const instanceResponse = await request(app)
      .post("/api/v1/library/gameinstance/create")
      .send({
        game: testId,
        status: "Available",
        due_back: new Date(),
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

      if (instanceResponse.statusCode === 200) {
        console.log("Test gameInstance created.")
      }

    }

  });

  test("Return 200, id no longer found", async () => {
    const response = await request(app)
      .post(`/api/v1/library/game/${testId}/delete`)
      .send("delete");
    expect(response.statusCode).toBe(200);

    const retry = await request(app)
      .post(`/api/v1/library/game/${testId}/delete`)
      .send("delete");
    expect(retry.statusCode).toBe(404);
    expect(retry.body.errors).toBe("ID not found.");
  });
});

describe.skip("GET /api/v1/library/games", () => {
  test("a list of games is returned", async () => {
    const response = await request(app).get("/api/v1/library/games");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

// Alter game instances on game rename or delete
// Don't allow duplicate names
// Add before / after for providing exactly what is needed for tests
