import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class BaseProviderService {
    public headers = new HttpHeaders();
    public httpOptions = { headers: this.headers };
    public http: HttpClient;
    public error: Error;
    public status: number;
    constructor(http: HttpClient ) {
        this.http = http as HttpClient;
        this.httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    getHeaders() {
        // getting common headers for the REST call
        this.addHeader('Content-Type', 'application/json');
        return this.httpOptions;
    }
    addHeader(key: string, value: string) {
        // Add a particular Header for the REST call
        return new HttpHeaders().set(key, value);
    }

    getJSONfromModel(requestModel) {
        // Converts an TO into string
        if (requestModel && requestModel instanceof HttpParams) {
            requestModel = requestModel;
          } else {
            requestModel = requestModel;
          }
        return requestModel;
    }
    getHttpHeaders(): HttpHeaders {
        return this.httpOptions.headers;
    }

    /*
     Function for POST call
     Parameters:
     resourceURL: The resource on which POST call has to be made.
     requestModel: The Request model to be sent along with the call.
     Return Type: : Observable<{} | HttpResponse<Object>>
     */
    makePostCall(resourceURL: string, requestModel: any): Observable<{} | HttpResponse<any>> {
        return this.http.post(resourceURL, this.getJSONfromModel(requestModel), { headers: this.getHttpHeaders() }).pipe(map(response => response), catchError(this.handleError));
      }

    /*
    Function for GET call
    Parameters:
    resourceURL: The resource on which POST call has to be made.
    Return Type: : Observable<{} | HttpResponse<Object>>
    */
    makeGetCall(resourceURL: string, params?: URLSearchParams): Observable<{} | HttpResponse<any>> {
        return this.http.get(resourceURL, { headers: this.getHttpHeaders(), observe: 'body' }).pipe(retry(0), map(response => response), catchError(this.handleError));
    }
    /*
    Function for DELETE call
    Parameters:
    resourceURL: The resource on which DELETE call has to be made.
    Return Type: : Observable<{} | HttpResponse<Object>>
    */
    makeDeleteCall(resourceURL: string): Observable<{} | HttpResponse<any>> {
        return this.http.delete(resourceURL, { headers: this.getHttpHeaders(), observe: 'body' }).pipe(retry(0), map(response => response), catchError(this.handleError));
    }
    /*
  Function for PATCH call
  Parameters:
  resourceURL: The resource on which PATCH call has to be made.
  requestModel: The Request model to be sent along with the call.

  Return Type: Observable<T>
  */
    makePatchCall(resourceURL: string, requestModel: any) {
        return this.http.patch(resourceURL, this.getJSONfromModel(requestModel), { headers: this.getHttpHeaders() }).pipe(map(response => response), catchError(this.handleError));
    }

    /*
    Function for Upload file call
    Parameters:
    resourceURL: The resource on which PATCH call has to be made.
    requestModel: The Request model to be sent along with the call.

      Return Type: Observable<T>
    */
    makePutCall(resourceURL: string, requestModel: any) {
        return this.http.put(resourceURL, this.getJSONfromModel(requestModel), { headers: this.getHttpHeaders() }).pipe(map(response => response), catchError(this.handleError));
    }
    /*
    Function for PATCH call
    Parameters:
    resourceURL: The resource on which PATCH call has to be made.
    requestModel: The Request model to be sent along with the call.
    Return Type: Observable<T>
    */
    makeUploadCall(resourceURL: string, requestModel: FormData): Observable<{} | HttpResponse<any>> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ Authorization: sessionStorage.getItem('token') }),
        };
        return this.http.post(resourceURL, requestModel, { reportProgress: true, observe: 'events', headers: HttpUploadOptions.headers }).pipe(map(response => response), catchError(this.handleError));
    }
    /*
    Function for GET File call
    Parameters:
    resourceURL: The resource on which GET FILE call has to be made.
    requestModel: The Request model to be sent along with the call.
    Return Type: Observable<T>
    */
    makeGetFile(resourceURL: string, resType: any): Observable<{} | HttpResponse<any>> {
    return this.http.get(resourceURL, {responseType : resType}).pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse): Observable<Error> {
        if (error.status === 500 || error.status === 503) {
          let message = 'Oppsss... Internal Server Error!';
          if (error.error && error.error.error && error.error.error.message) { message = error.error.error.message; }
          Swal.fire(message, 'Something went wrong. Please try again!', 'error');
          return throwError(error.error as HttpEvent<any>);
        } else {
          if (error.error instanceof ErrorEvent) {
            return throwError(error.error);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.error(`Backend returned code ${error.status}`);
            throw(error.error);
          }
        }
      }
}
