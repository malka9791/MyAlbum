import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserPost } from '../../models/userPost';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [MatLabel, MatIcon, MatDialogModule, MatFormField,CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
role: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
  messege!: string;
  hidePassword: boolean = true;

  AddUser(fullName: string, email: string, password: string, role: string) {
    const u1 = new UserPost(fullName, email, password, role);
    this.userService.addUser(u1).subscribe({
      next: (response) => {
        this.messege = 'succes add a user!!';
        window.location.reload();
      },
      error: (err) => {
        if (err.status === 403) {
          console.error('you dont have permission add user data.');
        } else {
          console.error(' error :', err);
        }
      },
    });
  }
}
