/* eslint-disable no-unused-expressions, no-console, no-underscore-dangle, func-names, prefer-arrow-callback, max-len */

const expect = require('chai').expect;
const Dog = require('../../dst/models/dog');
const sinon = require('sinon');

describe('Dog', () => {
  beforeEach(() => {
    sinon.stub(Dog, 'find').yields(null, []);
  });

  afterEach(() => {
    Dog.find.restore();
  });

  describe('#feed', () => {
    it('should add 10 to the dogs health', () => {
      const d = new Dog({
        name: 'Fido',
        age: 3,
        health: 50,
        toy: 'Bones',
      });
      // this.stub(d, 'save').yields(null, { health: 60 });
      d.feed();
      expect(d.health).to.equal(60);
      // sinon.assert.calledOnce(d.save);
      //  done();
    });
    it('should add less than 10 to the dogs health - if health is 95', () => {
      const d = new Dog({
        name: 'Fido',
        age: 3,
        health: 95,
        toy: 'Bones',
      });
      d.feed();
      expect(d.health).to.equal(100);
    });
  });
  //
  // describe('#feed', () => {
  //   it('should add 10 to the dogs health', sinon.test(function (done) {
  //     const d = new Dog({
  //       name: 'Fido',
  //       age: 3,
  //       health: 50,
  //       toy: 'Bones',
  //     });
  //     // this.stub(d, 'save').yields(null, { health: 60 });
  //     d.feed((health) => {
  //       expect(health).to.equal(60);
  //       // sinon.assert.calledOnce(d.save);
  //       done();
  //     });
  //   }));
  // });

  describe('constructor', () => {
    it('should create a dog object', (done) => {
      const d = new Dog({
        name: 'Fido',
        age: 3,
        health: 50,
        toy: 'Bones',
      });
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.name).to.equal('Fido');
        expect(d._id).to.be.ok;
        expect(d.dateCreated).to.be.ok;
        done();
      });
    });

    it('should NOT create a dog - negative health', (done) => {
      const d = new Dog({
        name: 'Fido',
        age: 3,
        health: -50,
        toy: 'Bones',
      });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a dog - missing name', (done) => {
      const d = new Dog({
        age: 3,
        health: 50,
        toy: 'Bones',
      });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a dog - name too short', (done) => {
      const d = new Dog({
        name: 'aa',
        age: 3,
        health: 50,
        toy: 'Bones',
      });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a dog - invalid toy', (done) => {
      const d = new Dog({
        name: 'aa',
        age: 3,
        health: 50,
        toy: 'Cat',
      });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a dog - duplicate dog found', (done) => {
      Dog.find.yields(null, [{ name: 'max' }]);
      const d = new Dog({
        name: 'max',
        age: 3,
        health: 50,
        toy: 'Bones',
      });
      d.validate(err => {
        expect(err).to.be.ok;
        sinon.assert.calledWith(Dog.find, { name: 'max' });
        done();
      });
    });
  });
});
