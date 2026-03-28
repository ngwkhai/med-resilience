'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function VendorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  // Thông tin demo cho Vendor
  const demoEmail = 'vendor@med.vn';
  const demoPassword = '1';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Đăng nhập bằng email và password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      await new Promise((r) => setTimeout(r, 150));

      if (signInError) {
        setError('Email hoặc mật khẩu không chính xác');
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log("👉 signed in");
        // 2. Kiểm tra profile để xác nhận đúng role 'vendor'
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        console.log("👉 profile result:", profile, profileError); 

        if (profileError || !profile) {
          setError('Không thể tải hồ sơ người dùng');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        if (profile.role !== 'vendor') {
          setError('Tài khoản này không có quyền truy cập Cổng Nhà Thuốc');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        // 3. Chuyển hướng đến dashboard của vendor
        router.push('/vendor');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi hệ thống khi đăng nhập');
      console.error('[Vendor] Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Cổng Nhà Thuốc</CardTitle>
          <CardDescription>Nhập thông tin tài khoản nhà thuốc của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Nhà Thuốc
              </label>
              <Input
                id="email"
                type="email"
                placeholder="vendor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Mật Khẩu
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
              disabled={loading}
            >
              {loading ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}
            </Button>

            {/* Thông tin Demo */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-slate-700">
              <p className="font-semibold mb-2">Thông tin Demo Vendor:</p>
              <p>Email: <span className="font-mono">{demoEmail}</span></p>
              <p>Password: <span className="font-mono">{demoPassword}</span></p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}