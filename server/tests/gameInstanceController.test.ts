// @ts-nocheck
import makeApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import GameInstance from "../models/gameInstance";
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

describe.skip("GET /gameInstance/:id", () => {
  test("successful get using existing id", async () => {
    const response = await request(app).get(
      "/api/v1/library/gameinstance/64e4df9c0f790ff853699fa1"
    );
    expect(response.statusCode).toBe(200);
  });

  describe("unsuccessful with wrong values", () => {
    test("correct format but invalid objectId", async () => {
      const response = await request(app).get(
        "/api/v1/library/gameinstance/64e4df9c0f790ff853699fa8"
      );
      expect(response.statusCode).toBe(404);
    });

    test("invalid objectId format", async () => {
      const response = await request(app).get(
        "/api/v1/library/gameinstance/invalid"
      );
      expect(response.statusCode).toBe(400);
    });

    test("objectId missing", async () => {
      const response = await request(app).get("/api/v1/library/gameinstance/");
      expect(response.statusCode).toBe(400);
    });
  });
});

describe.skip("POST /gameInstance/create", () => {
  test("successful creation using existing game", async () => {
    const response1 = await request(app)
      .post("/api/v1/library/gameinstance/create")
      .send({
        game: "64f324e2c8bbe3fede0a5bb1",
        status: "Available",
        due_back: new Date(),
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response1.statusCode).toBe(200);

    const response2 = await request(app)
      .post("/api/v1/library/gameinstance/create")
      .send({
        game: "64f324e2c8bbe3fede0a5bb1",
        status: "Loaned",
        due_back: new Date(),
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response2.statusCode).toBe(200);

    const response3 = await request(app)
      .post("/api/v1/library/gameinstance/create")
      .send({
        game: "64f324e2c8bbe3fede0a5bb1",
        status: "Lost",
        due_back: new Date(),
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response3.statusCode).toBe(200);
  });
});

describe.skip("POST /gameInstance/:id/update", () => {
  describe("Successful edit", () => {
    let gameId;
    let status;

    const game1 = "64ece275b5c60932e8f0a78f";
    const game2 = "64e4df9c0f790ff853699f99";
    const status1 = "Available";
    const status2 = "Lost";

    beforeEach(async () => {
      const response = await request(app).get(
        "/api/v1/library/gameinstance/64e4df9c0f790ff853699fa1"
      );

      if (response.body.game === game1) {
        gameId = game2;
      } else {
        gameId = game1;
      }

      if (response.body.status === status1) {
        status = status2;
      } else {
        status = status1;
      }
    });

    test("Valid id and game should respond with 200/ok", async () => {
      const response = await request(app)
        .post("/api/v1/library/gameinstance/64e4df9c0f790ff853699fa1/update")
        .send({
          game: gameId,
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);

      const review = await request(app).get(
        "/api/v1/library/gameInstance/64e4df9c0f790ff853699fa1"
      );
      expect(review.statusCode).toBe(200);
      expect(review.body.game).toBe(gameId);
    });

    test("Valid id and status should respond with 200/ok", async () => {
      const response = await request(app)
        .post("/api/v1/library/gameinstance/64e4df9c0f790ff853699fa1/update")
        .send({
          status: status,
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
    });

    test.skip("Valid id and date should respond with 200/ok", async () => {
      const newDate = new Date();

      const response = await request(app)
        .post("/api/v1/library/gameinstance/64e4df9c0f790ff853699fa1/update")
        .send({
          due_back: newDate,
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);

      const review = await request(app).get(
        "/api/v1/library/gameinstance/64e4df9c0f790ff853699fa1"
      );
      expect(review.body.due_back).toBe(newDate);
    });

    describe("Edit errors", () => {
      test("invalid id but correct format", async () => {
        const response = await request(app)
          .post("/api/v1/library/gameinstance/64eb7e040d1602d0a25fa2d4/update")
          .send({
            title: "Invalid ID",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toBe("GameInstance not found.");
      });

      test("invalid id format", async () => {
        const response = await request(app)
          .post("/api/v1/library/gameinstance/invalid/update")
          .send({
            title: "Invalid ID",
          })
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBe("Not a valid ObjectId.");
      });
    });
  });
});

describe.skip("DELETE /gameinstance/:id/delete", () => {
  let testId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    const response = await request(app)
      .post("/api/v1/library/gameinstance/create")
      .send({
        game: "64e797aa6f6e45da032679a6",
        status: "Available",
        due_back: new Date(),
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    if (response.statusCode === 200) {
      console.log("Test game instance created.");
      testId = response.body._doc._id;
    }
  });

  test("Return 200, id no longer found", async () => {
    const response = await request(app)
      .post(`/api/v1/library/gameinstance/${testId}/delete`)
      .send("delete");
    expect(response.statusCode).toBe(200);
  });

  test("Return 200, id no longer found", async () => {
    const response = await request(app)
      .post(`/api/v1/library/gameinstance/${testId}/delete`)
      .send("delete");
    expect(response.statusCode).toBe(200);

    const retry = await request(app)
      .post(`/api/v1/library/gameinstance/${testId}/delete`)
      .send("delete");
    expect(retry.statusCode).toBe(404);
    expect(retry.body.errors).toBe("ID not found.");
  });
});

describe.skip("GET /gameinstances/", () => {
  test("a list of gameinstances is returned", async () => {
    const response = await request(app).get("/api/v1/library/gameinstances");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /gameinstances/:id", () => {
  test("a list of gameinstances for the id is returned", async () => {
    const response = await request(app).get(
      "/api/v1/library/gameinstances/64f324e2c8bbe3fede0a5bb1"
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    console.log(response.body);
  });
});
