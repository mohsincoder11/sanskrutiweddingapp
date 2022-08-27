import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
})
export class StepsPage implements OnInit {
  slideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 500,
  };
  constructor() { }
  slidesDidLoad(slides: IonSlides): void {
  //  slides.startAutoplay();
  }
  ngOnInit() {
  }

}
