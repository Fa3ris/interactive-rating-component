import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { clickDebugElt, debugEltByTestId } from '../spec-helpers/helpers';

import { RatingCardComponent } from './rating-card.component';

describe('RatingCardComponent', () => {
  let component: RatingCardComponent;
  let fixture: ComponentFixture<RatingCardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCardComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement
    fixture.detectChanges(); // trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();

   
  });

  it('selects the clicked rating', () => {

    const rating2 = debugEltByTestId(fixture, "rating-2");

    const nativeElt = rating2.nativeElement as HTMLElement

    console.log("before click", nativeElt.classList)

    clickDebugElt(rating2);

    console.log("after click but no change detection", nativeElt.classList)

    fixture.detectChanges();

    console.log("after click after change detection", nativeElt.classList)
    
    expect(nativeElt.classList.contains("selected")).toBeTrue();
    assertRatingIs(2)

  })

  it('has no rating at first', () => {
    assertRatingIs(undefined)
  })

  it('switches selected rating', () => {

    // click on 2 then on 5
    const rating2 = debugEltByTestId(fixture, "rating-2");
    clickDebugElt(rating2);

    fixture.detectChanges();
    const nativeElt = rating2.nativeElement as HTMLElement
    expect(nativeElt.classList.contains("selected")).toBeTrue();
    assertRatingIs(2)


    const rating5 = debugEltByTestId(fixture, "rating-5");
    clickDebugElt(rating5);

    fixture.detectChanges();

    expect(nativeElt.classList.contains("selected")).toBeFalse();

    const nativeElt5 = rating5.nativeElement as HTMLElement
    expect(nativeElt5.classList.contains("selected")).toBeTrue();
    assertRatingIs(5)
  })

  it('does not submit rating if no rating selected', () => {

    const btn = debugEltByTestId(fixture, "submit-rating");
    clickDebugElt(btn);
    fixture.detectChanges()

    assertRatingIs(undefined)

    const ratingConfirmation = debugEltByTestId(fixture, "rating-confirmation");
    expect(ratingConfirmation).toBeNull()
  })

  it('submits rating', () => {

    const rating2 = debugEltByTestId(fixture, "rating-2");
    clickDebugElt(rating2);

    const btn = debugEltByTestId(fixture, "submit-rating");
    clickDebugElt(btn);
    fixture.detectChanges()

    assertRatingIs(2)
    expect(fixture.componentInstance.step).toBe(2)

    const ratingConfirmation = debugEltByTestId(fixture, "rating-confirmation");
    expect(ratingConfirmation.nativeElement.textContent).toContain("2 out of 5")
  })


  function assertRatingIs(val: number|undefined) {
    expect(fixture.componentInstance.value).toBe(val, "rating must be " + val)
  }
});


