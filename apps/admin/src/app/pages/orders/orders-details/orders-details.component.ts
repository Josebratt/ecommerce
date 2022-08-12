import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService, ORDER_STATUS } from '@ecommerce/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-details',
  templateUrl: './orders-details.component.html',
  styles: [],
})
export class OrdersDetailsComponent implements OnInit {
  order: Order = new Order();
  orderStatuses: { id: string; name: any; }[] = [];
  selectedStatus: any;
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _getOrder() {
    let id = '';
    this.route.params.subscribe((params) => {
      id = params['id'];
      if (id) {
        this.orderService
          .getOrder(id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
          });
      }
    });
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }

  onStatusChange(event: any) {
    this.orderService
      .updateOrder({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!',
          });
        },
      });
  }
}
