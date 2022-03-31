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

    // const rating2 = (debugElement.query(By.css('[data-testid="2"]')));
    const rating2 = debugEltByTestId(fixture, "2");

    const nativeElt = rating2.nativeElement as HTMLElement

    console.log("before click", nativeElt.classList)

    clickDebugElt(rating2);

    console.log("after click but no change detection", nativeElt.classList)

    fixture.detectChanges();

    console.log("after click after change detection", nativeElt.classList)
    
    expect(nativeElt.classList.contains("selected")).toBeTrue();

  })
});
