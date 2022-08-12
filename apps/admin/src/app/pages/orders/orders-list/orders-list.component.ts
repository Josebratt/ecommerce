import { Subject, takeUntil, timer } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Order, ORDER_STATUS } from '@ecommerce/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderService } from '@ecommerce/orders';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private ordersService: OrderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe({
          next: () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success Message',
              detail: `Order is deleted`,
            });
            timer(2000)
              .pipe(takeUntil(this.endsubs$))
              .subscribe({ next: () => this.location.back() });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: `Order is not deleted`,
            });
          },
        });
      },
    });
  }
}
