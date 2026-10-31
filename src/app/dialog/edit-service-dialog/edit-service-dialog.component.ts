import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Data{
  image:string,
  serviceName:string,
  description:string,
  category:string,
  amount:string,
  jobs:string
}

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.scss']
})
export class EditServiceDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditServiceDialogComponent>
  ) { }

  data:Data = {
    image:'https://s3-alpha-sig.figma.com/img/e1df/1785/d29db12083eed29b122eececb91e0114?Expires=1692576000&Signature=Et1~3DHkvpFrHdg2Asbb5dFW9R-77yBzYfFPKWbslg6wCOnx2RgpIuDrl2RArQCfY~AttS49uTooco92GOlFUdT9dqipMm4dctFqKOszkT84zzl0wxGAtemlvIFx6QJoqHGpe79QZ0LIlRDIJ3B4j7S4TiLFfb7vedMQCavO-zmlqiCOpB8xaiQIVeMyvP8~5BgXq5Km5GaqRGlmoevkmzVrbcWtPAFGrYGmtGl~RCnxN5YOOlmGLGtAedRrYdu821845u6E7CdXGcpg38f6AVB3vgdmcOKkenF828s0bNxlr-hmWavWyUQb3GolJA46dvCLGYCa6yswvxFZlGlRlA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    serviceName:'Ac Service',
    description:`Time duration-60 to 70 min,
    Time frequency-4 to 5 months,
    Covered-Mesh and filter deep clean,
    Exterior cleaning.`,
    category:'Ac Service',
    amount:'₹614',
    jobs:'Percentage'
  };

  closeDialog() {
    this.dialogRef.close();
  }
}
