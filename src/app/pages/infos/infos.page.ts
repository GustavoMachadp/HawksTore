import { Component, OnInit } from '@angular/core';
import { User } from './../../interfaces/user';
import { AuthenticationService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AlertController,
  IonSlides,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {
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

  async register() {
    await this.showLoading();

    try {
      const newuser = await this.authService.register(this.userRegister);
      this.db.collection('User').doc(newuser.user.uid).set(this.userRegister);
      console.log(newuser);
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
}
