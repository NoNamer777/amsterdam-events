import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Overview1Component } from './components/events/overview1/overview1.component';
import { Overview2Component } from './components/events/overview2/overview2.component';
import { HeaderComponent } from './components/main/header/header.component';
import { HomeComponent } from './components/main/home/home.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, HeaderComponent, Overview1Component, Overview2Component],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
