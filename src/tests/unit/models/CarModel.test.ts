import { expect } from 'chai';
import { Model } from 'mongoose';
import * as Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { validCar, coverageCar, updatedCar } from '../../mocks/CarMock';

const carModel = new CarModel();

describe('Layer_Model CRUD test on /cars', () => {

  describe('Create car on /cars', () => {
    before(async () => {
      Sinon.stub(Model, 'create').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Car created', async () => {
      const created = await carModel.create(coverageCar);
      expect(created).to.be.an('object');
      expect(created).to.be.deep.equal(validCar);
    });
  });

  describe('Read all cars on /cars', () => {
    before(async () => {
      Sinon.stub(Model, 'find').resolves([validCar]);
    });
    after(() => Sinon.restore());

    it('All cars', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.an('array');
      expect(allCars[0]).to.be.an('object');
      expect(allCars[0]).to.be.deep.equal(validCar);
    });
  });

  describe('ReadOne car on /cars/:id', () => {
    before(async () => {
      Sinon.stub(Model, 'findOne').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Car by id', async () => {
      const car = await carModel.readOne(validCar._id);
      expect(car).to.be.an('object');
      expect(car).to.be.deep.equal(validCar);
    });
  });


  describe('Update a car on /cars/:id', () => {
    before(async () => {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCar);
    });
    after(() => Sinon.restore());

    it('Car info updated', async () => {
      const updated = await carModel.update(validCar._id, { ...validCar, buyValue: 4000 });
      expect(updated).to.be.an('object');
      expect(updated).to.be.deep.equal(updatedCar);
    });
  });

  describe('Delete a car on /cars/:id', () => {
    before(async () => {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Delete a car by id', async () => {
      const deleted = await carModel.delete(validCar._id);
      expect(deleted).to.be.an('object');
      expect(deleted).to.be.deep.equal(validCar);
    });
  });
});