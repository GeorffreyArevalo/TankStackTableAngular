import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FlexRenderDirective, PaginationState, createAngularTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/angular-table';
import { DataCars } from '../../helpers/get-data-cars.helpers';

import { Car } from '../../interface/car.interface';
import { defaultColumns } from './columns-definition';

@Component({
  selector: 'custom-table',
  standalone: true,
  imports: [

    FlexRenderDirective

  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent {

  public data = signal<Car[]>(DataCars.getData(100));

  public readonly sizesPages = signal<number[]>([5, 10, 25, 50, 100]);

  public readonly paginationState = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  public table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: this.paginationState(),
    },
    onPaginationChange: ( valueOrFunction ) => {
      typeof valueOrFunction === 'function'
      ? this.paginationState.update( valueOrFunction )
      : this.paginationState.set( valueOrFunction );
    }
  }));

  onChangeValueSelect( e: Event ) {

    const element = ( e.target as HTMLSelectElement );
    this.table.setPageSize(+element.value);

  }



}
