import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">환영합니다</h1>
            <p className="text-muted-foreground">
              소셜 계정으로 간편하게 시작하세요
            </p>
          </div>
          <SocialLoginButtons />
        </div>
      </Card>
    </div>
  );
}
