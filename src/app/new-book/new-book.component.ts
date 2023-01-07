import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book/book.service';
import { Book } from '../interfaces';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent {

  public formBook: FormGroup;
  public error: string;

  constructor(
    private bookService: BookService,
    private router: Router) {
    this.formBook = this.getFormBook();
    this.error = '';
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

  onSaveBook() {

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
      .saveBook(book)
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
