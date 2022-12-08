import { Component, OnInit, Input } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal.interface';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent implements OnInit {

  baseUrl: string = "http://localhost:3000/images/"

  @Input() myAnimal!: Animal | any;

  constructor() { }

  ngOnInit(): void {
  }

}
