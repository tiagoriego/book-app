import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../interfaces';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public bookTitle: string = '';
  public bookId: string = '';
  public books: Book[] | null = null;
  public title: string = '';

  constructor(
    private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks() {
    this.bookService
      .getAllBooks()
      .subscribe({
        next: (result) => {
          this.books = result;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      });
  }

  editBook(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }

  selectBook(bookTitle: string, bookId: string) {
    this.bookTitle = bookTitle;
    this.bookId = bookId;
  }

  deleteBook(bookId: string) {
    this.bookService
      .deleteBookById(bookId)
      .subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      })
  }

  linkBook(bookId: string) {
    this.router.navigate(['/book/link', bookId]);
  }
}
