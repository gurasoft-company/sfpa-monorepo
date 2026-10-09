import { KeyRound, User } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProfileSection } from '@/features/settings/ProfileSection';
import { PasswordSection } from '@/features/settings/PasswordSection';
import { useAuthStore } from '@/store/auth.store';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Paramètres"
        description="Gérez votre profil et votre mot de passe"
      />

      {/* Bandeau récap compte */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 pt-6">
          <div className="flex-1">
            <p className="font-heading text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          {user?.role && (
            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="uppercase">
              {user.role}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Onglets */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" /> Profil
              </TabsTrigger>
              <TabsTrigger value="password" className="gap-2">
                <KeyRound className="h-4 w-4" /> Mot de passe
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <ProfileSection />
            </TabsContent>

            <TabsContent value="password" className="mt-6 max-w-xl">
              <PasswordSection />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}