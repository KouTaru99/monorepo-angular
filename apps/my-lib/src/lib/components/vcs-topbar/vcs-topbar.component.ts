import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'vcs-topbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, LanguageSwitcherComponent],
  templateUrl: './vcs-topbar.component.html',
  styleUrl: './vcs-topbar.component.scss',
})
export class VcsTopbarComponent {}
