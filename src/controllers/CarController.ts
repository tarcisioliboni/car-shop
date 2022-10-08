import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const allCars = await this._service.read();
    return res.status(200).json(allCars);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const car = await this._service.readOne(id);
    return res.status(200).json(car);
  }
}

export default CarController;
