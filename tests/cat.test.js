const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../src/app");

describe("Cat routes", () => {
  it("Should return status code 200 when getting cat home page", async () => {
    const res = await request(app).get("/cats");
    console.log(res.text);
    expect(res.status).to.equal(200);
  });

  xit("creates a new artist in the database", async () => {
    const res = await request(app).post("/cats/create");
    console.log(res);
    expect(res.status).to.equal(201);
  });

  xit("Should list all cats in db", async () => {
    const res = await request(app).get("/cats/show");
    expect(res.status).to.equal(200);
  });
});
