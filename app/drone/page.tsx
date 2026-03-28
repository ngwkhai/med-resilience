'use client';

import React from 'react';
import { AlertCircle, Zap, MapPin, Battery, Radio, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MedHeader } from '@/components/med-header';

function DroneControlContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      <MedHeader title="Med-Resilience+" />

      {/* Tối ưu padding cho mobile (p-3) và desktop (md:p-6) */}
      <div className="max-w-7xl mx-auto p-3 md:p-6">
        <div className="bg-slate-950 text-white rounded-xl p-3 md:p-6 space-y-4 md:space-y-6 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            
            {/* Camera Feed */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden relative">
                {/* Chiều cao giảm xuống h-56 (224px) trên mobile để chừa không gian cho nút bấm */}
                <div className="relative h-56 sm:h-72 md:h-96 bg-black flex items-center justify-center">
                  <img
                    src="/thermal-drone.jpg"
                    alt="Thermal drone camera feed"
                    className="object-cover md:object-contain w-full h-full opacity-80"
                  />
                  {/* Căn giữa chữ HUD giả lập */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-12 h-12 border-2 border-green-500/30 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                     </div>
                  </div>
                  {/* HUD Text nhỏ hơn trên mobile */}
                  <div className="absolute top-3 left-3 text-[10px] md:text-xs text-green-400 font-mono">CAM_01_THERMAL</div>
                  <div className="absolute top-3 right-3 text-[10px] md:text-xs text-red-500 font-mono animate-pulse">● REC 02:45</div>
                </div>
              </div>
            </div>

            {/* Telemetry & Controls */}
            <div className="space-y-4 flex flex-col justify-between">
              
              {/* Flight Data Cards: Chuyển thành Grid 2x2 trên mobile để tiết kiệm chiều cao */}
              <Card className="bg-slate-900 border-slate-700 text-white shadow-inner">
                <CardContent className="p-4 grid grid-cols-2 gap-4 text-xs md:text-sm font-mono">
                  <div className="flex flex-col gap-1 border-r border-slate-700/50">
                    <span className="text-green-500">Độ Cao</span>
                    <span className="text-white text-base md:text-lg font-bold">4.2 m</span>
                  </div>
                  <div className="flex flex-col gap-1 pl-2">
                    <span className="text-green-500">Tốc Độ Gió</span>
                    <span className="text-white text-base md:text-lg font-bold">5 km/h</span>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-r border-slate-700/50 pt-3 mt-1">
                    <span className="text-green-500 flex items-center gap-1"><Battery className="w-3 h-3 md:w-4 md:h-4" /> Pin</span>
                    <span className="text-orange-400 font-bold">68% <span className="text-[10px] md:text-xs font-normal text-slate-400">(18p)</span></span>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-slate-700/50 pt-3 mt-1 pl-2">
                    <span className="text-green-500 flex items-center gap-1"><Radio className="w-3 h-3 md:w-4 md:h-4" /> Tọa Độ</span>
                    <span className="text-white text-[10px] md:text-xs tracking-tighter">10.741, 106.711</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons: Đặt cạnh nhau trên mobile để dễ ấn bằng 2 ngón cái */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                <Button className="w-full h-14 md:h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-xs md:text-sm flex-col md:flex-row gap-1 md:gap-2 shadow-lg shadow-green-900/20 active:scale-95 transition-transform">
                  <Zap className="w-5 h-5 md:w-4 md:h-4" />
                  <span>Thả Vật Tư</span>
                </Button>
                <Button className="w-full h-14 md:h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm flex-col md:flex-row gap-1 md:gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-transform">
                  <MapPin className="w-5 h-5 md:w-4 md:h-4" />
                  <span>Báo Tọa Độ</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Flight Log Table */}
          <Card className="bg-slate-900 border-slate-700 text-white">
            <CardHeader className="p-4 md:p-6 pb-2 md:pb-4 border-b border-slate-800">
              <CardTitle className="text-sm md:text-base text-green-400 flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Nhật Ký Hoạt Động
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:p-6 md:pt-0">
              <div className="overflow-x-auto max-h-[200px] md:max-h-full overflow-y-auto">
                <table className="w-full text-[10px] md:text-xs font-mono">
                  <thead className="sticky top-0 bg-slate-900 shadow-sm">
                    <tr>
                      <th className="text-left p-3 text-slate-400 font-normal whitespace-nowrap">Thời Gian</th>
                      <th className="text-left p-3 text-slate-400 font-normal whitespace-nowrap">Sự Kiện</th>
                      <th className="text-left p-3 text-slate-400 font-normal whitespace-nowrap">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 whitespace-nowrap text-slate-300">14:23:45</td>
                      <td className="p-3 whitespace-nowrap">Phát hiện người tại Q7-001</td>
                      <td className="p-3 whitespace-nowrap text-green-400">✓ THÀNH CÔNG</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 whitespace-nowrap text-slate-300">14:12:30</td>
                      <td className="p-3 whitespace-nowrap">Thả túi Y Tế (Khối A-15)</td>
                      <td className="p-3 whitespace-nowrap text-green-400">✓ THÀNH CÔNG</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 whitespace-nowrap text-slate-300">14:01:15</td>
                      <td className="p-3 whitespace-nowrap">Cất cánh từ Tháp Sở Chỉ Huy</td>
                      <td className="p-3 whitespace-nowrap text-green-400">✓ THÀNH CÔNG</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}

export default function DroneControlPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <DroneControlContent />
    </div>
  );
}