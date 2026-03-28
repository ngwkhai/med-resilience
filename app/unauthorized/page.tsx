'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <CardTitle className="text-2xl">Không Có Quyền</CardTitle>
          </div>
          <CardDescription>Bạn không có quyền truy cập trang này</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Tài khoản của bạn không có quyền cần thiết để truy cập trang này. Vui lòng liên hệ với quản trị viên.
          </p>
          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Quay Lại Trang Chủ
              </Button>
            </Link>
            <Link href="/auth/admin-login">
              <Button variant="outline" className="w-full">
                Đăng Nhập Lại
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
