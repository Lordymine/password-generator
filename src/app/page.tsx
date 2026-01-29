import { PasswordGeneratorFeature } from "@/features/password-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <PasswordGeneratorFeature />
    </main>
  );
}