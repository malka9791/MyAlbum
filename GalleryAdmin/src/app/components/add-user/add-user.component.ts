import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserPost } from '../../models/userPost';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  imports: [MatLabel, MatIcon, MatDialogModule, MatFormField],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
  messege!: string;
  hidePassword: boolean = true;

  AddUser(fullName: string, email: string, password: string, role: string) {
    const u1 = new UserPost(fullName, email, password, role);
    this.userService.addUser(u1).subscribe({
      next: (response) => {
        this.messege = 'succes add a user!!';
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
