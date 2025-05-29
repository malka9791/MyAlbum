import { Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-chart',
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  view: [number, number] = [950, 500];

  chartData: any[] = [];

  gradient = false;
  showXAxis = true;
  showYAxis = true;
  legend = true;
  showXAxisLabel = true;
  xAxisLabel = 'month';
  showYAxisLabel = true;
  yAxisLabel = 'amount Of New';
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#e93345', '#d0d0d0', '#0088cc'],
  };

  months = [
    { key: '01', label: 'Jan' },
    { key: '02', label: 'Feb' },
    { key: '03', label: 'Mar' },
    { key: '04', label: 'Apr' },
    { key: '05', label: 'May' },
    { key: '06', label: 'Jun' },
    { key: '07', label: 'Jul' },
    { key: '08', label: 'Aug' },
    { key: '09', label: 'Sep' },
    { key: '10', label: 'Oct' },
    { key: '11', label: 'Nov' },
    { key: '12', label: 'Dec' },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const [users, images] = await Promise.all([
      this.userService.getUsers(),
      this.authService.getImages(),
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
        { name: 'New Users ', value: monthlyMap[key].users },
        { name: 'Uploaded photos', value: monthlyMap[key].images },
      ],
    }));
  }
}
