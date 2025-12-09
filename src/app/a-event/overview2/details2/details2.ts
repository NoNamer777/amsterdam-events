import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AEvent } from '../../a-event.model';
import { AEventStatuses } from '../../a-event-status.model';

@Component({
    selector: 'app-details2',
    templateUrl: './details2.html',
    styleUrl: './details2.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule],
})
export class Details2 {
    @Input() public selectedEvent: AEvent;
    @Output() public readonly eventSaved = new EventEmitter<AEvent>();
    @Output() public readonly eventRemoved = new EventEmitter<number>();

    protected readonly statuses = Object.values(AEventStatuses);

    protected onSave(): void {
        this.eventSaved.emit(this.selectedEvent);
    }

    protected onRemove(): void {
        this.eventRemoved.emit(this.selectedEvent.id);
    }
}
