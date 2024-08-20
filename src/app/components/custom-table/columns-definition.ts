
import { ColumnDef } from '@tanstack/angular-table';
import { Car } from '../../interface/car.interface';


export const defaultColumns: ColumnDef<Car>[] = [

  {
    id: 'vin',
    accessorFn: (row) => row.vin,
    cell: info => info.getValue(),
    header: 'VIN',
  },
  {
    id: 'make',
    accessorFn: (row) => row.make,
    cell: info => info.getValue(),
    header: 'Make',
  },
  {
    id: 'model',
    accessorFn: (row) => row.model,
    cell: info => info.getValue(),
    header: 'Model',
  },
  {
    id: 'color',
    accessorFn: (row) => row.color,
    cell: info => info.getValue(),
    header: 'Color',
  },
  {
    id: 'price',
    accessorFn: (row) => row.price,
    cell: info => info.getValue(),
    header: 'Price',
  },
  {
    id: 'year',
    accessorFn: (row) => row.year,
    cell: info => info.getValue(),
    header: 'Year',
  },

]
