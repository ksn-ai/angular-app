import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from "../service/user.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { User, UserDetails } from '../model/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ListUserComponent } from '../list-user/list-user.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public user: User = new User();

  constructor(private router: Router, private userService: UserService, public dialogRef: MatDialogRef<ListUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.user.userDetails = new UserDetails();

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
    this.userService.createUser(this.user)
      .subscribe(data => {
        console.log(this.user);
      }
        , error => {
          this.openSnackBar("Error Occured", "");
          error.status == 405 ? window.location.href = window.location.host : "";
        },
        () => {
          this.openSnackBar("User Added", "");
          this.onNoClick();
          this.router.navigate(['']);
        });
  }

}
