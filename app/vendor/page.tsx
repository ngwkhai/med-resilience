'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MedHeader } from '@/components/med-header';
import { ProtectedRoute } from '@/lib/protected-route';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { LogOut, Upload } from 'lucide-react';

function VendorPortalContent() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // State lưu trữ số lượng tồn kho của các vật tư y tế
  const [inventoryValues, setInventoryValues] = useState({
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

  const toggleItemSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Logic đọc file Excel
      console.log('File uploaded:', file.name);
      alert(`Đã tải lên file: ${file.name}`);
    }
  };

  // Danh sách Vật tư y tế mở rộng
  const inventoryData = [
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

  return (
    <div className="min-h-screen bg-slate-50">
      <MedHeader title="Med-Resilience+" />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Kho Nhà Thuốc Long Châu</CardTitle>
            <CardDescription>Quản lý tồn kho vật tư y tế</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">Thêm Vật Tư Mới</Button>
                
                {/* Nút Upload Excel */}
                <div>
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
                    <label htmlFor="excel-upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Excel
                    </label>
                  </Button>
                  <Input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    className="hidden"
                    id="excel-upload"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              
              
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto border rounded-lg mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100">
                    <TableHead className="w-8">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Tên Vật Tư</TableHead>
                    <TableHead>Phân Loại Nhóm Y Tế</TableHead>
                    <TableHead>Số Lượng Tồn Kho</TableHead>
                    <TableHead>Đơn Vị</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItemSelect(item.id)}
                        />
                      </TableCell>
                      <TableCell className="font-semibold">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={inventoryValues[item.key as keyof typeof inventoryValues] || 0}
                          onChange={(e) =>
                            setInventoryValues({
                              ...inventoryValues,
                              [item.key]: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>{item.unit}</TableCell>
                      
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

export default function VendorPortalPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/auth/vendor-login');
  };

  return (
    <ProtectedRoute requiredRoles="vendor" redirectTo="/auth/vendor-login">
      <div className="flex flex-col min-h-screen">
        <div className="absolute top-4 right-4 z-50">
          <Button
            onClick={handleLogout}
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Đăng Xuất
          </Button>
        </div>
        <VendorPortalContent />
      </div>
    </ProtectedRoute>
  );
}