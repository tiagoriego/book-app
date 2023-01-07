import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../book/book.service';
import { Book } from '../interfaces';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  public formBook: FormGroup;
  public bookId: string;
  public error: string;

  constructor(
    private bookService: BookService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {
    this.formBook = this.getFormBook();
    this.bookId = '';
    this.error = '';
  }

  ngOnInit(): void {
    this.loadDataBook();
  }

  private getFormBook() {
    return new FormGroup({
      title: new FormControl('', [Validators.minLength(3), Validators.required]),
      author: new FormControl('', [Validators.minLength(3), Validators.required]),
      dimensions: new FormControl('', [Validators.minLength(3), Validators.required]),
      format: new FormControl('', [Validators.minLength(3), Validators.required]),
      isbn: new FormControl('', [Validators.minLength(3), Validators.required]),
      language: new FormControl('', [Validators.minLength(3), Validators.required]),
      paperback: new FormControl('', [Validators.minLength(3), Validators.required]),
      publication_date: new FormControl('', [Validators.minLength(3), Validators.required]),
      publisher: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  get title() {
    return this.formBook.get('title');
  }

  get author() {
    return this.formBook.get('author');
  }

  get dimensions() {
    return this.formBook.get('dimensions');
  }

  get format() {
    return this.formBook.get('format');
  }

  get isbn() {
    return this.formBook.get('isbn');
  }

  get language() {
    return this.formBook.get('language');
  }

  get paperback() {
    return this.formBook.get('paperback');
  }

  get publication_date() {
    return this.formBook.get('publication_date');
  }

  get publisher() {
    return this.formBook.get('publisher');
  }

  private loadDataBook() {
    this.activatedRouter
      .params
      .subscribe((params: Params) => {
        this.bookService
          .getBookById(params['id'])
          .subscribe({
            next: (result) => {
              this.fillFormBook(result);
            },
            error: () => {
              this.router.navigate(['/book'])
            }
          })
      });
  }

  private fillFormBook(book: Book) {
    this.bookId = book.id;
    this.formBook.get('title')?.setValue(book.title);
    this.formBook.get('author')?.setValue(book.author);
    this.formBook.get('dimensions')?.setValue(book.dimensions);
    this.formBook.get('format')?.setValue(book.format);
    this.formBook.get('isbn')?.setValue(book.isbn);
    this.formBook.get('language')?.setValue(book.language);
    this.formBook.get('paperback')?.setValue(book.paperback);
    this.formBook.get('publication_date')?.setValue(book.publication_date);
    this.formBook.get('publisher')?.setValue(book.publisher);
  }

  onSaveBook(bookId: string) {

    let isValid: boolean = true

    const book = {
      title: this.title?.value,
      author: this.author?.value,
      dimensions: this.dimensions?.value,
      format: this.format?.value,
      isbn: this.isbn?.value,
      language: this.language?.value,
      paperback: this.paperback?.value,
      publication_date: this.publication_date?.value,
      publisher: this.publisher?.value
    } as Book

    const fields = Object.keys(book);
    for (let field of fields) {
      if (this.formBook.get(field)?.invalid) {
        isValid = false;
        break;
      }
    }

    if (!isValid)
      return;

    this.bookService
      .saveEditBook(bookId, book)
      .subscribe({
        next: () => {
          this.router.navigate(['/book'])
        },
        error: (error: HttpErrorResponse) => {          
          this.error = error.message;
        }
      });
  }

  onCancel() {
    this.router.navigate(['/book']);
  }
}
