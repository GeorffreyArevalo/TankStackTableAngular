import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Column, ColumnFiltersState, FlexRenderDirective, PaginationState, SortingState, VisibilityState, createAngularTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/angular-table';
import { DataCars } from '../../helpers/get-data-cars.helpers';

import { CommonModule } from '@angular/common';
import { Car } from '../../interface/car.interface';
import { InputDebouncerComponent } from '../input-debouncer/input-debouncer.component';
import { defaultColumns } from './columns-definition';

@Component({
  selector: 'custom-table',
  standalone: true,
  imports: [
    CommonModule,
    FlexRenderDirective,
    InputDebouncerComponent,

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
  public readonly sortingState = signal<SortingState>([]);
  public readonly visibilityState = signal<VisibilityState>({});
  public readonly comlumnsFilters = signal<ColumnFiltersState>([]);

  public table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: this.paginationState(),
      sorting: this.sortingState(),
      columnVisibility: this.visibilityState(),
      columnFilters: this.comlumnsFilters(),
    },
    onPaginationChange: ( valueOrFunction ) => {
      typeof valueOrFunction === 'function'
      ? this.paginationState.update( valueOrFunction )
      : this.paginationState.set( valueOrFunction );
    },
    onSortingChange: ( valueSorting ) => {
      typeof valueSorting === 'function'
      ? this.sortingState.update( valueSorting )
      : this.sortingState.set( valueSorting );
    },
    onColumnVisibilityChange: ( valueOrFunction ) => {
      const visiblityStateChange = valueOrFunction instanceof Function
      ? valueOrFunction( this.visibilityState() )
      : valueOrFunction;
      this.visibilityState.set( visiblityStateChange );
    },
    onColumnFiltersChange: ( filterChange ) => {
      filterChange instanceof Function
      ? this.comlumnsFilters.update( filterChange )
      : this.comlumnsFilters.set( filterChange );
    }
  }));

  onChangeValueSelect( e: Event ) {

    const element = ( e.target as HTMLSelectElement );
    this.table.setPageSize(+element.value);

  }

  onSortingColumn( column: Column<Car> ) {
    column.toggleSorting( column.getIsSorted() === 'asc' );
  }

  onSearch( value: string ) {
    this.table.getColumn('make')?.setFilterValue(value);

  }


}
