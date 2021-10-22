import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
declare var $:any;
import { LoadingController } from '@ionic/angular';
import { ClubifyService } from '../services/clubify.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  formGroup: FormGroup;

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
      message: 'Cargando...',
      mode:'md',
      /* duration:4000 */
    });

    this.loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Listo',
      message: 'Gracias por contactarnos!',
      buttons: [
         {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
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
      
      /* await this.clubifyService.sendMail(this.formGroup.value).toPromise().then((resp)=>{
        console.log(resp)
      })
   */
      await this.clubifyService.sendWhatsapp(this.formGroup.value).toPromise().then((resp)=>{
        console.log(resp);
        this.presentAlert()
        this.loading.dismiss()
      })
      
      this.presentAlert()

    } catch (error) {
      alert('Ha sucedido un error enviando correo o mensaje')
      this.loading.dismiss()
    }

    this.formGroup.reset()
  }

  logScrolling(event){
    
    let btnScroll = document.getElementById("btn-scroll");

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
