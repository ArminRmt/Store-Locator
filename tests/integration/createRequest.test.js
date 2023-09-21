const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../socketManager");
const io = require("socket.io-client");
const { addToQueue } = require("../../socketManager"); // Import addToQueue function
const sinon = require("sinon");

chai.use(chaiHttp);
const expect = chai.expect;

describe("POST /createRequest", () => {
  let socketClient;

  // Initialize a socket.io client before running the tests
  before((done) => {
    // Connect to your socket.io server (make sure your server is running)
    socketClient = io.connect("http://localhost:8081");
    socketClient.on("connection", () => {
      done();
    });
  });

  // Close the socket.io client after running the tests
  after(() => {
    socketClient.disconnect();
  });

  it("should create a new request and emit to online sellers", (done) => {
    const requestData = {
      piece_name: "Test Piece",
      content: "Test content",
      userLongitude: 52.6893,
      userLatitude: 36.5393,
    };

    chai
      .request(app)
      .post("/createRequest")
      .send(requestData)
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        // Check the properties of the response
        expect(res.body)
          .to.have.property("msg")
          .to.equal("درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد");
        expect(res.body).to.have.property("request_id").to.be.a("number");
        expect(res.body).to.have.property("piece_name").to.equal("Test Piece");
        expect(res.body).to.have.property("content").to.equal("Test content");
        expect(res.body).to.have.property("timestamp").to.be.a("string");

        // Check the structure of nearest_shops array
        expect(res.body).to.have.property("nearest_shops").to.be.an("array");

        // Check the properties of each shop in nearest_shops
        res.body.nearest_shops.forEach((shop) => {
          expect(shop).to.have.property("id").to.be.a("number");
          expect(shop).to.have.property("seller_id").to.be.a("number");
          expect(shop).to.have.property("latitude").to.be.a("string");
          expect(shop).to.have.property("longitude").to.be.a("string");
        });

        // Simulate an online seller by emitting a socket event
        socketClient.on("newRequest", (data) => {
          expect(data).to.be.an("object");
          expect(data).to.have.property("users_id").to.be.a("number");
          expect(data).to.have.property("piece_name").to.equal("Test Piece");
          expect(data).to.have.property("content").to.equal("Test content");
          expect(data).to.have.property("timestamp").to.be.a("string");
          done();
        });

        // Check if addToQueue was not called for online sellers
        expect(addToQueue).to.not.have.been.called;
      });
  });

  it("should create a new request and call addToQueue for offline sellers", (done) => {
    // Stub the addToQueue function to track if it's called
    const addToQueueStub = sinon.stub(addToQueue);

    // Modify the module to use the stub instead of the original function
    const rewire = require("rewire");
    const yourModule = rewire("../../socketManager.js");
    yourModule.__set__("addToQueue", addToQueueStub);

    const requestData = {
      piece_name: "Test Piece",
      content: "Test content",
      userLongitude: 52.6893,
      userLatitude: 36.5393,
    };

    chai
      .request(app)
      .post("/createRequest")
      .send(requestData)
      .end(async (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        // Check the properties of the response
        expect(res.body)
          .to.have.property("msg")
          .to.equal("درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد");
        expect(res.body).to.have.property("request_id").to.be.a("number");
        expect(res.body).to.have.property("piece_name").to.equal("Test Piece");
        expect(res.body).to.have.property("content").to.equal("Test content");
        expect(res.body).to.have.property("timestamp").to.be.a("string");

        // Check the structure of nearest_shops array
        expect(res.body).to.have.property("nearest_shops").to.be.an("array");

        // Check the properties of each shop in nearest_shops
        res.body.nearest_shops.forEach((shop) => {
          expect(shop).to.have.property("id").to.be.a("number");
          expect(shop).to.have.property("seller_id").to.be.a("number");
          expect(shop).to.have.property("latitude").to.be.a("string");
          expect(shop).to.have.property("longitude").to.be.a("string");
        });

        // Check if addToQueue was called for offline sellers
        expect(addToQueueStub).to.have.been.called;

        done();
      });
  });
});
