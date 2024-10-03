import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { VcsSidenavComponent } from '@ng-mf/my-lib';
import { VcsButtonComponent } from '@ng-mf/my-lib';
@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, VcsSidenavComponent, VcsButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-mf';
}
