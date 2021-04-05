import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime, flatMap, map, mergeMap, startWith } from "rxjs/operators";
import { PostCodeInfoService } from "./post-code-info.service";

@Component({
  selector: "app-post-code-info",
  templateUrl: "./post-code-info.component.html",
  styleUrls: ["./post-code-info.component.scss"]
})
export class PostCodeInfoComponent {
  errorMessage: string = "";
  postCodeInfo: any;
  doesPostCodeExist: Observable<boolean>;
  readonly regex = new RegExp(/^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i);
  private debounce = new Subject<string>()

  constructor(private service: PostCodeInfoService) {
    this.doesPostCodeExist = this.setupDebounceValidationHandler();
  }

  ngOnInit(){
  }

  validatePostCodeAgainstRegEx(rawPostCode: string) {
    if(rawPostCode.match(this.regex)){
      this.debounce.next(rawPostCode)
    }
  }

  getPostCodeInfo(postCode: string) {
    this.errorMessage = "";
    this.postCodeInfo = {};
    this.service.getPostCodeInfo(postCode).subscribe({
      next: (x) => {
      this.postCodeInfo = x.result;
    }, error: (response: HttpErrorResponse) => {
      console.log(response);
      this.errorMessage = response.error.error;
    }});
  }

  private setupDebounceValidationHandler(): Observable<boolean> {
    return this.debounce.pipe(debounceTime(1000)).pipe(mergeMap((regexValidPostCode) =>{
      return this.service.validatePostCode(regexValidPostCode)
    }), map(response => {
      console.log(response);
      return response.result;
    }), startWith(false))
  }
}
