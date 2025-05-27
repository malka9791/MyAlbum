import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-header',
  imports: [MatIcon,RouterLink,DateFormatPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentDate: string = new Date().toString(); 

}
