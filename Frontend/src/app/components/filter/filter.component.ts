import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() typeSelectorEmitted: EventEmitter<string>
  @Output() genderSelectorEmitted: EventEmitter<string>
  @Output() sizeSelectorEmitted: EventEmitter<string>
  arrAnimals: Animal[] = [];
  tempAnimalArr: Animal[] = [];

  constructor(
    private animalsService: AnimalsService
  ) {
    this.typeSelectorEmitted = new EventEmitter();
    this.genderSelectorEmitted = new EventEmitter();
    this.sizeSelectorEmitted = new EventEmitter();
  }

  ngOnInit(): void { }

  typeSelector($event: any) {
    this.typeSelectorEmitted.emit($event.target.value)
  }

  genderSelector($event: any) {
    this.genderSelectorEmitted.emit($event.target.value)
  }

  sizeSelector($event: any) {
    this.sizeSelectorEmitted.emit($event.target.value)
  }
}

