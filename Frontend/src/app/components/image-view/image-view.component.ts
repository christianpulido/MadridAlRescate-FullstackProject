import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/interfaces/animal.interface';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  animal!: Animal;
  routeImage!: string;
  body: any;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.routeImage = "http://localhost:3000/images/" + params['imageName'];
    });

    this.body = document.querySelector('body');
    this.body.setAttribute('style', 'overflow: hidden');
  }

  closeImage(): void {
    this.body.removeAttribute('style');
    this.location.back();
  }

}
