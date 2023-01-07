import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  getAllBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/books/`);
  }

  getBookById(bookId: string) {
    return this.http.get<Book>(`${this.apiUrl}/books/${bookId}`);
  }

  saveEditBook(bookId: string, book: Book) {
    return this.http.patch(`${this.apiUrl}/books/${bookId}`, book);
  }

  saveBook(book: Book) {
    return this.http.post(`${this.apiUrl}/books/`, book);
  }

  deleteBookById(bookId: string) {
    return this.http.delete(`${this.apiUrl}/books/${bookId}`);
  }
}
