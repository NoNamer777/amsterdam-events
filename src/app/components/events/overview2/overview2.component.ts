import { Component } from '@angular/core';

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.scss'],
})
export class Overview2Component {
  // Todo - Create a class attribute for the selected event. By default this should be `null`, and its type should be `AEvent`.
  //  Think about access modifiers (none is public by default, private is only in this class (not even its own template),
  //  protected same as private only difference is that extending classes do still have access to that property.

  // Todo - Duplicate all the necessary logic for creating the random events from overview1.component.ts and the events attribute.
  //  Don't worry about duplication for now, we'll solve this once we're getting to know about services.

  constructor() {}

  /**
   * Selects an event.
   * @param event The event that is selected.
   */
  onSelectEvent(event: AEvent): void {
    // Don't continue when the same event is already selected.

    // Keep track of the selected event.
  }

  /**
   * Checks whether any event has been selected, or whether the event
   * that has been passed through to the function has been selected.
   */
  isEventSelected(event: AEvent = null): boolean {
    // When event is `null` check whether any event has been selected.

    // Otherwise, check if event is the same as the selected event.
    return false;
  }
}
