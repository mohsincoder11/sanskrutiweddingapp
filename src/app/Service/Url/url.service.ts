import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

   //online
   baseUrl = 'https://sanskritiweddings.com/'
  serverUrl = 'https://sanskritiweddings.com/api/'
  imageurl = 'https://sanskritiweddings.com/storage/'


  //local
  // baseUrl = 'http://127.0.0.1:8000/'
  // serverUrl = 'http://127.0.0.1:8000/api/'
  // imageurl = 'http://127.0.0.1:8000/storage/'

  constructor() { }
}
