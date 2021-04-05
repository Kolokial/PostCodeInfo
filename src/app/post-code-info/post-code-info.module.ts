import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { PostCodeInfoComponent } from "./post-code-info.component";
import { PostCodeInfoService } from "./post-code-info.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [PostCodeInfoService],
  declarations: [PostCodeInfoComponent],
  exports: [PostCodeInfoComponent]
})
export class PostCodeInfoModule {}
