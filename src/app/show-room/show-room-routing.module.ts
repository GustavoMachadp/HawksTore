import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowRoomPage } from './show-room.page';

const routes: Routes = [
  {
    path: '',
    component: ShowRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowRoomPageRoutingModule {}
