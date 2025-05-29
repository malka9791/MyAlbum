import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { UserPost } from '../../models/userPost';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  list: User[] = [];
  message = '';
  currentIdForEdit: number | null = null;

  ngOnInit(): void {
    this.userService.getUsers().then((users) => {
      this.list = users;
    });
  }

  edit(id: number, item: UserPost): void {
    this.currentIdForEdit = id;
    this.message = '';

    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { currentUser: item },
    });

    dialogRef.afterClosed().subscribe((result: UserPost | undefined) => {
      if (result) {
        this.save(result);
      }
    });
  }

  delete(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert('User deleted successfully.');
        this.list = this.list.filter((user) => user.id !== id);
      },
      error: (err) => {
        if (err.status === 403) {
          console.log('You do not have permission to delete this user.');
        } else {
          console.error('Error deleting user:', err);
        }
      },
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {});
  }
  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(id);
      }
    });
  }

  save(userPost: UserPost): void {
    if (!userPost.id) {
      this.message = 'Missing user ID.';
      return;
    }

    this.userService.editUser(userPost.id, userPost).subscribe({
      next: () => {
        this.userService.getUsers().then((users) => {
          this.list = users;
        });
        this.currentIdForEdit = null;
      },
      error: (err) => {
        if (err.status === 403) {
          this.message = 'You cannot change user details.';
        } else {
          this.message = 'Error editing user: ' + err.message;
        }
      },
    });
  }

  canChange(): boolean {
    const role =
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('role')
        : null;
    return role !== 'user';
  }
}
