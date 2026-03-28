'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Activity, Crosshair, Box } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { MedHeader } from '@/components/med-header';

// Đổi tên thành Page và export default để Next.js nhận diện được trang
export default function AdminPage() {
  // Tránh lỗi Hydration của Recharts trên Next.js
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // KPI Data
  const kpiData = [
    { title: 'Yêu Cầu Khẩn (24h)', value: '142', icon: AlertTriangle, color: 'text-red-500', trend: '+12% so với 1 giờ trước' },
    { title: 'Ca Nguy Kịch (AI Triage >90)', value: '18', icon: Activity, color: 'text-red-500', subtext: 'Đang ưu tiên xử lý' },
    { title: 'Drone Đang Trinh Sát', value: '4', icon: Crosshair, color: 'text-blue-500', subtext: 'Quét khu vực Q7, Q8' },
    { title: 'Kho Vi Mô Sẵn Sàng', value: '8/10', icon: Box, color: 'text-green-500', subtext: 'Sẵn sàng xuất kho chặng cuối' },
  ];

  // Resource Allocation Chart Data
  const resourceData = [
    { name: 'Đội SUP', value: 40 },
    { name: 'Xe bán tải', value: 30 },
    { name: 'Xuồng máy', value: 20 },
    { name: 'Drone', value: 10 },
  ];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6'];

  // AI Triage Table Data
  const triageData = [
    { id: 'YC-001', source: 'Zalo Voice AI', patient: 'Cụ ông 75t neo đơn - Hết thuốc tim mạch', waterLevel: '80cm', aiScore: '98/100', status: 'Điều phối Drone' },
    { id: 'YC-002', source: 'TNV Báo cáo', patient: 'Trại trẻ mồ côi - Cần Cloramin B', waterLevel: '60cm', aiScore: '85/100', status: 'Đội SUP xuất phát' },
    { id: 'YC-003', source: 'Zalo Voice AI', patient: 'Bà ngoại bị tiểu đường - Cần insulin', waterLevel: '90cm', aiScore: '92/100', status: 'Ưu tiên cao' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MedHeader title="Med-Resilience+ (Tháp Điều Khiển)" />

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 w-full">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <Card key={idx} className="border-l-4 border-l-slate-300 hover:shadow-lg transition">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-600">{kpi.title}</CardTitle>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
                  <p className="text-xs text-slate-500 mt-2">{kpi.trend || kpi.subtext}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Map & Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Bản đồ Nhiệt & Điều Phối Thực Địa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-80 bg-gradient-to-br from-blue-100 to-slate-100 rounded-lg border border-slate-300 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                <div className="absolute top-12 left-16 text-green-500 text-2xl">✚</div>
                <div className="absolute top-20 right-12 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Phân Bổ Nguồn Lực</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center h-[300px]">
              {/* Chỉ render Chart khi đã mount ở Client để tránh lỗi Vercel Build */}
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={resourceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {resourceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Triage Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ma Trận Triage AI (Ưu Tiên Cấp Bách)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100">
                    <TableHead>Mã YC</TableHead>
                    <TableHead>Nguồn</TableHead>
                    <TableHead>Bệnh Nhân</TableHead>
                    <TableHead>Mức Ngập</TableHead>
                    <TableHead>Điểm AI</TableHead>
                    <TableHead>Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {triageData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold">{row.id}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{row.source}</Badge></TableCell>
                      <TableCell className="text-sm">{row.patient}</TableCell>
                      <TableCell>{row.waterLevel}</TableCell>
                      <TableCell><Badge className="bg-red-500 text-white">{row.aiScore}</Badge></TableCell>
                      <TableCell><Button size="sm" className="bg-blue-600 text-xs">{row.status}</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}