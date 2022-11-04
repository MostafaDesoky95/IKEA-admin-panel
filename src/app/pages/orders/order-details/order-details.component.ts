import { Component, OnInit } from '@angular/core';
import { _MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';
import { IOrder } from './../../../Models/iorder';
import { UserService } from 'src/app/Services/user-service/customer.service';
import { IProduct } from './../../../Models/iProducts';
import { first } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'pId',
    'name',
    'description',
    'amount',
    'price',
    'totalPrice',
    'image',
  ];

  loading: boolean = true;
  dataSource: any;

  currentOrderID!: string;

  orderedProducts: any[] = [];
  orderItems: any;
  currentOrder: IOrder;
  currentPurchaseDate: any;

  userID!: string;
  currentUserName: string;

  constructor(
    private orders: OrdersService,
    private productsService: ProductsCrudService,
    private users: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.currentOrderID = param.get('oid');
      this.orders
        .getOrderById(this.currentOrderID)
        .pipe(first())
        .subscribe((order) => {
          this.userID = order.UserID;
          this.users.getUserById(this.userID).subscribe((user) => {
            const fname = user.FirstName;
            const lname = user.LastName;
            this.currentUserName = `${fname} ${lname}`;
          });

          this.currentOrder = order;
          this.orderItems = order.Items;
          this.currentPurchaseDate = order.CreatedAt;

          this.orderedProducts = [];
          this.orderItems.forEach((product) => {
            console.log(product);
            this.productsService
              .getProductDetailsById(product.ProductID)
              .pipe(first())
              .subscribe((productData) => {
                this.loading = false;
                this.dataSource = new _MatTableDataSource(this.orderedProducts);

                this.orderedProducts.push({
                  id: product.ProductID,
                  name: productData.ProductName,
                  description: productData.Name,
                  amount: Number(product.Amount),
                  price: productData.Price,
                  totalPrice:
                    Number(productData.Price) * Number(product.Amount),
                  image: productData.Images[0],
                });
              });
          });
        });
    });
  }
}
