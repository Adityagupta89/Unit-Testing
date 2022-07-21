const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");
describe("absolute", () => {
  it("should return a positive number if  input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); //matching function
  });
  it("should return a positive number if  input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should return a 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Aditya");
    expect(result).toMatch(/Aditya/); //use regulation expression for exact match
    expect(result).toContain("Aditya"); //alernative of regulation express
  });
});
describe("getCurrencies", () => {
  it("should return supported correncies", () => {
    const result = lib.getCurrencies();
    //too general useless
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    //Too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    // Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});
describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1); //toBe can't use because it's match memory location
    expect(result).toEqual({ id: 1, price: 10 }); //it's match all the property's so send all properties
    expect(result).toMatchObject({ id: 1, price: 10 }); //it's does not match exact properties
    expect(result).toHaveProperty("id", 1); //it's does not match exact properties
  });
});
describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    //Null underfined NaN  '' 0 false
    const arg = [null, undefined, NaN, "", 0, false];
    arg.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});
describe("applyDiscount", () => {
  it("should apply 10 % discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = function (customerId) {
      return { email: "a" };
    };
    let mailSent = false;
    mail.send = function (email, message) {
      mailSent = true;
    };
    lib.notifyCustomer({ customerId: 1 });
    expect(mailSent).toBe(true);
  });
});
