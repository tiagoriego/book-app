import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from '../app-routing.module';
import { BookService } from '../book/book.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

import { LinkComponent } from './link.component';
import { LinkService } from './link.service';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  const mockActivatedRoute = {
    snapshot: { data: {} },
    params: { subscribe: () => { }}
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LinkComponent, 
        HeaderComponent, 
        FooterComponent 
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        Ng2SearchPipeModule,
      ],
      providers: [
        HttpClient,
        HttpHandler,
        BookService,
        LinkService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
