import { z } from 'zod';
import { zVehicleSchema } from './IVehicle';

const zMotorcycleSchema = zVehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().lte(2500).positive(),
});

type IMotorcycle = z.infer<typeof zMotorcycleSchema>;

export { IMotorcycle, zMotorcycleSchema };
