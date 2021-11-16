import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubifyService {

  constructor(private http: HttpClient) {}

  sendMail(data){
    const endpoint = `https://message-backend.gestsol.io/email/send-email`;
    const headers = new HttpHeaders({'Accept': '*/*'})
    const body = {
      to: `${data.email}`,
      subject: "Bienvenido a Clubify",
      content: `<div style='display: flex!important;justify-content: center!important; '>
      <div>
        <div style='text-align: center!important;box-shadow: 0px 3px 6px #00000029!important;'>
          <br>
          <img src='https://clubify-landing.netlify.app/assets/images/clubify.png' style='width: 180px;' alt='' srcset=''>
          <br>
          
    
        </div>
        <div style='text-align: center; padding: 30px; width: 480px; box-shadow: 0px 3px 3px #00000029!important; color: black;'>
      
          <p style='text-align:start!important'>¡Hola ${data.first_name}! Hemos recibido tu solicitud para contratar Clubify. Tras comprobar tu contacto, enviaremos un correo a esta misma dirección para que escojas el método de afiliación al producto. </p>
      
          <br>
          <div style='background: #FFFFFF !important;box-shadow: 2px 2px 6px #0000001A!important;border: 1px solid #EDEDED!important;border-radius: 5px!important; padding: 0px 20px!important;text-align: center!important'>
            <p style='color: #363636!important; margin-bottom: 0px!important;font-weight: bold!important;'><strong>${data.first_name} ${data.last_name}</strong>  </p>
            <p style='color: #363636!important; margin-bottom: 0px!important;font-weight: bold!important;'><strong>${data.phone}</strong> </p>
            <p style='color: #363636!important; margin-bottom: 0px!important;font-weight: bold!important;'><strong>${data.email}</strong>  </p>
          </div>
          <br>
      
          <br>
          <br>
          <a href='https://clubify-landing.netlify.app/home' target='_blank' style='text-decoration: none;'><span style='color: white;padding: 15px; background-color: #FF5021;box-shadow: 2px 2px 5px #7C290080;
            border-radius: 10px;font-weight: bold;'>SOLICITAR GO! MOVIE</span> </a>
      
        </div>
      </div>
    </div>
  `
  }

    return this.http.post<any>(endpoint, body/*,  { headers: headers} */)  
  }

  sendWhatsapp(data){
    const endpoint = `https://message-backend.witservices.io/whatsapp/sendmessage**`;
    const headers = new HttpHeaders({'Accept': '*/*'})
    const body = {
      "code": data.prefix,
      "phone": data.phone,
      "message": `¡Hola ${data.first_name}! Hemos recibido tu solicitud para contratar Live GPS. Tras comprobar que eres beneficiario, enviaremos un correo electronico para que escojas el método de entrega de tu producto.`
   }

    return this.http.post<any>(endpoint, body/* , { headers: headers} */)  
  }

}
