import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrAllAnimals: Animal[] = [];
  arrShuffleAnimals: Animal[] = [];
  arrHomeAnimals: Animal[] = [];


  constructor(
    private animalsService: AnimalsService
  ) { }


  async ngOnInit(): Promise<void> {

    // Obtenemos Array de todos los animales
    this.arrAllAnimals = await this.animalsService.getAllActives();

    // Desordenamos posición de la array anterior
    this.arrShuffleAnimals = this.shuffle(this.arrAllAnimals)

    // Obtenemos nueva array de las 4 primeras posiciones del array anterior desordenado
    this.arrHomeAnimals = this.arrShuffleAnimals.splice(0, 4);

  }

  // Método para randomizar array animales
  shuffle(array: any[]): any[] {
    let newArray = [...array]
    let length = newArray.length

    for (let i = 0; i < length; i++) {
      let randomPosition = Math.floor((newArray.length - i) * Math.random())
      let randomItem = newArray.splice(randomPosition, 1)

      newArray.push(...randomItem)
    }

    return newArray

  }

}
