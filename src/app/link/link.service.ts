import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Link } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllLinkByBookId(bookId: string): Observable<Link[]> {
    return this.http.get<Link[]>(`${this.apiUrl}/books/${bookId}/links`);
  }

  saveLink(link: Link): Observable<Link> {
    return this.http.post<Link>(`${this.apiUrl}/books/${link.book_id}/links`, link);
  }

  deleteLinkByBookId(bookId: string, linkId: string) {
    return this.http.delete(`${this.apiUrl}/books/${bookId}/links/${linkId}`);
  }
}
