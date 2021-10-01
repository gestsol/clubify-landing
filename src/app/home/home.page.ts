import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor() {
  }

  ngOnInit(){

  }

  logScrolling(event){
    
    let mybutton = document.getElementById("btn-scroll");

    if (event.detail.scrollTop > 500) mybutton.style.display = "block";
    else mybutton.style.display = "none";
    
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }




}
