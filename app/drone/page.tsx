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

        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-slate-950 text-white rounded-lg p-6 space-y-6">
            {/* Camera Feed & Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Camera Feed */}
              <div className="lg:col-span-2">
                <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                  <div className="relative h-96 bg-slate-800 flex items-center justify-center">
                    {/* Thermal image feed */}
                    <img
                      src="/thermal-drone.jpg"
                      alt="Thermal drone camera feed"
                      className="object-contain w-full h-full"
                    />
                    {/* HUD Elements */}
                    <div className="absolute top-4 left-4 text-xs text-green-400 font-mono">CAMERA FEED</div>
                    <div className="absolute top-4 right-4 text-xs text-green-400 font-mono">REC 02:45</div>
                  </div>
                </div>
              </div>

              {/* Telemetry & Controls */}
              <div className="space-y-4">
                {/* Flight Data Cards */}
                <Card className="bg-slate-900 border-slate-700 text-white">
                  <CardContent className="pt-4 space-y-3 text-sm font-mono">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Độ Cao</span>
                      <span className="text-white">45m</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-700 pt-2">
                      <span className="text-green-400">Tốc Độ Gió</span>
                      <span className="text-white">15 km/h</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-700 pt-2">
                      <span className="text-green-400 flex items-center gap-2"><Battery className="w-4 h-4" /> Pin</span>
                      <span className="text-orange-400">68% (18 phút)</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-700 pt-2">
                      <span className="text-green-400 flex items-center gap-2"><Radio className="w-4 h-4" /> Tọa Độ</span>
                      <span className="text-white text-xs">10.7412, 106.7115</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
                    <Zap className="w-4 h-4 mr-2" />
                    Thả Vật Tư Y Tế Tự Động
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    Báo Tọa Độ Về Tháp Triage
                  </Button>
                  <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white border border-slate-500 font-bold py-3">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Phát Loa Thông Báo Cứu Hộ
                  </Button>
                </div>
              </div>
            </div>

            {/* Flight Log Table */}
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-green-400">Nhật Ký Hoạt Động Drone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2 text-green-400">Thời Gian</th>
                        <th className="text-left py-2 text-green-400">Sự Kiện</th>
                        <th className="text-left py-2 text-green-400">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700">
                        <td className="py-2">14:23:45</td>
                        <td>Phát hiện người tại Q7-001</td>
                        <td className="text-green-400">✓ THÀNH CÔNG</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-2">14:12:30</td>
                        <td>Thả túi Y Tế (Khối A-15)</td>
                        <td className="text-green-400">✓ THÀNH CÔNG</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-2">14:01:15</td>
                        <td>Cất cánh từ Tháp Sở Chỉ Huy</td>
                        <td className="text-green-400">✓ THÀNH CÔNG</td>
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
      <div className="flex flex-col min-h-screen">
        <DroneControlContent />
      </div>
    );
  }
