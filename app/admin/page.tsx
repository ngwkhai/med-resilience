'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Droplets, Navigation, Radio, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MedHeader } from '@/components/med-header';

type InventoryKeys = 'insulin' | 'paracetamol' | 'cloramin' | 'alcohol' | 'saline' | 'gauze' | 'firstaid' | 'mask' | 'gloves';

const inventoryData: { id: string, name: string, category: string, unit: string, key: InventoryKeys, quantity: number }[] = [
  { id: 'insulin', name: 'Insulin Mix 30/70', category: 'Thuốc Mạn Tính', unit: 'Lọ', key: 'insulin', quantity: 150 },
  { id: 'paracetamol', name: 'Paracetamol 500mg', category: 'Thuốc Thiết Yếu', unit: 'Hộp', key: 'paracetamol', quantity: 500 },
  { id: 'cloramin', name: 'Cloramin B', category: 'Sát Khuẩn Nước', unit: 'Kg', key: 'cloramin', quantity: 50 },
  { id: 'alcohol', name: 'Cồn y tế 70 độ', category: 'Sát Khuẩn Ngoại Khoa', unit: 'Chai 500ml', key: 'alcohol', quantity: 200 },
  { id: 'saline', name: 'Nước muối sinh lý 0.9%', category: 'Dịch Truyền/Rửa', unit: 'Chai 500ml', key: 'saline', quantity: 300 },
  { id: 'gauze', name: 'Bông băng sơ cứu', category: 'Sơ Cứu Cấp Bách', unit: 'Bộ', key: 'gauze', quantity: 120 },
  { id: 'firstaid', name: 'Bộ kit cấp cứu thảm họa', category: 'Sơ Cứu Cấp Bách', unit: 'Bộ', key: 'firstaid', quantity: 45 },
  { id: 'mask', name: 'Khẩu trang y tế N95', category: 'Vật Tư Tiêu Hao', unit: 'Thùng', key: 'mask', quantity: 80 },
  { id: 'gloves', name: 'Găng tay vô khuẩn', category: 'Vật Tư Tiêu Hao', unit: 'Hộp', key: 'gloves', quantity: 250 },
];

