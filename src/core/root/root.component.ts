import { Overview2Component } from '@/a-event';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    imports: [HeaderComponent, Overview2Component],
})
export class RootComponent {}
