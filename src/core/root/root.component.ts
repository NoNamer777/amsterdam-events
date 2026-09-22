import { Overview2Component } from '@/a-event';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderComponent, Overview2Component],
})
export class RootComponent {}
