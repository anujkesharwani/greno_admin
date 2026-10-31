import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import {
  animationFrameScheduler,
  BehaviorSubject,
  combineLatest,
  switchMap,
  map,
  interval,
  takeWhile,
  endWith,
  distinctUntilChanged,
  takeUntil,
  Subject,
} from 'rxjs';
import { Destroy } from './destroy';
import { CurrencyPipe, DecimalPipe } from '@angular/common';


/**
 * Quadratic Ease-Out Function: f(x) = x * (2 - x)
 */
const easeOutQuad = (x: number): number => x * (2 - x);

@Directive({
  selector: '[countUp]',
  providers: [Destroy],
})
export class CountUpDirective implements OnInit {
  private readonly count$ = new BehaviorSubject(0);
  private readonly duration$ = new BehaviorSubject(2000);
  private type$:'currency'|'number'|undefined;

  private readonly currentCount$ = combineLatest([
    this.count$,
    this.duration$,
  ]).pipe(
    switchMap(([count, duration]) => {
      // get the time when animation is triggered
      const startTime = animationFrameScheduler.now();

      return interval(0, animationFrameScheduler).pipe(
        // calculate elapsed time
        map(() => animationFrameScheduler.now() - startTime),
        // calculate progress
        map((elapsedTime) => elapsedTime / duration),
        // complete when progress is greater than 1
        takeWhile((progress) => progress <= 1),
        // apply quadratic ease-out
        // for faster start and slower end of counting
        map(easeOutQuad),
        // calculate current count
        map((progress) => Math.round(progress * count)),
        // make sure that last emitted value is count
        endWith(count),
        distinctUntilChanged()
      );
    })
  );

  @Input('countUp')
  set count(count: number) {
    this.count$.next(count);
  }

  @Input()
  set duration(duration: number) {
    this.duration$.next(duration);
  }

  @Input()
  set type(type: 'currency'|'number'|undefined) {
    this.type$ = type;
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly destroy$: Destroy,
    private currencyPipe: CurrencyPipe,
    private numberPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.displayCurrentCount();
  }

  private displayCurrentCount(): void {
    
    this.currentCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentCount) => {
        let modifiedCount:any = currentCount;
        if(this.type$ == 'currency'){
          modifiedCount = this.currencyPipe.transform(currentCount,'INR');
        } else if(this.type$ == 'number'){
          modifiedCount = this.numberPipe.transform(currentCount);
        } else {
          modifiedCount = currentCount;
        }
        this.renderer.setProperty(
          this.elementRef.nativeElement,
          'innerText',
          modifiedCount
        );
      });
  }
}
