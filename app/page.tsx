import PasswordStrengthChecker from "@/components/password-strength-checker";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="max-w-full py-8 px-4 md:px-0 md:max-w-2xl lg:max-w-4xl min-h-screen flex flex-col justify-center mx-auto">
      <PasswordStrengthChecker />
      <Separator className="mt-8 mb-6" />
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold">What does it all mean?</h2>
          <p>
            This tool checks various aspects of your password strength.
            Here&apos;s what each category means:
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Complexity Check</h3>
          <p>
            A strong password should be at least 8 characters long and include
            uppercase letters, numbers, and symbols.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Well-Known Password Check</h3>
          <p>
            This check ensures your password isn&apos;t a commonly used one
            that&apos;s easily guessable.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Guessability Rating</h3>
          <p>
            This rating indicates how easily your password can be guessed.
            Longer passwords are generally less guessable.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Brute Force Time Estimate</h3>
          <p>
            This estimate shows how long it might take to crack your password
            using brute force methods. Longer, more complex passwords take
            longer to crack.
          </p>
        </section>
      </div>
    </main>
  );
}
