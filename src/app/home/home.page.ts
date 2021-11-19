import { Component, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ClubifyService } from '../services/clubify.service';
import { AlertController } from '@ionic/angular';

declare var $:any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  formGroup: FormGroup;
  private scrollDepthTriggered = false;
  constructor(private _formBuilder: FormBuilder,public loadingController: LoadingController,public clubifyService:ClubifyService,public alertController: AlertController) {
  }

  public loading:any;
  ngOnInit(){

    this.formGroup = new FormGroup({
      first_name:new FormControl( '', Validators.required),
      last_name:new FormControl( '', Validators.required),
      email:new FormControl('', [Validators.required,Validators.email]),
      phone:new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      prefix:new FormControl( '', Validators.required),
      /* password: new FormControl('', [Validators.required,Validators.minLength(8)]), */
    });

   
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Enviando...',
      mode:'md',
      /* duration:4000 */
    });

    this.loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Clubify',
      message: 'Gracias por contactarnos!',
      buttons: [
         {
          text: 'Ok',
          handler: () => {
            /* console.log('Confirm Okay'); */
            this.loading.dismiss()
          }
        }
      ]
    });

    await alert.present();
  }

  setPrefix(event){

    /* console.log(event.target.value); */
    const number = event.target.value.replace('+','')
    event.target.value = `+${number}`
  }

  async sendMessage(){
    console.log(this.formGroup.value);
    await this.presentLoading()

    try {
      
      await this.clubifyService.sendMail(this.formGroup.value).toPromise().then((resp)=>{
        console.log(resp)
        this.presentAlert()
        this.loading.dismiss()
      })
  
      /* await this.clubifyService.sendWhatsapp(this.formGroup.value).toPromise().then((resp)=>{
        console.log(resp);
        this.presentAlert()
        this.loading.dismiss()
      }) */
      


    } catch (error) {
      alert('Ha sucedido un error enviando correo o mensaje')
      this.loading.dismiss()
    }

    this.formGroup.reset()
  }

  async logScrolling(event){
   
    
    /* console.log(event); */

    if(event.target.localName != "ion-content") {
      // not sure if this is required, just playing it safe
      return;
    }

    const scrollElement = await event.target.getScrollElement();
    /* console.log({scrollElement}); */

    
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    /* console.log({scrollHeight}); */

    const currentScrollDepth = event.detail.scrollTop;
    /* console.log({currentScrollDepth}); */

    const targetPercent = 98;

    let triggerDepth = ((scrollHeight / 100) * targetPercent);
   /*  console.log({triggerDepth}); */
    let target = document.getElementById("btn-scroll")

    if(currentScrollDepth > triggerDepth) {
      /* console.log(`Scrolled to ${targetPercent}%`); */
      target.style.bottom ="250px"
    } else{
      target.style.bottom ="40px"
    }

  
    let navLinks = document.getElementsByClassName('nav-link')

    for (let index = 0; index < navLinks.length; index++) {
      const element = navLinks[index];

      element.classList.remove('currentScroll')
      element.children[0].classList.remove('text-white'); 
    }
    const current = event.detail.currentY

   /*  console.log(current); */

    if (current >= 746 && current<= 1493) {
      let target = document.getElementById("beneficios-2")
      target.classList.add('currentScroll')
      target.children[0].classList.add('text-white'); 
    }

    if (current >= 1494 && current<= 3638) {
      let target = document.getElementById("servicios-2")
      target.classList.add('currentScroll')
      target.children[0].classList.add('text-white'); 
    }

    if (current >= 3639 && current<= 4930) {
      let target = document.getElementById("metricas-2")
      target.classList.add('currentScroll')
      target.children[0].classList.add('text-white'); 
    }

    if (current >= 4931 && current<= 5913) {
      let target = document.getElementById("industrias-2")
      target.classList.add('currentScroll')
      target.children[0].classList.add('text-white'); 
    }

    if (current >= 5915 && current<= 6574) {
      let target = document.getElementById("nosotros-2")
      target.classList.add('currentScroll')
      target.children[0].classList.add('text-white'); 
    }
    
    if (current >= 6575) {
      let target = document.getElementById("contactanos-2")
      target.classList.add('currentScroll')
      target.children[0].classList.add('text-white'); 
    }
    
    let btnScroll = document.getElementById("btn-scroll");
    btnScroll.classList.remove('btnScrollEnd')

    if (event.detail.scrollTop > 500) btnScroll.style.display = "block";
    else btnScroll.style.display = "none";
    
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  scrollToLabel(label) {

    $(".navbar-collapse").collapse('hide');
    var titleELe = document.getElementById(label);
    this.content.scrollToPoint(0, titleELe.offsetTop, 1000);
  }


}
