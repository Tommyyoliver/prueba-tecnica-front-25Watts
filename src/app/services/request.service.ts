import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private http = inject(HttpClient);

  getRequest(source:string): Observable<any> {
    return this.http.get(source);
  }

  postRequest(source:string, body:any): Observable<any> {
    return this.http.post(source, body);
  }

  putRequest(source:string, body:any): Observable<any> {
    return this.http.put(source, body);
  }

  deleteRequest(source:string, body?:any): Observable<any> {
    return this.http.delete(source);
  }

}
