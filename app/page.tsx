import PasswordStrengthChecker from "@/components/password-strength-checker/password-strength-checker";
import { Separator } from "@/components/ui/separator";
import { Social } from "@/components/social";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function Home() {
  return (
    <main className="max-w-full py-16 px-5 md:px-0 md:max-w-2xl lg:max-w-4xl min-h-screen flex flex-col justify-center mx-auto">
      <main>
        <Social />
        <PasswordStrengthChecker />
      </main>
      <Separator className="mt-8 mb-6" />
      <footer className="space-y-6">
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

        <Separator className="mt-8 mb-6" />
        <section>
          <h2 className="text-2xl font-bold">Resources</h2>
          <ul>
            <li>
              <a
                href="https://pages.nist.gov/800-63-4/sp800-63b.html#appA"
                rel="noopener noreferrer"
                target="_blank"
                className={buttonVariants({
                  variant: "link",
                  size: "none",
                  className: "underline ",
                })}
              >
                <Icons.Circle className="max-h-2 max-w-2 fill-current" />
                NIST Password Recommendations
              </a>
            </li>
          </ul>
        </section>
      </footer>
    </main>
  );
}
