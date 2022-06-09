import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Array<any> = [
    {
      title: 'Quant trident shirts',
      rating: 4,
      tags: ['100% cotton', 'Light weight', 'Best finish'],
      description: `There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form, by injected humour, or
      randomised words which don't look even slightly believable.`,
      price: 20,
      discountedPrice: 15,
      isFreeShipping: true,
      shippingChange: 0,
      imgSrc: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp',
      ratingUserCount: 200

    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
