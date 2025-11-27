import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../header';
import { Overview2 } from '../../a-event';

@Component({
    selector: 'app-root',
    templateUrl: './root.html',
    styleUrl: './root.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Header, Overview2],
})
export class Root {}
