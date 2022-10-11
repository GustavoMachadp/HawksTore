import { User } from '../interfaces/user';
import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {}

  login(user: User) {
    return this.ngFireAuth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  register(user: User) {
    return this.ngFireAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  logout() {
    return this.ngFireAuth.signOut();
  }

  getAuth() {
    return this.ngFireAuth;
  }
}
