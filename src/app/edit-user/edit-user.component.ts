import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from "../service/user.service";
import { Router } from "@angular/router";
import { User, UserDetails } from "../model/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { first } from "rxjs/operators";
import { ListUserComponent } from '../list-user/list-user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = new User();
  uid: string;
  constructor(private router: Router, private userService: UserService, public dialogRef: MatDialogRef<ListUserComponent>, @Inject(MAT_DIALOG_DATA) public data: User, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user.userDetails = new UserDetails();
    this.uid = localStorage.getItem("editUserId");
    if (!this.uid) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }

    this.userService.getUserById(+this.uid)
      .subscribe(data => {
        this.user = data;
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    this.userService.updateUser(this.user)
      .subscribe(
        data => {
        },
        error => {
          this.openSnackBar("Error Occured ", "");
          error.status == 405 ? window.location.host = window.location.href : "";
        }, () => {
          this.onNoClick();
          this.router.navigate(['']);
          this.openSnackBar("User Updated  ", "")
        });
  }

}
