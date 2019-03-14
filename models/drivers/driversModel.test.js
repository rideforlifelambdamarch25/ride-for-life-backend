const db = require("../../data/dbConfig");

const Drivers = require("./driversModel");

const fake = require("faker");

const newDriver = {
  firstname: "Steph",
  lastname: "Curry",
  phone: "3235465879",
  vehicle_type: "motorcycle",
  location: `"21.2364, 21.8143"`,
  username: "splash_30",
  password: "password",
  email: "gsw30@gsw.com",
  price: 120
};

const randomDriver = {
  firstname: fake.name.firstName(),
  lastname: fake.name.lastName(),
  phone: fake.phone.phoneNumber(),
  vehicle_type: "motorcycle",
  location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
  username: fake.internet.userName(),
  password: "password",
  email: fake.internet.email(),
  price: fake.random.number(200)
};

const newReview = {
  review_content:
    "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
  rating: 3,
  user_id: 2,
  driver_id: 1,
  ride_id: 1
};

const newRide = {
  driver_id: 1,
  start_location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
  end_location: `${fake.address.latitude()}, ${fake.address.longitude()}`
};

describe("Drivers Model", () => {
  afterEach(async () => {
    await db("drivers").truncate();
    await db("reviews").truncate();
    await db("rides").truncate();
  });

  describe("GET QUERIES", () => {
    describe("getDrivers()", () => {
      it("should retrieve an array of drivers from the db", async () => {
        await Drivers.addDriver(newDriver);
        await Drivers.addDriver(randomDriver);

        const drivers = await Drivers.getDrivers();

        expect(drivers.length).toEqual(2);
      });
    });

    describe("findDriverByQuery()", () => {
      it("should retrieve the user by username, phone, or email", async () => {
        await Drivers.addDriver(newDriver);
        await Drivers.addDriver(randomDriver);
        const driver = await Drivers.findDriverByQuery("splash_30");
        expect(driver.firstname).toEqual("Steph");
      });
    });

    describe("getDriverRideTotal()", () => {
      it("should retrieve the total number of riders per driver", async () => {
        await Drivers.addDriver(newDriver);
        await Drivers.addDriver(randomDriver);
        await Drivers.addRide(newRide);

        const driverRides = await Drivers.getDriverRideTotal(1);

        expect(driverRides.total_rides).toEqual(1);
      });
    });

    describe("getRideById()", () => {
      it("should retrieve correct ride by id", async () => {
        await Drivers.addDriver(newDriver);
        await Drivers.addDriver(randomDriver);
        await Drivers.addRide(newRide);

        const driverRides = await Drivers.getRideById(1);

        expect(driverRides.driver_id).toEqual(1);
      });
    });

    describe("getDriverReviews()", () => {
      it("should retrieve all driver reviews", async () => {
        await Drivers.addDriver(newDriver);
        await Drivers.addDriver(randomDriver);
        await Drivers.addDriverReview(newReview);

        const review = await Drivers.getReviews();
        expect(review.length).toEqual(1);
      });
    });

    describe("getDriverById()", () => {
      it("should retrieve the specified driver by id", async () => {
        await Drivers.addDriver(newDriver);
        await Drivers.addDriver(randomDriver);

        const driver = await Drivers.getDriverById(1);
        expect(driver.firstname).toEqual("Steph");
      });
    });

    describe("getReviewById()", () => {
      it("should retrieve all driver reviews", async () => {
        await Drivers.addDriver(newDriver);
        await Drivers.addDriver(randomDriver);
        await Drivers.addDriverReview(newReview);

        const review = await Drivers.getReviewById(1);
        expect(review.rating).toEqual(3);
      });
    });
  });

  describe("DELETE", () => {
    afterEach(async () => {
      await db("drivers").truncate();
    });

    it("should delete a driver from the db", async () => {
      await Drivers.addDriver(newDriver);
      await Drivers.addDriver(randomDriver);
      await Drivers.removeDriver(2);

      const drivers = await Drivers.getDrivers();

      expect(drivers.length).toEqual(1);
    });
  });

  describe("UPDATE", () => {
    afterEach(async () => {
      await db("drivers").truncate();
    });

    it("should update a driver in the db", async () => {
      await Drivers.addDriver(newDriver);
      await Drivers.addDriver(randomDriver);

      const changes = { firstname: "Updated" };

      await Drivers.updateDriver(1, changes);

      const driver = await Drivers.getDriverById(1);

      expect(driver.firstname).toEqual("Updated");
    });
  });
});
