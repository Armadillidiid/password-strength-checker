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
          <h2 className="text-2xl font-bold">What does this all mean?</h2>
          <p>
            This tool evaluates various aspects of your password strength for
            you to likely get <b>Pwned</b>. Here&apos;s the explanation of each
            category:
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Complexity Rules</h3>
          <p>
            This checks if your password meets the explicit specified
            requirements. In the case of this tool, it&apos;s at least 8
            characters long, an uppercase letter, a lowercase letter, a number,
            and a symbol. While this improves the bottom line for entropy, it
            doesn&apos;t guarantee the password is secure, as demonstrated by
            using a password like &quot;Password123$&quot;.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Guessability</h3>
          <p>
            This evaluates whether your password isn&apos;t one that&apos;s
            randomly guessable. It does so by pattern matching common used
            passwords over commonly used names, popular words from Wikipedia,
            and even keyboard smashes like the good ol&apos;
            &quot;qwertyui&quot;.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Pattern Matches</h3>
          <p>
            This analysis breaks down your password into tokens and identifies
            patterns like dictionary words, names, dates, or repeated
            characters. For example, it can detect if you&apos;re using common
            substitutions like &quot;a&quot; to &quot;@&quot;.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Estimated Crack Time</h3>
          <p>
            This provides an indication of how long it might take to break your
            password using common brute force methods. It&apos;s important to
            note that the security of your password also depends on how and
            where it is stored. Passwords stored in plain text are more
            vulnerable than those that are hashed and salted, which adds an
            additional layer of protection.
          </p>
        </section>

        <Separator className="mt-8 mb-6" />
        <section>
          <h2 className="text-2xl font-bold">Resources</h2>
          <ul className="space-y-2">
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
                NIST Special Publication 800-63B: Passwords
              </a>
            </li>
            <li>
              <a
                href="https://doi.org/10.1145/1866307.1866327"
                rel="noopener noreferrer"
                target="_blank"
                className={buttonVariants({
                  variant: "link",
                  size: "none",
                  className: "underline whitespace-break-spaces",
                })}
              >
                <Icons.Circle className="max-h-2 max-w-2 fill-current" />
                Testing Metrics for Password Creation Policies by Attacking
                Large Sets of Revealed Passwords.
              </a>
            </li>
          </ul>
        </section>
      </footer>
    </main>
  );
}
