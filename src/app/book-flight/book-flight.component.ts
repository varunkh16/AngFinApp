import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BookFlightService } from "./book-flight.service";
import { Flight } from './book-flight.model';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
  providers: [BookFlightService]
})
export class BookFlightComponent implements OnInit {

  errorMessage: String;
  successMessage: String;
  data: Flight;

  constructor(private fb: FormBuilder, private bookFlightService: BookFlightService) { }

  bookingForm = this.fb.group({
    passengerName: ['', [Validators.required]],
    noOfTickets: ['', [Validators.required, Validators.min(1)]],
    flightId: ['', [Validators.required, Validators.minLength(7), validateFlight]]
  });

  ngOnInit() {}



  book() {
    // Code the method here
    this.data = {
      passengerName: this.bookingForm.value.passengerName,
      noOfTickets: this.bookingForm.value.noOfTickets,
      flightId: this.bookingForm.value.flightId
    };

    this.bookFlightService.getData(this.data)
    .subscribe(data=>{this.successMessage=data["message"];},
    err=>{this.errorMessage="Requested number of seats unavailable";});
  }

}

function validateFlight(c: FormControl) {
 /*
    Code the validator here
    Use flightError as the property
*/
  if(c.value.search('-')==3) {
    var strArr = c.value.split("-");
    if(/^[a-zA-Z]+$/.test(strArr[0]) && strArr[0].length==3 && /^\d+$/.test(strArr[1]) && strArr[1].length==3){
      return null;
    } else {
      return {validFlightNumber: true};
    }
  }else {
    return {validFlightNumber: true};
  }
}


