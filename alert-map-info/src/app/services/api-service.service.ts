import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  getFakeNormative() {
    throw new Error('Method not implemented.');
  }
  private cache: Map<string , Observable <any>| undefined > = new Map();

  constructor(private http: HttpClient) { }

  get(url: string, params?: HttpParams): Observable<any> {
    const completedUrl = environment.apiUrl + url;
  
    if (this.cache.has(completedUrl)) {
      const cached = this.cache.get(completedUrl);
      
      if (cached !== undefined) {
        return cached;
      } 
    }
    
    const request = this.http.get(completedUrl, { params }).pipe(
      tap(() => console.log('Recupero dati dalle API')),
      shareReplay(1) // Cache the response
    );
  
    this.cache.set(completedUrl, request);
    return request;
  }

  post(url: string, obj: any): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    let objOptions: any = {}
    return this.http.post(completedUrl, obj);
  }

  patch(url: string, obj: any): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.patch(completedUrl, obj);
  }

  put(url: string, obj: any, h?:any): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.put(completedUrl, obj,h);
  }

  delete(url: string): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.delete(completedUrl, {});
  }

  getFakeData(): Observable<any> {
    let obj =  this.http.get('../assets/data.json');
    return obj
  }
}
