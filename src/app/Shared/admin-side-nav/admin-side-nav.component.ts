import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent {
  labels = [
    {
      icon: "dashboard",
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      icon: "date_range",
      name: "Bookings",
      link: "/bookings"
    },
    {
      icon: "person_outline",
      name: "Customers",
      link: "/customers"
    },
    {
      icon: "person_outline",
      name: "Agent",
      link: "/agent"
    },
    {
      icon: "sync",
      name: "Discounts",
      link: "/discount"
    },
    {
      icon: "perm_identity",
      name: "User",
      link: "/user"
    },
    {
      icon: "build",
      name: "Service",
      link: "/service"
    },
    {
      icon: "account_balance_wallet",
      name: "Wallet",
      link: "/wallet"
    },
    {
      icon: "note_add",
      name: "Ledger",
      link: "/ledger"
    },
    {
      icon: "assignment",
      name: "Reports",
      link: "/report"
    },
    {
      icon: "settings",
      name: "Settings",
      link: "/settings"
    },
  ]
}
