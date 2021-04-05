import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable()
export class PostCodeInfoService {
  private url: string = "https://api.postcodes.io/postcodes/";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  public getPostCodeInfo(postCode: string): Observable<any> {
    return this.http.get(`${this.url}${postCode}`, this.httpOptions);
  }

  public validatePostCode(postCode: string): Observable<any>{
    return this.http.get(`${this.url}${postCode}/validate`, this.httpOptions).pipe(
      
    );
  }
}
