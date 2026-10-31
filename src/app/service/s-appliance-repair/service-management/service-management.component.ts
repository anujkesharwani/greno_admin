import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewServiceDialogComponent } from 'src/app/dialog/add-new-service-dialog/add-new-service-dialog.component';
import { EditServiceDialogComponent } from 'src/app/dialog/edit-service-dialog/edit-service-dialog.component';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent {
  data = [
    {
      imgSource: 'https://s3-alpha-sig.figma.com/img/131a/e7ae/73fa4a5a5fc704fc03238e8f209dfa3c?Expires=1692576000&Signature=LquxRz1GCCxVl0WEbKzlsl85K5f53F4xMnZFodHP4uvc76aKXR0xB7LSxWqNIc5g1mgORQzTrztAdlWP8-Ug2XdL7D7bwk9B92mt5n8ZaB-auAQgLO-LkvfQJ4pYZmxDbIqmoYWrsa8574q~JPDMgUzWCZEfnCOs-PBOqiknxFXU3FtjZ-oAnUu77tZaCe74sCRNPxUDvoN4i2rQOAzZXBd8QlZlhAShgUZUwL49Ju9rlK2V6Y9ssM2bk5e6Li5UA3Q~CLMTPJsJjDJh~8aVxMrxJ6R2Vgj-Uxbx0h8xH2DLvg-LTSMSIyjEbsM70DIXdqwIM9Tkqm9-vpxqqRA9Fg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/78e6/27a6/955235459151c573a6c0c387e1120638?Expires=1692576000&Signature=Bva-ZTdedjs~2hAymA5WB1fIpDqLsgJOLUrmedipyHQqHrvTKo~TTGcPpHBmLPsSBtJQlhKzJxm3E1TDqaGJ8JDCiRvCQYdHH-q~MnhFzPbN-cxLLXgpBfR-cr60m8gtc0RM5E4rKBcIj12EgZEi53WvgQSehLmc4W-apRZSXQjMdYHLnezWUKmddmquAafdIAtOjvTUHTx5ZHF1UxXXRhdLrXaEG1-hDSCbOCSuSiH8KVdnfwB5hHynYwbf-27CIgu8eBuZMGGKlGKe5EpnFlQx7haHMxkQBRcptP2raxFwRPfyWyGH9vx32~hgZ46BJn09VO7Ood1uZKPSaQxbEg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/e97e/a66a/2a45608bafab46ced800ca01003c3415?Expires=1692576000&Signature=V-05duKg90G23HEHNovixFRXpD5gpMNuJoRdUANPE6FfaEvS4jIWTP3UW7BZ5Urt5guRf3Hc~pho7ATawj8-UB63Mwbctm8-on4Wx0x6-UmRHszy0CpZvSd6tl9mGj3Q7eR9rRN9uCcknoPFGUayxLtrijJLB8FzMI~R7mO2te3aArLK6CgWke1JINlsxZ-mfPFHmNBTIrgA~NOhoGZIOAjXIYz6aiyBav3V22n5pbY8S8L-XYrV3Kq-MdSsm5YNt6W7Bca8jYkUk3O2Qs6N-L9xwjIyIhPOyoXO8w1oJ1MGq7uK86F0A72d15xVwih73lNEFE8CeXmlGx-zU38vhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/131a/e7ae/73fa4a5a5fc704fc03238e8f209dfa3c?Expires=1692576000&Signature=LquxRz1GCCxVl0WEbKzlsl85K5f53F4xMnZFodHP4uvc76aKXR0xB7LSxWqNIc5g1mgORQzTrztAdlWP8-Ug2XdL7D7bwk9B92mt5n8ZaB-auAQgLO-LkvfQJ4pYZmxDbIqmoYWrsa8574q~JPDMgUzWCZEfnCOs-PBOqiknxFXU3FtjZ-oAnUu77tZaCe74sCRNPxUDvoN4i2rQOAzZXBd8QlZlhAShgUZUwL49Ju9rlK2V6Y9ssM2bk5e6Li5UA3Q~CLMTPJsJjDJh~8aVxMrxJ6R2Vgj-Uxbx0h8xH2DLvg-LTSMSIyjEbsM70DIXdqwIM9Tkqm9-vpxqqRA9Fg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/78e6/27a6/955235459151c573a6c0c387e1120638?Expires=1692576000&Signature=Bva-ZTdedjs~2hAymA5WB1fIpDqLsgJOLUrmedipyHQqHrvTKo~TTGcPpHBmLPsSBtJQlhKzJxm3E1TDqaGJ8JDCiRvCQYdHH-q~MnhFzPbN-cxLLXgpBfR-cr60m8gtc0RM5E4rKBcIj12EgZEi53WvgQSehLmc4W-apRZSXQjMdYHLnezWUKmddmquAafdIAtOjvTUHTx5ZHF1UxXXRhdLrXaEG1-hDSCbOCSuSiH8KVdnfwB5hHynYwbf-27CIgu8eBuZMGGKlGKe5EpnFlQx7haHMxkQBRcptP2raxFwRPfyWyGH9vx32~hgZ46BJn09VO7Ood1uZKPSaQxbEg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/e97e/a66a/2a45608bafab46ced800ca01003c3415?Expires=1692576000&Signature=V-05duKg90G23HEHNovixFRXpD5gpMNuJoRdUANPE6FfaEvS4jIWTP3UW7BZ5Urt5guRf3Hc~pho7ATawj8-UB63Mwbctm8-on4Wx0x6-UmRHszy0CpZvSd6tl9mGj3Q7eR9rRN9uCcknoPFGUayxLtrijJLB8FzMI~R7mO2te3aArLK6CgWke1JINlsxZ-mfPFHmNBTIrgA~NOhoGZIOAjXIYz6aiyBav3V22n5pbY8S8L-XYrV3Kq-MdSsm5YNt6W7Bca8jYkUk3O2Qs6N-L9xwjIyIhPOyoXO8w1oJ1MGq7uK86F0A72d15xVwih73lNEFE8CeXmlGx-zU38vhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/131a/e7ae/73fa4a5a5fc704fc03238e8f209dfa3c?Expires=1692576000&Signature=LquxRz1GCCxVl0WEbKzlsl85K5f53F4xMnZFodHP4uvc76aKXR0xB7LSxWqNIc5g1mgORQzTrztAdlWP8-Ug2XdL7D7bwk9B92mt5n8ZaB-auAQgLO-LkvfQJ4pYZmxDbIqmoYWrsa8574q~JPDMgUzWCZEfnCOs-PBOqiknxFXU3FtjZ-oAnUu77tZaCe74sCRNPxUDvoN4i2rQOAzZXBd8QlZlhAShgUZUwL49Ju9rlK2V6Y9ssM2bk5e6Li5UA3Q~CLMTPJsJjDJh~8aVxMrxJ6R2Vgj-Uxbx0h8xH2DLvg-LTSMSIyjEbsM70DIXdqwIM9Tkqm9-vpxqqRA9Fg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/78e6/27a6/955235459151c573a6c0c387e1120638?Expires=1692576000&Signature=Bva-ZTdedjs~2hAymA5WB1fIpDqLsgJOLUrmedipyHQqHrvTKo~TTGcPpHBmLPsSBtJQlhKzJxm3E1TDqaGJ8JDCiRvCQYdHH-q~MnhFzPbN-cxLLXgpBfR-cr60m8gtc0RM5E4rKBcIj12EgZEi53WvgQSehLmc4W-apRZSXQjMdYHLnezWUKmddmquAafdIAtOjvTUHTx5ZHF1UxXXRhdLrXaEG1-hDSCbOCSuSiH8KVdnfwB5hHynYwbf-27CIgu8eBuZMGGKlGKe5EpnFlQx7haHMxkQBRcptP2raxFwRPfyWyGH9vx32~hgZ46BJn09VO7Ood1uZKPSaQxbEg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    }, {
      imgSource: 'https://s3-alpha-sig.figma.com/img/e97e/a66a/2a45608bafab46ced800ca01003c3415?Expires=1692576000&Signature=V-05duKg90G23HEHNovixFRXpD5gpMNuJoRdUANPE6FfaEvS4jIWTP3UW7BZ5Urt5guRf3Hc~pho7ATawj8-UB63Mwbctm8-on4Wx0x6-UmRHszy0CpZvSd6tl9mGj3Q7eR9rRN9uCcknoPFGUayxLtrijJLB8FzMI~R7mO2te3aArLK6CgWke1JINlsxZ-mfPFHmNBTIrgA~NOhoGZIOAjXIYz6aiyBav3V22n5pbY8S8L-XYrV3Kq-MdSsm5YNt6W7Bca8jYkUk3O2Qs6N-L9xwjIyIhPOyoXO8w1oJ1MGq7uK86F0A72d15xVwih73lNEFE8CeXmlGx-zU38vhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
      heading: 'Deep Clean AC Service',
      amount: 399,
    },
  ];

  constructor(
    private dialog: MatDialog
  ) { }

  openAddNewServiceDialog() {
    const dialogRef = this.dialog.open(AddNewServiceDialogComponent);
  }

  openEditServiceDialog() {
    const dialogRef = this.dialog.open(EditServiceDialogComponent);
  }
}
