'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MedHeader } from '@/components/med-header';
import { ProtectedRoute } from '@/lib/protected-route';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { LogOut, Upload } from 'lucide-react';

export function VendorPortalContent() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // State quản lý form thêm mới
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    unit: '',
    quantity: 0
  });
  
  // State lưu trữ số lượng tồn kho của các vật tư y tế
  const [inventoryValues, setInventoryValues] = useState<Record<string, number>>({
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

  // Chuyển inventoryData thành State để có thể thêm mới
  const [inventoryData, setInventoryData] = useState([
    { id: 'insulin', name: 'Insulin Mix 30/70', category: 'Thuốc Mạn Tính', unit: 'Lọ', key: 'insulin' },
    { id: 'paracetamol', name: 'Paracetamol 500mg', category: 'Thuốc Thiết Yếu', unit: 'Hộp', key: 'paracetamol' },
    { id: 'cloramin', name: 'Cloramin B', category: 'Sát Khuẩn Nước', unit: 'Kg', key: 'cloramin' },
    { id: 'alcohol', name: 'Cồn y tế 70 độ', category: 'Sát Khuẩn Ngoại Khoa', unit: 'Chai 500ml', key: 'alcohol' },
    { id: 'saline', name: 'Nước muối sinh lý 0.9%', category: 'Dịch Truyền/Rửa', unit: 'Chai 500ml', key: 'saline' },
    { id: 'gauze', name: 'Bông băng sơ cứu', category: 'Sơ Cứu Cấp Bách', unit: 'Bộ', key: 'gauze' },
    { id: 'firstaid', name: 'Bộ kit cấp cứu thảm họa', category: 'Sơ Cứu Cấp Bách', unit: 'Bộ', key: 'firstaid' },
    { id: 'mask', name: 'Khẩu trang y tế N95', category: 'Vật Tư Tiêu Hao', unit: 'Thùng', key: 'mask' },
    { id: 'gloves', name: 'Găng tay vô khuẩn', category: 'Vật Tư Tiêu Hao', unit: 'Hộp', key: 'gloves' },
  ]);

  const toggleItemSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      alert(`Đã tải lên file: ${file.name}`);
    }
  };

  // Hàm xử lý khi bấm nút "Lưu Vật Tư"
  const handleAddNewItem = () => {
    if (!newItem.name || !newItem.category || !newItem.unit) {
      alert("Vui lòng nhập đủ thông tin (Tên, Phân loại, Đơn vị)");
      return;
    }

    // Tạo key ngẫu nhiên an toàn để tránh trùng lặp
    const newKey = `item_${Date.now()}`;
    
    // 1. Thêm vào danh sách data
    setInventoryData(prev => [
      ...prev, 
      {
        id: newKey,
        name: newItem.name,
        category: newItem.category,
        unit: newItem.unit,
        key: newKey
      }
    ]);

    // 2. Thêm số lượng tồn kho tương ứng vào inventoryValues
    setInventoryValues(prev => ({
      ...prev,
      [newKey]: newItem.quantity
    }));

    // 3. Reset form và đóng Modal
    setNewItem({ name: '', category: '', unit: '', quantity: 0 });
    setIsAddModalOpen(false);
  };

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
                
                {/* Dialog Thêm Vật Tư Mới */}
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">Thêm Vật Tư Mới</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Thêm Vật Tư Y Tế</DialogTitle>
                      <DialogDescription>
                        Nhập thông tin chi tiết của vật tư mới để thêm vào kho.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Tên Vật Tư</label>
                        <Input 
                          className="col-span-3" 
                          placeholder="VD: Paracetamol 500mg"
                          value={newItem.name}
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Phân Loại</label>
                        <Input 
                          className="col-span-3" 
                          placeholder="VD: Thuốc Thiết Yếu"
                          value={newItem.category}
                          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Số Lượng</label>
                        <Input 
                          type="number"
                          className="col-span-3" 
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Đơn Vị</label>
                        <Input 
                          className="col-span-3" 
                          placeholder="VD: Hộp, Lọ, Viên"
                          value={newItem.unit}
                          onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Hủy</Button>
                      <Button onClick={handleAddNewItem} className="bg-blue-600 hover:bg-blue-700">Lưu Vật Tư</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
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
                          value={inventoryValues[item.key] ?? 0}
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