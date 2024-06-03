import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCardListComponent } from './acces-card-list.component';

describe('AccesCardListComponent', () => {
  let component: AccessCardListComponent;
  let fixture: ComponentFixture<AccessCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessCardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
