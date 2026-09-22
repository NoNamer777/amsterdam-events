import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AEventStatuses } from '../a-event-status.model';
import { AEvent } from '../a-event.model';

@Component({
    selector: 'app-details2',
    templateUrl: './details2.component.html',
    imports: [FormsModule],
})
export class Details2Component {
    @Input() public selectedEvent!: AEvent;
    @Output() public readonly eventSaved = new EventEmitter<AEvent>();
    @Output() public readonly eventRemoved = new EventEmitter<number>();

    protected readonly statuses = Object.values(AEventStatuses);

    protected onSave() {
        this.eventSaved.emit(this.selectedEvent);
    }

    protected onRemove() {
        this.eventRemoved.emit(this.selectedEvent.id);
    }
}