const generateRandomCitizen = () => {
  const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng'];
  const middleNames = ['Văn', 'Thị', 'Hoàng', 'Thanh', 'Minh', 'Ngọc', 'Hải', 'Xuân', 'Đức', 'Thu'];
  const lastNames = ['An', 'Bích', 'Hải', 'Lan', 'Nam', 'Hương', 'Hùng', 'Oanh', 'Dũng', 'Linh'];
  const wards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  
  const id = Math.random().toString(36).substring(2, 7).toUpperCase();
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${middleNames[Math.floor(Math.random() * middleNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const address = `Phường ${wards[Math.floor(Math.random() * wards.length)]}, Quận 8, TPHCM`;
  const phone = `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
  const voucher = `EV-Q8-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  return { id, name, address, phone, voucher };
};

const initialCitizens = [
  { id: 'CD-001', name: 'Nguyễn Văn An', address: 'Phường 5, Quận 8, TPHCM', phone: '0901234567', voucher: 'EV-Q8-9A2B' },
  { id: 'CD-002', name: 'Trần Thị Bích', address: 'Phường 14, Quận 8, TPHCM', phone: '0912345678', voucher: 'EV-Q8-4C5D' },
  { id: 'CD-003', name: 'Lê Hoàng Hải', address: 'Phường 1, Quận 8, TPHCM', phone: '0923456789', voucher: 'EV-Q8-7E8F' },
  { id: 'CD-004', name: 'Phạm Mai Lan', address: 'Phường 16, Quận 8, TPHCM', phone: '0934567890', voucher: 'EV-Q8-1G2H' },
];

export default function AdminPage() {
  const [citizens, setCitizens] = useState(initialCitizens);

  useEffect(() => {
    const interval = setInterval(() => {
      setCitizens((prevCitizens) => {
        const newCitizens = [...prevCitizens.slice(1), generateRandomCitizen()];
        return newCitizens;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MedHeader title="Hệ Thống Giám Sát Cứu Trợ" />

      {/* Padding giảm nhẹ trên mobile (px-3 py-4) và tăng trên desktop (md:px-6 md:py-6) */}
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6 space-y-4 md:space-y-8 w-full">
        
        {/* Bản đồ Ngập lụt & Drone */}
        <Card className="border-slate-300 shadow-md">
          {/* Header chuyển thành flex-col trên mobile để không đè lên nhau */}
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-2 md:gap-0">
            <CardTitle className="text-lg md:text-xl flex items-center gap-2">
              <Radio className="w-5 h-5 md:w-6 md:h-6 text-blue-600 animate-pulse" />
              Bản đồ Quận 8
            </CardTitle>
            
            {/* Thu nhỏ chữ legend trên mobile */}
            <div className="flex gap-3 md:gap-4 text-xs md:text-sm font-medium">
              <div className="flex items-center gap-1"><Navigation className="w-3 h-3 md:w-4 md:h-4 text-slate-800" /> Drone đang bay</div>
            </div>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            {/* Chiều cao bản đồ: 300px trên mobile, 500px trên desktop */}
            <div className="relative w-full h-[300px] md:h-[500px] bg-slate-200 rounded-lg border border-slate-300 overflow-hidden shadow-inner select-none">
              <div className="absolute inset-0 z-10"></div>
              <iframe
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.5912%2C10.7078%2C106.6835%2C10.7615&amp;layer=mapnik"
                className="absolute z-0 opacity-80 pointer-events-none"
                style={{ 
                  width: 'calc(100% + 100px)', 
                  height: 'calc(100% + 100px)', 
                  left: '-50px', 
                  top: '-50px' 
                }}
              ></iframe>
              
              {/* Overlays thu nhỏ tỉ lệ một chút để vừa khung hình mobile */}
              <div className="absolute top-[20%] left-[30%] w-40 md:w-64 h-32 md:h-48 bg-red-500/40 blur-xl rounded-full z-20 animate-pulse mix-blend-multiply pointer-events-none"></div>
              <div className="absolute top-[50%] right-[20%] w-56 md:w-80 h-40 md:h-56 bg-orange-500/40 blur-2xl rounded-full z-20 mix-blend-multiply pointer-events-none"></div>
              <div className="absolute bottom-[10%] left-[10%] w-32 md:w-56 h-24 md:h-32 bg-red-500/30 blur-xl rounded-full z-20 mix-blend-multiply pointer-events-none"></div>

              <div className="absolute top-[25%] left-[35%] z-30 flex flex-col items-center gap-1 pointer-events-none">
                <span className="text-[8px] md:text-[10px] font-bold bg-white/80 px-1 rounded shadow-sm">Drone Alpha</span>
                <Navigation className="w-5 h-5 md:w-6 md:h-6 text-slate-800 fill-slate-800 -rotate-45" />
              </div>

              <div className="absolute top-[60%] right-[25%] z-30 flex flex-col items-center gap-1 pointer-events-none">
                <span className="text-[8px] md:text-[10px] font-bold bg-white/80 px-1 rounded shadow-sm">Drone Beta</span>
                <Navigation className="w-5 h-5 md:w-6 md:h-6 text-slate-800 fill-slate-800 rotate-90" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hai bảng dữ liệu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          
          {/* Bảng Danh sách AI */}
          <Card className="border-blue-300 shadow-md ring-1 ring-blue-500/20">
            {/* Header chuyển thành flex-col trên màn hình quá nhỏ */}
            <CardHeader className="bg-blue-50/50 border-b border-blue-100 p-4 md:p-6 md:pb-3">
              <CardTitle className="text-base md:text-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-2 text-blue-800">
                  <Cpu className="w-5 h-5 animate-pulse text-blue-600" />
                  AI Tự Động Phân Bổ E-Voucher
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 animate-pulse whitespace-nowrap">
                  Đang xử lý Real-time...
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Thêm overflow-x-auto để bảng có thể cuộn ngang trên mobile thay vì bị bóp méo */}
              <div className="overflow-x-auto overflow-y-hidden h-[300px]">
                <Table className="min-w-[500px] md:min-w-full">
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="pl-4 md:pl-6">Họ & Tên</TableHead>
                      <TableHead>Địa Chỉ</TableHead>
                      <TableHead>Mã Cấp Phát</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {citizens.map((citizen, index) => (
                      <TableRow 
                        key={citizen.id} 
                        className={`
                          transition-all duration-500 ease-in-out border-b border-slate-100
                          ${index === 0 ? 'opacity-40 -translate-y-2' : ''} 
                          ${index === citizens.length - 1 ? 'bg-blue-50/30' : 'hover:bg-slate-50'}
                        `}
                      >
                        {/* whitespace-nowrap giúp text không bị rớt dòng lộn xộn */}
                        <TableCell className="pl-4 md:pl-6 font-semibold text-slate-800 py-3 whitespace-nowrap">
                          {citizen.name}
                          <div className="text-xs text-slate-500 font-normal">{citizen.phone}</div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 max-w-[150px] md:max-w-[200px] truncate" title={citizen.address}>
                          {citizen.address}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono bg-white text-blue-700 border-blue-200 shadow-sm whitespace-nowrap">
                            {citizen.voucher}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Bảng Tổng hợp Vật tư Y tế */}
          <Card className="border-slate-300 shadow-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <Droplets className="w-5 h-5 text-emerald-600" />
                Kho Vật Tư Y Tế
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:p-6 md:pt-0">
              {/* Cho phép cuộn ngang (overflow-x-auto) trên mobile */}
              <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                <Table className="min-w-[400px] md:min-w-full">
                  <TableHeader className="sticky top-0 bg-slate-100 shadow-sm z-10">
                    <TableRow>
                      <TableHead className="pl-4 md:pl-2 whitespace-nowrap">Tên Vật Tư</TableHead>
                      <TableHead className="whitespace-nowrap">Phân Loại</TableHead>
                      <TableHead className="text-right pr-4 md:pr-2 whitespace-nowrap">Tồn Kho</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.map((item) => (
                      <TableRow key={item.key} className="hover:bg-slate-50">
                        <TableCell className="font-medium text-slate-800 pl-4 md:pl-2 whitespace-nowrap">
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs bg-slate-200 text-slate-700 whitespace-nowrap">
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600 text-right pr-4 md:pr-2 whitespace-nowrap">
                          {item.quantity} <span className="text-xs text-slate-500 font-normal">{item.unit}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}