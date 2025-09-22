const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); // 👈 import your Express app

chai.should();
chai.use(chaiHttp);

describe("Photos", function () {
  this.timeout(5000);

  it("should load landing page with status 200", function (done) {
    chai
      .request(server)
      .get("/") // Landing page
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  it("should list ALL photos on /image GET", function (done) {
    chai
      .request(server)
      .get("/image")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
