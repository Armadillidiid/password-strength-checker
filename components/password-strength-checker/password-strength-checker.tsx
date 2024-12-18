"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { PasswordInput } from "../ui/password-input";
import { type ZxcvbnResult } from "@zxcvbn-ts/core";
import { zxcvbnAsync } from "@/lib/zxcvbn";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { ComplexityCheckCard } from "./cards/complexity-check";
import { GuessabilityCard } from "./cards/guessability";
import { PatternMatches } from "./cards/pattern-matches";
import { EstimatedCrackTime } from "./cards/estimated-crack-time";
import { checkComplexity, getScoreInfo } from "@/lib/utils";

export type StrengthFormResult = ZxcvbnResult & {
  complexity: ReturnType<typeof checkComplexity>;
};

export default function PasswordStrengthChecker() {
  const [result, setResult] = useState<StrengthFormResult | undefined>(
    undefined,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <ComplexityCheckCard result={result} />
            <GuessabilityCard result={result} />
            <PatternMatches result={result} />
            <EstimatedCrackTime result={result} />
          </div>
        )}
      </div>
    </>
  );
}
