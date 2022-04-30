import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule, CommonModule,  NzBreadCrumbModule, NzLayoutModule, NzMenuModule, NzToolTipModule, NzButtonModule, NzTableModule, NzIconModule],
  declarations: [ContainerComponent, SideMenuComponent, TopNavComponent],
  exports: [ContainerComponent]
})
export class UiLayoutModule {}
