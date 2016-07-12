/* eslint-disable no-unused-expressions, no-console, no-underscore-dangle, func-names, prefer-arrow-callback, max-len */

const expect = require('chai').expect;
const Renter = require('../../dst/models/renter');
const sinon = require('sinon');

describe('Renter', () => {
  describe('constructor', () => {
    it('should create a renter object', (done) => {
      const r = new Renter({
        name: 'Steve',
        money: 5000,
        apartment: null,
        complaints: 1,
      });
      r.validate(err => {
        expect(err).to.be.undefined;
        expect(r.name).to.equal('Steve');
        expect(r._id).to.be.ok;
        expect(r.dateCreated).to.be.ok;
        done();
      });
    });


   it('should NOT create a renter object - name length > 2', (done) => {
      const r = new Renter({
        name: 'S',
        money: 5000,
        apartment: null,
        complaints: 1,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a renter object - name is missing', (done) => {
      const r = new Renter({
        money: 5000,
        apartment: null,
        complaints: 1,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a renter object - money is < 1000', (done) => {
      const r = new Renter({
        name: 'Steve',
        money: 900,
        apartment: null,
        complaints: 1,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a renter object - money is missing', (done) => {
      const r = new Renter({
        name: 'Steve',
        apartment: null,
        complaints: 1,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a renter object - complainets should be b/w 0-3', (done) => {
      const r = new Renter({
        name: 'Steve',
        money: 8000,
        apartment: null,
        complaints: 4,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    

 });
});
