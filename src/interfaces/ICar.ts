import { z } from 'zod';
import { zVehicleSchema } from './IVehicle';

const zCarSchema = zVehicleSchema.extend({
  doorsQty: z.number()
    .min(2, { message: 'Doors quantity must be 2 or higher' })
    .max(4, { message: 'Doors quantity must be 4 or lower' }),
  seatsQty: z.number()
    .min(2, { message: 'Seats quantity must be 2 or higher' })
    .max(7, { message: 'Seats quantity must be 7 or lower' }),
});

type ICar = z.infer<typeof zCarSchema>;

export { ICar, zCarSchema };
