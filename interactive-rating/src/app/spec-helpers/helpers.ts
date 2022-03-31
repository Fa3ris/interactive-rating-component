import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function debugEltByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
): DebugElement {

    return fixture.debugElement.query(By.css(`[data-testid='${testId}']`));
}


export function clickDebugElt<T>(element: DebugElement) {

    const event = makeClickEvent(element.nativeElement);

    // WARNING: event does not bubble
    element.triggerEventHandler('click', event);
}

function makeClickEvent(
    target: EventTarget
  ): Partial<MouseEvent> {

    return {
        preventDefault(): void {},
        stopPropagation(): void {},
        stopImmediatePropagation(): void {},
        type: 'click',
        target,
        currentTarget: target,
        bubbles: true,
        cancelable: true,
        button: 0
    };
}