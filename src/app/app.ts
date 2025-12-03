import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Messages } from './components/messages/messages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Messages],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Arènes du Mordor';
}
