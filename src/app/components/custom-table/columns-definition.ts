
import { ColumnDef, FilterFn, Row } from '@tanstack/angular-table';
import { Car } from '../../interface/car.interface';

const customFilterFn: FilterFn<Car> = (
  row: Row<Car>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
): boolean => {
  filterValue = filterValue.toLowerCase();
  const rowValues = Object.values( row.original ).map( value => value).join(' ').toLowerCase();
  return rowValues.includes( filterValue );
}


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
    filterFn: customFilterFn,
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
