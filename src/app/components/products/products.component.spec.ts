import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/product.service';
import { generateManyProducts } from 'src/app/models/product.mock';
import { defer, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ValueService } from 'src/app/services/value.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {

    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); //ngOnInit
  });

  it('should create with spy product service', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });


  describe('test for getAllProducts()', () => {
    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const countPrev = component.products.length;
      // Act
      component.getAllProducts();
      // TODO
      const expectedImg = fixture.debugElement.query(By.css('app-product img'));
      fixture.detectChanges();
      // Assert

      expect(component.products.length).toEqual(productsMock.length + countPrev);
      expect(component.products[0].images[0]).toEqual(expectedImg.nativeElement.src);
    });
  });

  it('should change the status "loading" to "success"', fakeAsync(() => {
    // Arrange
    const productsMock = generateManyProducts(10);
    productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
    // Act
    component.getAllProducts();
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick(); // exec, obs, setTimeout, promise
    fixture.detectChanges();
    // Assert
    expect(component.status).toEqual('success');
  }));


  it('should change the status "loading" to "error"', fakeAsync(() => {
    // Arrange
    const productsMock = generateManyProducts(10);
    productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
    // Act
    const btnDe = fixture.debugElement.query(By.css('.btn-load'));
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick(4000); // exec, obs, setTimeout, promise
    fixture.detectChanges();
    // Assert
    expect(component.status).toEqual('error');

  }));

  
  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      // Arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      // Act
      await component.callPromise();
      fixture.detectChanges();
      // Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "my mock string" in <p> when btn was clicked', fakeAsync(() => {
      // Arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      const btnDe = fixture.debugElement.query(By.css('.btn-promise'));
      // Act
      btnDe.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const rtaDe = fixture.debugElement.query(By.css('p.rta'));
      // Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(rtaDe.nativeElement.textContent?.trim()).toEqual(mockMsg);
    }));
  })


});


