import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CrudService } from '../shared/crud-service';
import { Skate } from '../shared/skt';
import { getStorage, ref as refS, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { IonicSafeString } from '@ionic/angular';

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.page.html',
  styleUrls: ['./show-room.page.scss'],
})
export class ShowRoomPage implements OnInit {
  produtos: any[] = [];
  skateImg: String[];
  p: number = 1;
  esconderSkateNulo: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController,
    public crudApi: CrudService,
    public router: Router
  ) {}

  ngOnInit() {
    const storage = getStorage();
    this.dataState();
    let s = this.crudApi.GetSkateList();
    s.snapshotChanges().subscribe((data) => {
      this.produtos = [];
      this.skateImg = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        getDownloadURL(refS(storage, 'Skate/' + item.key)).then((url) => {
          this.skateImg[item.key] = url;
        });
        this.produtos.push(a as Skate);
      });
    });
  }

  dataState() {
    this.crudApi
      .GetSkateList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.esconderSkateNulo = false;
          this.noData = true;
        } else {
          this.esconderSkateNulo = true;
          this.noData = false;
        }
      });
  }

  async showPopUp(produto) {
    console.log('evento Ok');
    const alert = await this.alertController.create({
      header: produto.nome,
      message: `<img src=${this.skateImg[produto.$key]}>${
        produto.tamanho
      }<br> ${produto.lixa}<br> ${produto.material}<br> ${produto.modelo}<br> ${
        produto.marca
      }<br> ${produto.linha}<br> ${
        produto.resina
      }<br><ion-text class="verde" color="success">Valor: R$${
        produto.valor
      }</ion-text>`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'COMPRAR', //comprar não faz nada
        },
      ],
    });
    await alert.present();
  }

  navega() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  perfil() {
    this.router.navigate(['perfil']);
  }
}
