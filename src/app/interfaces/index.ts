export interface Token {
  access_token: string;
  token_type: string;
}

export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  dimensions: string;
  format: string;
  isbn: string;
  language: string;
  paperback: string;
  publication_date: string;
  publisher: string;
}

export interface UserPassword {
  old_password: string;
  new_password: string;
}