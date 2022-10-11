import { User } from './../../interfaces/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {
  AlertController,
  IonSlides,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService,
    public Loadingctrl: LoadingController,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async login() {
    await this.showLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.showToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.showLoading();

    try {
      const newuser = await this.authService.register(this.userRegister);
      const uidUser = this.db.collection('User').doc(newuser.user.uid);
      console.log(uidUser);
    } catch (error) {
      this.showToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  async showLoading() {
    this.loading = await this.Loadingctrl.create({
      message: 'Por favor aguarde!',
    });

    return this.loading.present();
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }
}
