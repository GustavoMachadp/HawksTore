import { Injectable } from '@angular/core';
import { Skate } from './skt';
import { AngularFireDatabase, AngularFireList, AngularFireObject,} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})

export class CrudService {
  skatesRef: AngularFireList<any>;
  skateRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {} 

  GetSkate(key: string) {
    this.skateRef = this.db.object('skate-list/' + key);
    return this.skateRef;
  }

  GetSkateList() {
    this.skatesRef = this.db.list('skate-list');
    return this.skatesRef;
  }

}