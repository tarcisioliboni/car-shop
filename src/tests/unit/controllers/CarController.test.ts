import { Request, Response } from 'express';
import { expect } from 'chai';
import * as Sinon from 'sinon';
import CarsModel from '../../../models/CarModel';
import CarsService from '../../../services/CarService';
import CarsController from '../../../controllers/CarController';
import { validCar, updatedCar, updatedCarNoId, noIdCar } from '../../mocks/CarMock';


describe('Layer_Controller CRUD test on /cars', () => {
  const carsModel = new CarsModel()
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);
  const request = {} as Request; 
  const response = {} as Response;

  describe('Create car on /cars', () => {
    before(async () => {
      Sinon.stub(carsService, 'create').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Car created', async () => {
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns(response);
      request.body = noIdCar;
      await carsController.create(request, response);

      const status = response.status as Sinon.SinonStub
      expect(status.calledWith(201)).to.be.true;

      const json = response.json as Sinon.SinonStub
      expect(json.calledWith(validCar)).to.be.true;
    });
  });

  describe('Read all cars on /cars', () => {
    before(async () => {
      Sinon.stub(carsService, 'read').resolves([validCar]);
    });
    after(() => Sinon.restore());

    it('All cars', async () => {
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns(response);
      await carsController.read(request, response);

      const status = response.status as Sinon.SinonStub
      expect(status.calledWith(200)).to.be.true;

      const json = response.json as Sinon.SinonStub
      expect(json.calledWith([validCar])).to.be.true;
    });
  });

  describe('ReadOne car on /cars/:id', () => {
    before(async () => {
      Sinon.stub(carsService, 'readOne').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Car by id', async () => {
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns(response);
      request.params = {id: validCar._id};
      await carsController.readOne(request, response);

      const status = response.status as Sinon.SinonStub
      expect(status.calledWith(200)).to.be.true;

      const json = response.json as Sinon.SinonStub
      expect(json.calledWith(validCar)).to.be.true;
    });
  });


  describe('Update a car on /cars/:id', () => {
    before(async () => {
      Sinon.stub(carsService, 'update').resolves(updatedCar);
    });
    after(() => Sinon.restore());

    it('Car info updated', async () => {
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns(response);
      request.params = {id: updatedCar._id};
      request.body = updatedCarNoId;
      await carsController.update(request, response);

      const status = response.status as Sinon.SinonStub
      expect(status.calledWith(200)).to.be.true;

      const json = response.json as Sinon.SinonStub
      expect(json.calledWith(updatedCar)).to.be.true;
    });
  });

  describe('Delete a car on /cars/:id', () => {
    before(async () => {
      Sinon.stub(carsService, 'delete').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Delete a car by id', async () => {
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns(response);
      request.params = {id: updatedCar._id};
      await carsController.delete(request, response);

      const status = response.status as Sinon.SinonStub
      expect(status.calledWith(204)).to.be.true;

      const json = response.json as Sinon.SinonStub
      expect(json.calledWith()).to.be.true;
    });
  });
  
});