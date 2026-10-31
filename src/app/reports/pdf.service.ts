import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  export(
    jsonData: any,
    fileName: string,
    orientation: 'portrait' | 'landscape' = 'portrait',
    format: 'a2' | 'a3' | 'a4' = 'a4'
  ): void {
    const doc = new jsPDF({
      orientation,
      format,
    });
    const columns = Object.keys(jsonData[0]);
    const data = jsonData.map((row: any) => Object.values(row));
    (doc as any).autoTable({
      head: [columns],
      body: data,
    });
    doc.save(`${fileName}.pdf`);
  }
}
