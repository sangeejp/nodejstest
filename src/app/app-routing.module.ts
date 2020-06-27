import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuoteComponent } from './add-quote/add-quote.component';
const routes: Routes = [
  {path: '', component: AddQuoteComponent , pathMatch: 'full'},
  {path: 'editQuote/:id', component: AddQuoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
