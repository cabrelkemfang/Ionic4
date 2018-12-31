import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:1337/localhost:8080/customer";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getCustomer(): Observable<any> {
    return this.http.get(apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getCustomeryById(id:String): Observable<any> {
    return this.http.get(apiUrl+"/"+id).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  createCustomer(customer): Observable<any> {
    return this.http.post(apiUrl,customer,httpOptions).pipe(
      catchError(this.handleError));
  }

  deleteCustomer(id) {
    return this.http.delete(apiUrl+"/"+id).pipe(
      catchError(this.handleError));
  } 
}
