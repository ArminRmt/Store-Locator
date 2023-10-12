const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../socketManager");
const db = require("../../config/db-config.js");
const User = db.User;
const argon2 = require("argon2");
const sinon = require("sinon");

chai.use(chaiHttp);
const expect = chai.expect;

describe("POST /signup", () => {
  it("should create a new user", async () => {
    const userData = {
      full_name: "John Doe",
      phone: "1234567890",
      password: "password123",
      role: "buyer",
    };

    // Use sinon to stub the User.create method to avoid hitting the database
    const createStub = sinon.stub(User, "create");
    createStub.resolves({
      full_name: userData.full_name,
      phone: userData.phone,
      password: await argon2.hash(userData.password), // Hash the password
      role: userData.role,
    });

    const res = await chai
      .request(app)
      .post("/user-admin/signup")
      .send(userData);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("msg").to.equal("ثبت نام موفقیت‌آمیز");
    expect(res.body).to.have.property("newUser");

    // Ensure that the User.create method was called with the correct data
    expect(createStub).to.have.been.calledOnceWith(userData);

    // Restore the original User.create method
    createStub.restore();
  });

  it("should handle errors and return a 500 status code", async () => {
    const userData = {
      full_name: "John Doe",
      phone: "1234567890",
      password: "password123",
      role: "buyer", // Change the role as needed
    };

    // Use sinon to stub the User.create method to simulate an error
    const createStub = sinon.stub(User, "create");
    createStub.rejects(new Error("Database error"));

    const res = await chai
      .request(app)
      .post("/user-admin/signup")
      .send(userData);

    expect(res).to.have.status(500);
    expect(res.body)
      .to.have.property("msg")
      .to.equal("مشکلی در ثبت نام به وجود آمده است.");

    // Ensure that the User.create method was called with the correct data
    expect(createStub).to.have.been.calledOnceWith(userData);

    // Restore the original User.create method
    createStub.restore();
  });
});
