export interface Student {
  id: string;
  fullname: string;
  username: string;
  nisn: string;
  email: string | null;
  phone_number: string | null;
}

export interface StudentProfileResponse extends Student {
  school: string;
}
