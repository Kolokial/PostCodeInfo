import { waitForAsync, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostCodeInfoComponent } from "./post-code-info.component";
import { PostCodeInfoService } from "./post-code-info.service";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";

describe("PostCodeInfoComponent", () => {
  let component: PostCodeInfoComponent;
  let fixture: ComponentFixture<PostCodeInfoComponent>;

  let postCodeInfoService: PostCodeInfoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostCodeInfoComponent],
      providers: [{ provide: PostCodeInfoService, useValue: {
        getPostCodeInfo: () => {
          return throwError({
          error: {
            status: 400,
            error: "No postcode query submitted. Remember to include query parameter"
          }            
        })},
        validatePostCode: ()=> {
          return of({
              status: 200,
              result: false
          })
        }}}]
    }).compileComponents();
  }));

  function createComponent(){
    fixture = TestBed.createComponent(PostCodeInfoComponent);
    component = fixture.componentInstance;
    postCodeInfoService = TestBed.inject(PostCodeInfoService);
    fixture.detectChanges();
  }

  beforeEach(() => {
    createComponent();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("when an invalid call is made to postcodes.io", () =>{
    beforeEach(() => {
      createComponent();
    });

    it("should handle a 400", fakeAsync(() => {
        spyOn(postCodeInfoService, 'getPostCodeInfo').and.callThrough();
        const nativeElement = fixture.debugElement.nativeElement;
        nativeElement.querySelector('.button').click();
        tick();
        fixture.detectChanges();
        console.log(nativeElement.querySelector('.error'));
        expect(nativeElement.querySelector('.error').textContent).toContain('No postcode query submitted. Remember to include query parameter');
    }));
  });

  describe("when a non existant postcode", () => {
    it("should display a message saying this", () => {
      spyOn(postCodeInfoService, 'validatePostCode').and.callThrough();
      const nativeElement = fixture.debugElement.nativeElement;
      const input = nativeElement.querySelector('.post-code');
      input.value ="IP3 9IK";
      input.dispatchEvent(new KeyboardEvent('keyup'));
      fixture.detectChanges();
      expect(nativeElement.querySelector('.is-valid').textContent).toContain('Does this postcode exist: false');
    })
  })
});
