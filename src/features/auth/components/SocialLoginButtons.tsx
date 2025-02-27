"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../stores/auth.store";
import { useToast } from "@/hooks/use-toast";

export const SocialLoginButtons = () => {
  const { signIn, isLoading } = useAuthStore();
  const { toast } = useToast();

  const handleSocialLogin = useCallback(
    async (provider: "google" | "github") => {
      try {
        await signIn(provider);
        toast({
          title: "로그인 성공!",
          description: "환영합니다.",
        });
      } catch (error) {
        toast({
          title: "로그인 실패",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [signIn, toast]
  );

  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading}
        className="w-full"
        aria-label="Google로 로그인"
      >
        {/* {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )} */}
        Google로 계속하기
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        disabled={isLoading}
        className="w-full"
        aria-label="GitHub로 로그인"
      >
        {/* {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )} */}
        GitHub로 계속하기
      </Button>
    </div>
  );
};
