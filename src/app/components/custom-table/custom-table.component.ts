import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FlexRenderDirective, createAngularTable, getCoreRowModel } from '@tanstack/angular-table';
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

  public table = createAngularTable(() => ({
    data: this.data(),
    getCoreRowModel: getCoreRowModel(),
    columns: defaultColumns
  }));

}
