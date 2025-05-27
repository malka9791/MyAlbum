import { Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chart',
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  constructor(private AuthService: AuthService) {}
  view: [number, number] = [950, 500];

  chartData: any[] = [];

  gradient = false;
  showXAxis = true;
  showYAxis = true;
  legend = true;
  showXAxisLabel = true;
  xAxisLabel = 'חודש';
  showYAxisLabel = true;
  yAxisLabel = 'כמות';
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#e93345', '#d0d0d0', '#0088cc'],
  };

  months = [
    { key: '01', label: 'ינואר' },
    { key: '02', label: 'פברואר' },
    { key: '03', label: 'מרץ' },
    { key: '04', label: 'אפריל' },
    { key: '05', label: 'מאי' },
    { key: '06', label: 'יוני' },
    { key: '07', label: 'יולי' },
    { key: '08', label: 'אוגוסט' },
    { key: '09', label: 'ספטמבר' },
    { key: '10', label: 'אוקטובר' },
    { key: '11', label: 'נובמבר' },
    { key: '12', label: 'דצמבר' },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const [users, images] = await Promise.all([
      this.AuthService.getUsers(),
      this.AuthService.getImages(),
    ]);

    const monthlyMap: Record<string, { users: number; images: number }> = {};

    // אתחול מראש לכל החודשים
    this.months.forEach(({ key }) => {
      monthlyMap[key] = { users: 0, images: 0 };
    });

    // ספירה של משתמשים לפי חודש
    users.forEach((user) => {
      const month = dayjs(user.createdAt).format('MM');
      if (monthlyMap[month]) {
        monthlyMap[month].users++;
      }
    });

    // ספירה של תמונות לפי חודש
    images.forEach((img) => {
      const month = dayjs(img.CreatedAt).format('MM');
      if (monthlyMap[month]) {
        monthlyMap[month].images++;
      }
    });

    // יצירת chartData לתצוגה
    this.chartData = this.months.map(({ key, label }) => ({
      name: label,
      series: [
        { name: 'משתמשים חדשים', value: monthlyMap[key].users },
        { name: 'תמונות שהועלו', value: monthlyMap[key].images },
      ],
    }));
  }
}
