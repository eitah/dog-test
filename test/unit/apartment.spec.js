/* eslint-disable no-unused-expressions, no-console, no-underscore-dangle, func-names, prefer-arrow-callback, max-len */

const expect = require('chai').expect;
const Apartment = require('../../dst/models/apartment');
const Renter = require('../../dst/models/renter');
const sinon = require('sinon');

describe('Apartment', () => {
  beforeEach(() => {
    sinon.stub(Apartment, 'find').yields(null, []);
  });

  afterEach(() => {
    Apartment.find.restore();
  });

  describe('#lease', () => {
    it('should lease an apartment object', (done) => {
      const a = new Apartment({
        name: 'a1',
        sqft: 1000,
        rooms: 2,
        rent: 1500,
        deposit: 100,
        rentDue: 5,
        lateFee: 15,
      });
      const r = new Renter({
        name: 'Steve',
        money: 5000,
        apartment: null,
        complaints: 1,
      });

      const leasedApartment = a.lease(r);

      a.validate(err => {
        expect(err).to.be.undefined;
        expect(leasedApartment.renter.name).to.equal(Steve);
        expect(leasedApartment.renter._id).to.be.ok;
        expect(leasedApartment.name).to.be('a1');
        done();
      });
    });

  describe('constructor', () => {
    it('should create an  apartment object', (done) => {
      const a = new Apartment({
        name: 'a1',
        sqft: 1000,
        rooms: 2,
        rent: 1500,
        deposit: 100,
        rentDue: 5,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.undefined;
        expect(a.name).to.equal('a1');
        expect(a._id).to.be.ok;
        expect(a.dateCreated).to.be.ok;
        done();
      });
    });

    it('should NOT create a apartment object - sqft min: 500, max: 2500', (done) => {
      const a = new Apartment({
        name: 'a1',
        sqft: 8000,
        rooms: 2,
        rent: 1500,
        deposit: 100,
        rentDue: 5,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a apartment object - rooms  min: 1, max: 4 ', (done) => {
      const a = new Apartment({
        name: 'a1',
        sqft: 1000,
        rooms: 5,
        rent: 1500,
        deposit: 100,
        rentDue: 5,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
  });
  });
});
