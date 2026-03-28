import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RoleSelectorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Chọn vai trò đăng nhập</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/admin">
            <Button className="w-full h-20 text-lg bg-blue-600 hover:bg-blue-700">Quản trị viên</Button>
          </Link>
          <Link href="/drone">
            <Button className="w-full h-20 text-lg bg-green-600 hover:bg-green-700">Điều khiển viên Drone</Button>
          </Link>
          <Link href="/vendor">
            <Button className="w-full h-20 text-lg bg-yellow-600 hover:bg-yellow-700">Nhà cung cấp</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
