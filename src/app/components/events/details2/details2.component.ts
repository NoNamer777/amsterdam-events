import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AEvent, AEventStatus } from '../../../models/a-event.model';

@Component({
    selector: 'app-details2',
    templateUrl: './details2.component.html',
    styleUrls: ['./details2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Details2Component {
    @Input() selectedEvent: AEvent;
    @Output() changedEvent = new EventEmitter<AEvent>();
    @Output() deleteEvent = new EventEmitter<number>();

    readonly statuses = Object.values(AEventStatus);

    onSaveEvent(): void {
        this.changedEvent.emit(this.selectedEvent);
    }

    onDeleteEvent(): void {
        this.deleteEvent.emit(this.selectedEvent.id);
    }
}
