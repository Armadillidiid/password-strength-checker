"use client";

import { FormEvent, PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { PasswordInput } from "./password-input";
import { zxcvbnAsync, zxcvbnOptions, type ZxcvbnResult } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

zxcvbnOptions.setOptions({
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
});
zxcvbnOptions.addMatcher("pwned", matcherPwnedFactory(fetch, zxcvbnOptions));

type ComplexityResult = {
  passed: boolean;
  text: string;
};

export default function PasswordStrengthChecker() {
  const [result, setResult] = useState<
    (ZxcvbnResult & { complexity: ComplexityResult[] }) | undefined
  >(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getScoreInfo = (score: number) => {
    switch (score) {
      case 0:
        return { text: "Very Weak", color: "text-red-500" };
      case 1:
        return { text: "Weak", color: "text-orange-500" };
      case 2:
        return { text: "Fair", color: "text-yellow-500" };
      case 3:
        return { text: "Strong", color: "text-green-500" };
      case 4:
        return { text: "Very Strong", color: "text-emerald-500" };
      default:
        return { text: "Unknown", color: "text-gray-500" };
    }
  };

  function checkComplexity(password: string) {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 symbol" },
    ];
    return requirements.map((req) => ({
      passed: req.regex.test(password),
      text: req.text,
    })) satisfies ComplexityResult[];
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submittedPassword = formData.get("password");
    if (typeof submittedPassword !== "string") return;
    if (submittedPassword.trim().length === 0) return;

    const result = await zxcvbnAsync(submittedPassword);
    console.dir(result, { depth: null });

    setResult({
      ...result,
      complexity: checkComplexity(submittedPassword),
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">
        Check Your Password Strength
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Enter your password to see how strong it is.
      </p>

      <div className="flex flex-col gap-8">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="flex items-center space-x-4">
              <PasswordInput name="password" placeholder="Enter a password" />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Icons.Loader className="size-4 mr-2 animate-spin" />
                )}

                {isSubmitting ? "Checking..." : "Check"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <Card
              className={`border-l-4 ${getScoreInfo(result.score).color} border-l-current`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Icons.Shield className="size-4" />
                  Strength: {getScoreInfo(result.score).text}
                </CardTitle>
              </CardHeader>
            </Card>

            {(result.feedback.warning ||
              result.feedback.suggestions.length > 0) && (
              <Alert variant="destructive">
                <Icons.AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  {result.feedback.warning && (
                    <p className="font-medium">{result.feedback.warning}</p>
                  )}
                  {result.feedback.suggestions.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {result.feedback.suggestions.map((suggestion) => (
                        <li key={suggestion}>{suggestion}</li> // Use a unique identifier if available
                      ))}
                    </ul>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StrengthCard
              icon="SlidersHorizontal"
              title="Complexity Check"
              status={"neutral"}
            >
              <ul>
                {result.complexity.map(({ passed, text }, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {passed ? (
                      <Icons.Check
                        size={16}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <Icons.X
                        size={16}
                        className="text-muted-foreground/80"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`text-sm ${passed ? "text-emerald-600" : "text-muted-foreground"}`}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </StrengthCard>
            <StrengthCard
              icon="Calculator"
              title="Guessability"
              status={"neutral"}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Number of guesses needed
                    </div>
                    <div className="text-2xl font-bold">{result.guesses}</div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.guessesLog10 < 3
                        ? "bg-red-100 text-red-700"
                        : result.guessesLog10 < 6
                          ? "bg-yellow-100 text-yellow-700"
                          : result.guessesLog10 < 8
                            ? "bg-green-100 text-green-700"
                            : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {result.guessesLog10 < 3
                      ? "Very guessable"
                      : result.guessesLog10 < 6
                        ? "Somewhat guessable"
                        : result.guessesLog10 < 8
                          ? "Safely unguessable"
                          : "Very unguessable"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Guesses (log10)
                  </div>
                  <div className="text-2xl font-bold">
                    {result.guessesLog10.toFixed(1)}
                  </div>
                </div>
              </div>
            </StrengthCard>
            <StrengthCard
              icon="Brain"
              title="Pattern Matches"
              status={"neutral"}
            >
              <div className="space-y-2">
                {result.sequence.map((seq, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icons.Zap className="h-4 w-4 mt-1" />
                    <div>
                      <span className="font-medium capitalize">
                        {seq.pattern}
                      </span>
                      {seq.dictionaryName && (
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          (found in {seq.dictionaryName})
                        </span>
                      )}
                      <br />
                      <span className="text-sm">Token: {seq.token}</span>
                    </div>
                  </div>
                ))}
              </div>
            </StrengthCard>
            <StrengthCard
              icon="Clock"
              title="Estimated Crack Time"
              status={"neutral"}
            >
              <div>
                <span className="font-medium">Offline (Slow Hash): </span>
                {result.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
              </div>
              <div>
                <span className="font-medium">Online (Throttled): </span>
                {result.crackTimesDisplay.onlineThrottling100PerHour}
              </div>
            </StrengthCard>
          </div>
        )}
      </div>
    </>
  );
}

const StrengthCard = ({
  title,
  status,
  children,
  icon,
}: PropsWithChildren<{
  title: string;
  status: "passed" | "failed" | "neutral";
  icon: keyof typeof Icons;
}>) => {
  const Icon = Icons[icon] as unknown as (
    props: Icons.LucideProps,
  ) => React.JSX.Element;

  return (
    <Card
      className={
        status === "passed"
          ? "bg-green-100"
          : status === "failed"
            ? "bg-red-100"
            : ""
      }
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="inline-flex items-center text-lg font-bold">
          <Icon className="size-4 mr-2" />
          {title}
        </CardTitle>
        {status === "passed" ? (
          <Icons.CheckCircle className="h-4 w-4 text-green-600" />
        ) : status === "failed" ? (
          <Icons.XCircle className="h-4 w-4 text-red-600" />
        ) : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
