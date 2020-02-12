import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule } from '@angular/forms';
import { ViewDetailsService } from "./view-details.service";
import { FlightBooking } from '../shared/FlightBooking';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
  providers: [ViewDetailsService]
})
export class ViewDetailsComponent implements OnInit {

  flights: FlightBooking[]=[];
  errorMessage: String;
  successMessage: String;

  constructor(private viewDetailsService: ViewDetailsService) {

   }

  ngOnInit() {
    this.view();
}

  view() {
    this.viewDetailsService.view()
    .subscribe((data:any)=>{this.flights=data;},
    (err)=>{this.errorMessage="Unable to populate items";});
  }

  delete(id) {
    this.viewDetailsService.delete(id)
    .subscribe((data)=>{this.successMessage=data["message"];},
    (err)=>{this.errorMessage="Not able to delete item.";});
  }

}

