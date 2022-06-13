import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";
import { catchError, tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})

/** Class */
export class ProductService {

    private productUrl = "api/products/products.json";

    /** Constructor */
    constructor(private http: HttpClient) {} 

    /** Method */
    getProducts(): Observable <IProduct[]> {
        // Get request 
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log("All", JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    
    /** Method */
    private handleError(err: HttpErrorResponse) {

        let errorMessage = "";

        if (err.error instanceof ErrorEvent) {
            // A client-slide or network error may occur. Handle it accordinaly
            errorMessage = `An error occured:  ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }

        console.log(errorMessage);
        return throwError(errorMessage); // what is being returned?? 



    }

}