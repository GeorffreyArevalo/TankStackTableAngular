import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, input, output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'input-debouncer',
  standalone: true,
  imports: [],
  templateUrl: './input-debouncer.component.html',
  styleUrl: './input-debouncer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDebouncerComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncer$?: Subscription;

  public placeholder = input<string>('');
  public onDebouce = output<string>();

  ngOnInit(): void {

    this.debouncer$ = this.debouncer
      .pipe(
        debounceTime(500)
      ).subscribe( value => {
        this.onDebouce.emit(value)
      });
  }

  ngOnDestroy(): void {
    this.debouncer$?.unsubscribe();
  }

  onInput( value: string ) {
    this.debouncer.next( value );
  }

}
