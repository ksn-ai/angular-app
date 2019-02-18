import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { User } from "../model/user.model";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users: User[];
  displayedColumns: string[] = ['first', 'uid', 'name', 'address', 'email', 'action'];

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    var inst = this;
    this.userService.getUsers()
      .subscribe(data => {
        inst.users = data;
      });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers()
        .subscribe(data => {
          this.users = data;
        });
    });
  }

  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.uid.toString());
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '750px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers()
        .subscribe(data => {
          this.users = data;
        });

    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.uid)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      },
        error => {
          this.openSnackBar("Error Occured", "");
          error.status == 405 ? window.location.href = window.location.host : "";
        },
        () => {
          this.openSnackBar("User Deleted", "");

        })
  };

}
