import { Injectable } from "@angular/core";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

@Injectable({
  providedIn: "root",
})
export class BookingInvoiceService {
  toProperCase = (text: string) => {
    return text.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  roundOff(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  public async downloadInvoice(currentBookingData: any) {
    console.log(currentBookingData);
    const doc = new jsPDF({ filters: ["ASCIIHexEncode"] });
    autoTable(doc, {
      body: [
        [
          {
            content: "Greno Dryclean",
            styles: {
              halign: "left",
              fontSize: 20,
              textColor: "#ffffff",
            },
          },
          {
            content: "Invoice",
            styles: {
              halign: "right",
              fontSize: 20,
              textColor: "#ffffff",
            },
          },
        ],
      ],
      theme: "plain",
      styles: {
        fillColor: "#054BAE",
      },
    });
    autoTable(doc, {
      body: [
        [
          {
            content: "GSTN: 09IXVPK0011F1ZE",
            styles: {
              halign: "left",
              fontSize: 13,
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      body: [
        [
          {
            content:
              "From:" +
              "\n Greno Dryclean" +
              "\n Shakuntalam Tower," +
              "\n Salig Ganj Road," +
              "\n Mutthi Ganj," +
              "\n (Near Post Office Mutthiganj)," +
              "\n PRAYAGRAJ, UP -211003" +
              "\n India",
            styles: {
              halign: "left",
            },
          },
          {
            content:
              "Reference: #" +
              currentBookingData?.id +
              "\n Date: " +
              new Date(
                currentBookingData?.deliveryTime?.seconds * 1000
              ).toLocaleString(),
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              "To:" +
              "\n " +
              currentBookingData.currentUser.name +
              "\n " +
              currentBookingData.currentUser.phoneNumber +
              "\n " +
              currentBookingData.address.formatted_address,

            styles: {
              halign: "left",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Products & Services",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    for (const service of currentBookingData.services) {
      autoTable(doc, {
        body: [
          [
            {
              content: this.toProperCase(service.name),
              styles: {
                halign: "left",
                fontSize: 12,
              },
            },
          ],
        ],
        theme: "plain",
      });
      autoTable(doc, {
        head: [["Item", "Quantity", "Price"]],
        body: [
          ...service.selectedItems.map((item: any) => [
            item.name,
            item.quantity,
            item.cost,
          ]),
        ],
        theme: "striped",
        headStyles: {
          fillColor: "#054BAE",
        },
      });
    }

    const fixedCharges: any[] = [];
    currentBookingData.billing &&
      currentBookingData.billing.fixedCharges &&
      currentBookingData.billing.fixedCharges.map((item: any) => {
        fixedCharges.push([
          {
            content: `${item.name}:`,
            styles: {
              halign: "right",
            },
          },
          {
            content: "INR " + this.roundOff(item.amount),
            styles: {
              halign: "right",
            },
          },
        ]);
      });

    autoTable(doc, {
      body: [
        [
          {
            content: "Subtotal:",
            styles: {
              halign: "right",
            },
          },
          {
            content:
              "INR " + this.roundOff(currentBookingData?.billing.subTotal),
            styles: {
              halign: "right",
            },
          },
        ],
        [
          {
            content: "Discount:",
            styles: {
              halign: "right",
            },
          },
          {
            content:
              "INR " + this.roundOff(currentBookingData?.billing.discount),
            styles: {
              halign: "right",
            },
          },
        ],
        [
          {
            content: "Tax: ",
            styles: {
              halign: "right",
            },
          },
          {
            content: "INR " + this.roundOff(currentBookingData?.billing.tax),
            styles: {
              halign: "right",
            },
          },
        ],
        ...fixedCharges,
        [
          {
            content: "Total amount:",
            styles: {
              halign: "right",
            },
          },
          {
            content:
              "INR " + this.roundOff(currentBookingData?.billing.grandTotal),
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Terms & notes",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
        [
          {
            content:
              "The mentioned billing is final and non-negotiable. " +
              "This bill is auto generated by system and does not require any signature. " +
              "Please contact us if you have any query and we will be happy to help you.",
            styles: {
              halign: "left",
            },
          },
        ],
      ],
      theme: "plain",
    });

    return doc.save(`Invoice_${currentBookingData.id}`);
  }
}
