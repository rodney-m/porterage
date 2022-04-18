import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

import { layoutRoutingModule } from './ui-layout.routing.module';



@NgModule({
  imports: [CommonModule, layoutRoutingModule],
  declarations: [ContainerComponent, SideMenuComponent, TopNavComponent],
  exports: [ContainerComponent]
})
export class UiLayoutModule {}
