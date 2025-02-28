export interface Note {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export interface NewNote {
  title: string;
  content: string;
  category: string;
}

export interface User {
  email: string;
  password: string;
}
export interface NewUser {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}
