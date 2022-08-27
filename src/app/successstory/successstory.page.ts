import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-successstory',
  templateUrl: './successstory.page.html',
  styleUrls: ['./successstory.page.scss'],
})
export class SuccessstoryPage implements OnInit {
  slideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 500,
  };
  story_id;
  success_story = [
    { title: 'Mohit Kumar weds Mitali Sharma.', image: 'assets/s11.jpg', description: ' We first communicated on Sanskritiweddings in Jan, and exchanged our numbers. Initially, the conversations were a bit slow for a few days but it took up the pace after our 1st phone call. I found him to be a bit shy,sensible, sweet with a huge heart.    Besides, we both love pets! Eventually, we fell in love and he came for our first meeting all the way from his city to mine within just 15 days of talking. We both committed to each other before even meeting so it was such a memorable day for us. The love was in the air and we then shared everything with our respective families. All went well and now we will be getting married by the end of 2022. We did found love and a connection that we never felt before. To me, it iss definitely  a "match made in heaven"! Thanks to Sanskriti Wedding.' },
    { title: 'Prashant Pawar weds Rutuja Kalkhaire.', image: 'assets/s13.jpg', description: 'We first communicated on Sanskritiweddings in Jan, and exchanged our numbers. Initially, the conversations were a bit slow for a few days but it took up the pace after our 1st phone call. I found him to be a bit shy,sensible, sweet with a huge heart.    Besides, we both love pets! Eventually, we fell in love and he came for our first meeting all the way from his city to mine within just 15 days of talking. We both committed to each other before even meeting so it was such a memorable day for us. The love was in the air and we then shared everything with our respective families. All went well and now we will be getting married by the end of 2022. We did found love and a connection that we never felt before. To me, it iss definitely  a "match made in heaven"! Thanks to Sanskriti Wedding.' },
    { title: 'Aditya Kale weds Sneha Mahhale.', image: 'assets/s15.jpg', description: 'We first communicated on Sanskritiweddings in Jan, and exchanged our numbers. Initially, the conversations were a bit slow for a few days but it took up the pace after our 1st phone call. I found him to be a bit shy,sensible, sweet with a huge heart.    Besides, we both love pets! Eventually, we fell in love and he came for our first meeting all the way from his city to mine within just 15 days of talking. We both committed to each other before even meeting so it was such a memorable day for us. The love was in the air and we then shared everything with our respective families. All went well and now we will be getting married by the end of 2022. We did found love and a connection that we never felt before. To me, it iss definitely  a "match made in heaven"! Thanks to Sanskriti Wedding.' },];

  image;
  title;
  description;


  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.story_id = this.route.snapshot.paramMap.get('story_id');
    console.log(this.story_id)
    this.image = this.success_story[this.story_id].image;
    this.title = this.success_story[this.story_id].title;
    this.description = this.success_story[this.story_id].description;
  }

}
