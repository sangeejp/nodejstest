import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";


import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "quote";
@Injectable({ providedIn: "root" })
export class QuoteService {

  constructor(private http: HttpClient, private router: Router) {}

  getQuoteById(quoteId) {
   const queryParams=`?quoteId=${quoteId}`;
    return this.http
      .get<{ message: string; result: any; maxQuotes: number, status:number }>(
        BACKEND_URL+queryParams
      );
      
     
      
  }
 
 

 
  createQuote( 
    quoteNumber, quoteDate, customerName, salesPerson, quoteStatus, quoteInfo, quoteSummary) {
      let Data: any;
   
      Data = {
        quoteNumber: quoteNumber,
        quoteDate: quoteDate,
        customerName: customerName,
        salesPerson: salesPerson,
        quoteStatus: quoteStatus,
        status: status,
        quoteInfo: quoteInfo,
        quoteSummary: quoteSummary
      };
    

      return this.http
      .post<{ message: string; status: number }>(
        BACKEND_URL,
        Data
      );
  }

  updateQuote(
     
    quoteNumber, quoteDate, customerName, salesPerson, quoteStatus, quoteInfo, quoteSummary, quoteId) {
        let Data: any;
     
        Data = {
          quoteNumber: quoteNumber,
          quoteDate: quoteDate,
          customerName: customerName,
          salesPerson: salesPerson,
          quoteStatus: quoteStatus,
          status: status,
          quoteInfo: quoteInfo,
          quoteSummary: quoteSummary,
           quoteId:quoteId
        };
      
  
        return this.http
        .put<{ message: string; status: number }>(
          BACKEND_URL,
          Data
        );
  }

 
}
