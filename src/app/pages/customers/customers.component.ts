import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { _MatTableDataSource } from '@angular/material/table';
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog.component';
import { ICustomer } from 'src/app/Models/icustomer';
import { AdminService } from 'src/app/Services/admin-service/admin.service';
import { CustomerService } from 'src/app/Services/user-service/customer.service';
import { IAdmin } from 'src/app/ViewModels/iadmin';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  listOfCustomers: ICustomer[] = [];
  listOfAdmins: IAdmin[] = [];
  listOfNonAdmins: IAdmin[] = [];
  searchText: string;
  displayedColumns: string[] = [
    'ID',
    'FirstName',
    'LastName',
    'Email',
    'PhoneNumber',
    'IsActive'
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading: boolean = true;
  selected = '1';
  constructor(
    private customerService: CustomerService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.searchText = '';
  }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((users) => {
      this.listOfCustomers = users;
      this.dataSource = new _MatTableDataSource(this.listOfCustomers);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
    this.adminService.getAdmins.subscribe((admins) => {
      this.listOfAdmins = admins;
    });
  }

  changeViewedList() {
    if (this.selected == '1') {
      this.dataSource = new _MatTableDataSource(this.listOfCustomers);
    } else if (this.selected == '2') {
      this.dataSource = new _MatTableDataSource(this.listOfAdmins);
    } else if (this.selected == '3') {
      this.listOfNonAdmins = this.listOfCustomers.filter(
        (user) => !this.adminService.getAdminsIds.includes(user.ID)
      );
      this.dataSource = new _MatTableDataSource(this.listOfNonAdmins);
    }
    this.dataSource.paginator = this.paginator;
    this.searchText = '';
  }
  onTextChange() {
    if (this.searchText == '') {
      this.changeViewedList();
    } else {
      if (this.selected == '1') {
        this.dataSource = new _MatTableDataSource(
          this.listOfCustomers.filter((user) =>
            `${user.FirstName} ${user.LastName}`
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase())
          )
        );
      } else if (this.selected == '2') {
        this.dataSource = new _MatTableDataSource(
          this.listOfAdmins.filter((admin) =>
            `${admin.FirstName} ${admin.LastName}`
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase())
          )
        );
      } else if (this.selected == '3') {
        this.dataSource = new _MatTableDataSource(
          this.listOfNonAdmins.filter((user) =>
            `${user.FirstName} ${user.LastName}`
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase())
          )
        );
      }
      this.dataSource.paginator = this.paginator;
    }
  }
  checkIfAdmin(userId: string) {
    if (this.adminService.getAdminsIds.includes(userId)) return true;
    return false;
  }
  addNewAdmin(user: ICustomer) {
    let dialogRef = this.dialog.open(ReusableDialogComponent, {
      data: {
        title: 'Add Admin',
        content: 'Are you sure you want to add this user as an admin?',
        yes: 'Yes',
        no: 'cancel',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.adminService.addAdmin({
          id: user.ID,
          Email: user.Email,
          FirstName: user.FirstName,
          LastName: user.LastName,
        });
      }
    });
  }

  deleteAdmin(adminID: string) {
    let dialogRef = this.dialog.open(ReusableDialogComponent, {
      data: {
        title: 'Remove Admin',
        content: 'Are you sure you want to remove this admin?',
        yes: 'Yes',
        no: 'cancel',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.adminService.removeAdmin(adminID);
      }
    });
  }
}
