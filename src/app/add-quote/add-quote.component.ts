import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { QuoteService } from "./add-quote.service";
import Swal from 'sweetalert2';
declare var $:any
@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  form: FormGroup;
  quoteId='0';
  quotes=[];
  constructor(public quoteService:QuoteService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.quoteId=paramMap.get("id");
this.quoteService.getQuoteById(this.quoteId).subscribe(Data=>{
this.quotes=Data.result;
});
      }
    });
    this.form = new FormGroup({
      quoteDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      quoteNumber: new FormControl(null, {
        validators: [Validators.required]
      }),
      customerName: new FormControl(null, {
        validators: [Validators.required]
      }),
      salesPerson: new FormControl(null, {
        validators: [Validators.required]
      }),
      quoteStatus: new FormControl(null, {
        validators: [Validators.required]
      }),
      quoteInfo: new FormArray([
        new FormGroup({
          partNo: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          qty: new FormControl('', Validators.required),
          cost: new FormControl('', Validators.required),
          gst: new FormControl('', Validators.required),
          total: new FormControl('', Validators.required),
        }),
      ]),
      quoteSummary: new FormArray([
        new FormGroup({
          totalPart: new FormControl('', Validators.required),
          gst: new FormControl('', Validators.required),
          totalTax: new FormControl('', Validators.required),
        
        }),
      ]),
    });
  }
  onSave(){
    if(this.quoteId=='0'){
      this.quoteService.createQuote(
        this.form.value.quoteDate,
        this.form.value.quoteNumber,
        this.form.value.customerName,
        this.form.value.salesPerson,
        this.form.value.quoteStatus,
        this.quoteInfo.value.toString(),
        this.quoteSummary.value.toString()
        ).subscribe(Data=>{
        if(Data.status==1){
          Swal.fire({
            icon: 'success',
            title: Data.message,
            allowOutsideClick:false,
           
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: Data.message,
            allowOutsideClick:false,
           
          });
        }
        },
        (error)=>{
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            allowOutsideClick:false,
           
          });
        });
    }
    else{
      this.quoteService.updateQuote(
        this.form.value.quoteDate,
        this.form.value.quoteNumber,
        this.form.value.customerName,
        this.form.value.salesPerson,
        this.form.value.quoteStatus,
        this.quoteInfo.value.toString(),
        this.quoteSummary.value.toString(),
        this.quoteId
        ).subscribe(Data=>{
          if(Data.status==1){
            Swal.fire({
              icon: 'success',
              title: Data.message,
              allowOutsideClick:false,
             
            });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: Data.message,
              allowOutsideClick:false,
             
            });
          }
        },
        (error)=>{
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            allowOutsideClick:false,
           
          });
        });
    }

  }
  get quoteSummary(): FormArray {
    return this.form.get('quoteSummary') as FormArray;
  }
  get quoteInfo(): FormArray {
    return this.form.get('quoteInfo') as FormArray;
  }
  addNameField() {
    
    this.quoteInfo.push(new FormGroup({
      partNo: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      gst: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
    }));
  
  }
  addNameField2(partno, description, qty, cost, gst, total) {
    
    this.quoteInfo.push(new FormGroup({
      partNo: new FormControl(partno, Validators.required),
      description: new FormControl(description, Validators.required),
      qty: new FormControl(qty, Validators.required),
      cost: new FormControl(cost, Validators.required),
      gst: new FormControl(gst, Validators.required),
      total: new FormControl(total, Validators.required),
    }));
  
  }

  deleteNameField(index: number) {
    if (this.quoteInfo.length !== 1) {
      this.quoteInfo.removeAt(index);
    }
    console.log(this.quoteInfo.length);
  }
  addSummaryField() {
    
    this.quoteSummary.push(new FormGroup({
      totalPart: new FormControl('', Validators.required),
      gst: new FormControl('', Validators.required),
      totalTax: new FormControl('', Validators.required),
    
    }));
  
  }
  addSummaryField2(totalPart, gst, totalTax) {
    
    this.quoteSummary.push(new FormGroup({
      totalPart: new FormControl(totalPart, Validators.required),
      gst: new FormControl(gst, Validators.required),
      totalTax: new FormControl(totalTax, Validators.required)
    }));
  
  }

  deleteSummaryField(index: number) {
    if (this.quoteSummary.length !== 1) {
      this.quoteSummary.removeAt(index);
    }
    console.log(this.quoteSummary.length);
  }
}
