export interface Student {
  id: string;
  fullname: string;
  username: string;
  nisn: string;
  email: string;
  phone_number: string;
}

export interface StudentProfileResponse extends Student {
  school: string;
}
