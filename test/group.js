const expect = require("chai").expect;
const netcdf4 = require("..");
const { join } = require("path");

const fixture = join(__dirname, "test_hgroups.nc");

describe("Group", function () {
  it("should read list of variables", function () {
    var file = new netcdf4.File("test/test_hgroups.nc", "r");
    expect(file.root.variables).to.have.property("UTC_time");
  });

  it("should read list of dimensions", function () {
    var file = new netcdf4.File("test/test_hgroups.nc", "r");
    expect(file.root.dimensions).to.have.property("recNum");
  });

  it("should read list of attributes", function () {
    var file = new netcdf4.File("test/test_hgroups.nc", "r");
    var attributes =
      file.root.subgroups["mozaic_flight_2012030419144751_ascent"].attributes;
    expect(attributes).to.have.property("airport_dep");
    expect(attributes).to.have.property("flight");
    expect(attributes).to.have.property("level");
    expect(attributes).to.have.property("airport_arr");
    expect(attributes).to.have.property("mission");
    expect(attributes).to.have.property("time_dep");
    expect(attributes).to.have.property("aircraft");
    expect(attributes).to.have.property("link");
    expect(attributes).to.have.property("phase");
    expect(attributes).to.have.property("time_arr");
  });

  it("should read list of subgroups", function () {
    console.log("BEFORE READ");
    var file = new netcdf4.File("test/test_hgroups.nc", "r");
    console.log("BEFORE SUBGROUPS");
    var subgroups = file.root.subgroups;
    console.log("AFTER SUBGROUPS");
    expect(subgroups).to.have.property(
      "mozaic_flight_2012030319051051_descent"
    );
    expect(subgroups).to.have.property(
      "mozaic_flight_2012030319051051_descent"
    );
    expect(subgroups).to.have.property(
      "mozaic_flight_2012030321335035_descent"
    );
    expect(subgroups).to.have.property("mozaic_flight_2012030403540535_ascent");
    expect(subgroups).to.have.property(
      "mozaic_flight_2012030403540535_descent"
    );
    expect(subgroups).to.have.property("mozaic_flight_2012030412545335_ascent");
    expect(subgroups).to.have.property("mozaic_flight_2012030419144751_ascent");
    expect(
      subgroups["mozaic_flight_2012030419144751_ascent"].constructor.name
    ).to.equal("Group");
  });

  it("should read name", function () {
    const file = new netcdf4.File("test/test_hgroups.nc", "r");
    expect(file.root.name).to.equal("/");
  });

  it("should read full name", function () {
    const file = new netcdf4.File("test/test_hgroups.nc", "r");
    expect(file.root.fullname).to.equal("/");
  });

  it("should read id", function () {
    const file = new netcdf4.File("test/test_hgroups.nc", "r");
    expect(typeof file.root.id).eq("number");
    expect(file.root.id).greaterThan(0);
  });

  it("has custom inspection", function () {
    const file = new netcdf4.File("test/test_hgroups.nc", "r");
    expect(file.root.inspect()).eq("[object Group]");
  });
});
