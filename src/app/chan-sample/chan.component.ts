import { Component, OnInit } from '@angular/core';
import { SolarAllocationListService } from './solar-allocation-list.service';
import { SolarHeater } from '../shared/SolarHeater';

@Component({
  selector: 'app-solar-allocation-list',
  templateUrl: './solar-allocation-list.component.html',
  styleUrls: ['./solar-allocation-list.component.css']
})
export class SolarAllocationListComponent implements OnInit {

  solarHeaterIds: number[] = [];
  selectedSolar: SolarHeater;
  selectedId;
  errorMessage;

  constructor(private solarService: SolarAllocationListService) { }

  ngOnInit() {
    this.getAllId();
  }

  displaySelected() {
    this.solarService.getSolarHeaterbyId(this.selectedId).subscribe(
      data => this.selectedSolar = data,
      err => this.errorMessage = err.error.message
    )
  }

  getAllId() {
    this.solarService.getAllocations()
    .subscribe(
      data => {
        this.solarHeaterIds = data;
      },
      err => this.errorMessage = err.error.message
    );
  }



}
