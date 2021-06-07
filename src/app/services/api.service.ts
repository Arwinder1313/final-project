import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, HttpModule, RequestOptions, Headers } from "@angular/http";
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public appUrl :any= environment.baseUrl;
  constructor(public http:Http) { }
  
  public get(url:any, params:any): Observable<any>  {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({
      headers: headers,
      params: params
    });
    return this.http.get(this.appUrl + url, options).pipe(map(res => res.json()));
  }

  public post(url:string, params:any) : Observable<any>{
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.appUrl + url, JSON.stringify(params), options)
      .pipe(map(res => res.json()));
  }

}
