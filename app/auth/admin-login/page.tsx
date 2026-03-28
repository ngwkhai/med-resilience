'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') || 'admin') as 'admin' | 'operator';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const pageTitle = role === 'operator' ? 'Đăng Nhập - Điều Khiển Drone' : 'Đăng Nhập - Tháp Điều Khiển';
  const demoEmail = role === 'operator' ? 'operator@med.vn' : 'admin@med.vn';
  const demoPassword = '1';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('[DEBUG] signInWithPassword result:', { data, signInError });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.user) {
        // Verify user has correct role
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        console.log('[DEBUG] profile fetch result:', { profile, profileError });

        if (profileError || !profile) {
          setError('Không thể tải hồ sơ người dùng');
          await supabase.auth.signOut();
          return;
        }

        if (role === 'admin' && profile.role !== 'admin') {
          setError('Chỉ quản trị viên mới có thể truy cập trang này');
          await supabase.auth.signOut();
          return;
        }

        if (role === 'operator' && profile.role !== 'operator') {
          setError('Chỉ điều khiển viên drone mới có thể truy cập trang này');
          await supabase.auth.signOut();
          return;
        }

        // Redirect to appropriate dashboard
        console.log('[DEBUG] Redirecting to:', role === 'operator' ? '/drone' : '/');
        router.push(role === 'operator' ? '/drone' : '/');
      } else {
        console.log('[DEBUG] No user returned from signInWithPassword');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập');
      console.error('[v0] Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{pageTitle}</CardTitle>
          <CardDescription>Nhập thông tin đăng nhập của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
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

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </Button>

            {/* Demo credentials */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-slate-700">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Email: {demoEmail}</p>
              <p>Password: {demoPassword}</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
