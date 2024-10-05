import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VcsSidenavComponent } from '@ng-mf/my-lib';

@Component({
  standalone: true,
  imports: [VcsSidenavComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
