import { expect } from 'chai';
import * as Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { validCar, updatedCar, updatedCarNoId, noIdCar } from '../../mocks/CarMock';

const carModel = new CarModel();
const carsService = new CarService(carModel);

describe('Layer_Service CRUD test on /cars', () => {

	describe('Create car on /cars', () => {
		before(async () => {
      Sinon.stub(carModel, 'create').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Car created', async () => {
			const created = await carsService.create(noIdCar);
			expect(created).to.be.deep.equal(validCar);
		});
	});

	describe('Read all cars on /cars', () => {
		before(async () => {
      Sinon.stub(carModel, 'read').resolves([validCar]);
    });
    after(() => Sinon.restore());

		it('All cars', async () => {
			const allCars = await carsService.read();
			expect(allCars).to.be.deep.equal([validCar]);
		});
	});

	describe('ReadOne car on /cars/:id', () => {
		before(async () => {
      Sinon.stub(carModel, 'readOne').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Car by id', async () => {
			const car = await carsService.readOne(validCar._id);
			expect(car).to.be.deep.equal(validCar);
		});
	});

	describe('Update a car on /cars/:id', () => {
		before(async () => {
      Sinon.stub(carModel, 'update').resolves(validCar);
    });
    after(() => Sinon.restore());
		it('Car info updated', async () => {
			const updated = await carsService.update(updatedCar._id, updatedCarNoId)
			expect(updated).to.be.deep.equal(validCar);
		});
	});

	describe('Delete a car on /cars/:id', () => {
		before(async () => {
      Sinon.stub(carModel, 'delete').resolves(validCar);
    });
    after(() => Sinon.restore());

    it('Delete a car by id', async () => {
			const deleted = await carsService.delete(validCar._id);
			expect(deleted).to.be.deep.equal(validCar);
		});
	});

});