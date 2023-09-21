const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server"); // Replace with the path to your Express app file

chai.use(chaiHttp);
const expect = chai.expect;

describe("POST /createRequest", () => {
  it("should create a new request", (done) => {
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
      .end((err, res) => {
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

        done();
      });
  });
});
