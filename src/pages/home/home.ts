import { Component } from '@angular/core';
//componentes
import { ToastController, Platform } from 'ionic-angular';
// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//servicios
import { HistorialService } from './../../providers/historial/historial';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, private platform: Platform, private _historialService: HistorialService) {

  }
  scan() {
    console.log("realizando scan");
    if (!this.platform.is("cordova")) {
      console.log("No celular");
      this.mostrar_error("No celular");
      // this._historialService.agregar_historial("http://google.com");
      // this._historialService.agregar_historial("geo:9.976133040865312,-84.00677479055173");
     /* this._historialService.agregar_historial(`BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );*/

this._historialService.agregar_historial("MATMSG:TO:lucas1eichhorn@gmail.com;SUB:Hola Mundo;BODY:Saludos Lucas!;;");
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log("result:", barcodeData.text);
      console.log("format:", barcodeData.format);
      console.log("cancelled:", barcodeData.cancelled);
      if (barcodeData.cancelled == 0 && barcodeData.text != null) {
        this._historialService.agregar_historial(barcodeData.text);

      }

    }, (err) => {
      // An error occurred
      console.error("Error: ", err);
      this.mostrar_error("Error: " + err);
    });

  }

  mostrar_error(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });

    toast.present();

  }

}
