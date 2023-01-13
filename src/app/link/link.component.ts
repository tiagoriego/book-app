import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../book/book.service';
import { Book, Link } from '../interfaces';
import { LinkService } from './link.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  public formLink: FormGroup;
  public book: Book | null;
  public bookId: string;
  public linkId: string;
  public links: Link[] | null;
  public linkTitle: string | undefined;
  public error: string;
  public title: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private bookService: BookService,
    private linkService: LinkService,
    private router: Router) {
    this.formLink = this.getFormLink();
    this.bookId = '';
    this.linkId = '';
    this.error = '';
    this.links = null;
    this.book = null;
    this.title = '';
    this.linkTitle = '';
  }

  ngOnInit(): void {
    this.loadDataLink();
  }

  getFormLink(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      url: new FormControl('', [Validators.minLength(3), Validators.required, Validators.pattern('^(http\:\/\/|https\:\/\/).*$')]),
    });
  }

  get name() {
    return this.formLink.get('name');
  }

  get url() {
    return this.formLink.get('url');
  }

  private loadDataLink() {
    this.activatedRouter
      .params
      .subscribe((params: Params) => {
        const bookId = params['id'];
        this.bookService
          .getBookById(bookId)
          .subscribe({
            next: (result: Book) => {
              this.book = result;
              this.linkService
                .getAllLinkByBookId(bookId)
                .subscribe({
                  next: (result: Link[]) => {
                    this.bookId = bookId;
                    this.links = result;
                  },
                  error: (error: HttpErrorResponse) => {
                    this.showMsgError(error);
                  }
                });
            },
            error: (error: HttpErrorResponse) => {
              if (error.status == 404) {
                this.router.navigate(['/book']);
              }
              this.showMsgError(error);
            }
          });
      });
  }

  onSaveLink(bookId: string) {

    if (this.name?.invalid || this.url?.invalid) return;

    const newLink = {
      book_id: bookId,
      name: this.name?.value,
      url: this.url?.value
    } as Link;

    this.linkService
      .saveLink(newLink)
      .subscribe({
        next: (result: Link) => {
          this.links?.push(result);
          this.name?.reset();
          this.url?.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.showMsgError(error);
        }
      });
  }

  onDeleteLink(bookId: string, linkId: string) {
    this.linkService
      .deleteLinkByBookId(bookId, linkId)
      .subscribe({
        next: () => {
          this.loadDataLink();
        },
        error: (error: HttpErrorResponse) => {
          this.showMsgError(error);
        }
      })
  }

  onSelectLink(linkId: string) {
    const linkTitle = this.links?.filter(link => link.id == linkId)[0];
    this.linkTitle = `${linkTitle?.name} - ${linkTitle?.url.substring(0, linkTitle?.url.length < 40 ? linkTitle?.url.length : 40)}...`;
    this.linkId = linkId;
  }

  private showMsgError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        if (error.error) {
          if (Object.keys(error.error).indexOf('detail') !== -1) {
            this.error = error.error['detail'];
          }
        }
        break;
      default:
        this.error = error.message;
    }
  }

  onCancel() {
    this.router.navigate(['/book']);
  }
}
