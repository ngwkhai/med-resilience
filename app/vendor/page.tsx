'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MedHeader } from '@/components/med-header';
import { Upload, Plus } from 'lucide-react';

type InventoryKeys = 'insulin' | 'cloramin' | 'gauze' | 'paracetamol' | 'mask' | 'alcohol' | 'gloves' | 'saline' | 'firstaid';

function VendorPortalContent() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  const [inventoryValues, setInventoryValues] = useState<Record<InventoryKeys, number>>({
    insulin: 150,
    cloramin: 50,
    gauze: 300,
    paracetamol: 500,
    mask: 200,
    alcohol: 50,
    gloves: 150,
    saline: 400,
    firstaid: 20,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleItemSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      alert(`Hệ thống đang xử lý file: ${file.name}`);
    }
  };

  const inventoryData: { id: string, name: string, category: string, unit: string, key: InventoryKeys }[] = [
    { id: 'insulin', name: 'Insulin Mix 30/70', category: 'Thuốc Mạn Tính', unit: 'Lọ', key: 'insulin' },
    { id: 'paracetamol', name: 'Paracetamol 500mg', category: 'Thuốc Thiết Yếu', unit: 'Hộp', key: 'paracetamol' },
    { id: 'cloramin', name: 'Cloramin B', category: 'Sát Khuẩn Nước', unit: 'Kg', key: 'cloramin' },
    { id: 'alcohol', name: 'Cồn y tế 70 độ', category: 'Sát Khuẩn Ngoại Khoa', unit: 'Chai 500ml', key: 'alcohol' },
    { id: 'saline', name: 'Nước muối sinh lý 0.9%', category: 'Dịch Truyền/Rửa', unit: 'Chai 500ml', key: 'saline' },
    { id: 'gauze', name: 'Bông băng sơ cứu', category: 'Sơ Cứu Cấp Bách', unit: 'Bộ', key: 'gauze' },
    { id: 'firstaid', name: 'Bộ kit cấp cứu thảm họa', category: 'Sơ Cứu Cấp Bách', unit: 'Bộ', key: 'firstaid' },
    { id: 'mask', name: 'Khẩu trang y tế N95', category: 'Vật Tư Tiêu Hao', unit: 'Thùng', key: 'mask' },
    { id: 'gloves', name: 'Găng tay vô khuẩn', category: 'Vật Tư Tiêu Hao', unit: 'Hộp', key: 'gloves' },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <MedHeader title="Med-Resilience+" />

      {/* Tối ưu padding cho mobile */}
      <div className="max-w-7xl mx-auto p-3 md:p-6">
        <Card className="shadow-md">
          {/* Header: Chuyển sang xếp dọc (flex-col) trên mobile, xếp ngang (md:flex-row) trên desktop */}
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-6">
            <div className="w-full">
              <CardTitle className="text-xl md:text-2xl font-bold text-blue-900">Kho Nhà Thuốc Long Châu</CardTitle>
              <CardDescription className="text-sm">Cập nhật số lượng vật tư sẵn sàng</CardDescription>
            </div>
            
            {/* Các nút bấm: Kéo dài full-width trên mobile để dễ bấm */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto mt-2 md:mt-0">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 h-11 md:h-10">
                <Plus className="w-4 h-4 mr-2" /> Thêm Vật Tư
              </Button>
              <Button asChild className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 cursor-pointer h-11 md:h-10">
                <label htmlFor="excel-upload" className="flex items-center justify-center w-full">
                  <Upload className="w-4 h-4 mr-2" /> Upload Excel
                </label>
              </Button>
              <input type="file" id="excel-upload" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleFileUpload} />
            </div>
          </CardHeader>
          
          {/* Padding Content: Bỏ padding 2 bên trên mobile (p-0) để bảng tràn viền rộng hơn */}
          <CardContent className="p-0 md:p-6 md:pt-0">
            <div className="overflow-x-auto border-y md:border rounded-none md:rounded-xl">
              {/* min-w-[700px] bắt buộc bảng phải đủ độ rộng, ép mobile phải cuộn ngang thay vì bóp méo chữ */}
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="w-12 text-center whitespace-nowrap pl-4">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="font-bold whitespace-nowrap">Tên Vật Tư</TableHead>
                    <TableHead className="font-bold whitespace-nowrap">Phân Loại</TableHead>
                    <TableHead className="font-bold text-center whitespace-nowrap">Tồn Kho</TableHead>
                    <TableHead className="font-bold whitespace-nowrap">Đơn Vị</TableHead>
                    <TableHead className="font-bold whitespace-nowrap pr-4">Trạng Thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-blue-50/50 transition-colors">
                      <TableCell className="text-center pl-4">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItemSelect(item.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-slate-900 whitespace-nowrap">{item.name}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className="bg-white">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Input
                          type="number"
                          value={inventoryValues[item.key]}
                          onChange={(e) =>
                            setInventoryValues(prev => ({
                              ...prev,
                              [item.key]: parseInt(e.target.value) || 0,
                            }))
                          }
                          // Tăng font text-base để iOS không tự động zoom in khi focus vào input
                          className="w-24 mx-auto text-center border-blue-200 focus:border-blue-500 text-base"
                        />
                      </TableCell>
                      <TableCell className="text-slate-600 whitespace-nowrap">{item.unit}</TableCell>
                      <TableCell className="whitespace-nowrap pr-4">
                        {inventoryValues[item.key] > 0 ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Còn hàng</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Hết hàng</Badge>
                        )}
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
  );
}

export default VendorPortalContent;