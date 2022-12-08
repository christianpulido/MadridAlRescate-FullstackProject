import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animal-images',
  templateUrl: './animal-images.component.html',
  styleUrls: ['./animal-images.component.css']
})
export class AnimalImagesComponent implements OnInit {

  image1: any;
  image2: any;
  image3: any;
  image4: any;

  imagesAnimal: FormGroup;

  constructor(
    private animalsService: AnimalsService
  ) { 
    this.imagesAnimal = new FormGroup({
      image1: new FormControl(),
      image2: new FormControl(),
      image3: new FormControl(),
      image4: new FormControl()
    })

  }

  ngOnInit(): void {
  }

  fileChoosen1(event: any): void {
    this.image1 = <File>event.target.files[0];
  }

  fileChoosen2(event: any): void {
    this.image2 = <File>event.target.files[0];
  }
  
  fileChoosen3(event: any): void {
    this.image3 = <File>event.target.files[0];
  }
  
  fileChoosen4(event: any): void {
    this.image4 = <File>event.target.files[0];
  }

  async onSubmit(): Promise<void> {
    let fd = new FormData();

    fd.append('Image1', this.image1, this.image1.name);
    fd.append('Image2', this.image2, this.image2.name);
    fd.append('Image3', this.image3, this.image3.name);
    fd.append('Image4', this.image4, this.image4.name);

    let response = await this.animalsService.uploadImage(fd);

    console.log(response)
  }

}
