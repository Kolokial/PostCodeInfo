import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostCodeInfoModule } from "./post-code-info/post-code-info.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PostCodeInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
