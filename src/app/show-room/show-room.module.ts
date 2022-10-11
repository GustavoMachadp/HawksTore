import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowRoomPageRoutingModule } from './show-room-routing.module';

import { ShowRoomPage } from './show-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowRoomPageRoutingModule
  ],
  declarations: [ShowRoomPage]
})
export class ShowRoomPageModule {}
