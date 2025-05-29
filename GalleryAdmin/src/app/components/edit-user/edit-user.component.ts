import { Component, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { UserPost } from '../../models/userPost';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  currentUser: UserPost;

  dialogRef = inject(MatDialogRef<EditUserComponent>);
  data = inject(MAT_DIALOG_DATA) as { currentUser: UserPost };
  userService = inject(UserService);

  hidePassword = true;

  constructor() {
    this.currentUser = structuredClone(this.data.currentUser); // שומר עותק נפרד
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  saveData(): void {
    this.dialogRef.close(this.currentUser); // מחזיר את המשתמש המעודכן
  }

  cancel(): void {
    this.dialogRef.close(); // סגירה ללא שמירה
  }
}
