import { Car } from "../interface/car.interface";

export class DataCars {

  private static readonly BASE_VIN = "1HGCM82633A";
  private static readonly BASE_PRICE = 20000;

  private static readonly MAKES = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"];
  private static readonly MODELS = ["Corolla", "Civic", "Focus", "Malibu", "Altima"];
  private static readonly COLORS = ["Blue", "Red", "Black", "White", "Silver"];

  private static getRamdonInt( min: number, max: number ): number {
    return Math.floor( Math.random() * (max - min +1) ) + min;
  }

  public static getData( amount: number ): Car[] {

    const cars: Car[] = [];

    for( let i = 1; i <= amount; i++ ) {

      const car: Car = {

        vin: `${DataCars.BASE_VIN}${DataCars.getRamdonInt(1000, 9999)}`,
        make: DataCars.MAKES[DataCars.getRamdonInt( 0, DataCars.MAKES.length -1  )],
        model: DataCars.MODELS[DataCars.getRamdonInt( 0, DataCars.MODELS.length -1  )],
        color: DataCars.COLORS[DataCars.getRamdonInt( 0, DataCars.COLORS.length -1  )],
        year: DataCars.getRamdonInt(2020, 2024),
        price: DataCars.BASE_PRICE + DataCars.getRamdonInt(0, 10000),

      };
      cars.push(car);
    }
    return cars;
  }



}

