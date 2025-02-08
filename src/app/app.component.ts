import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrganizationsStore } from './stores/organizations/organizations.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [OrganizationsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {

  }
  title = 'basket-front-v2';

}
