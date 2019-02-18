export class User {
  uid: number;
  name: string;
  lastName: string;
  userDetails: UserDetails;
}

export class UserDetails {
  uid: number;
  address: string;
  email: string;
}
