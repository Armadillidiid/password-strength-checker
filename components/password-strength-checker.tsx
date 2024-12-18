"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { PasswordInput } from "./password-input";

interface StrengthCriteria {
  complexity: boolean;
  wellKnown: boolean;
  guessability: boolean;
  bruteForce: boolean;
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [strengthCriteria, setStrengthCriteria] =
    useState<StrengthCriteria | null>(null);

  const checkPasswordStrength = () => {
    // This is a simplified check. In a real-world scenario, you'd want to use more robust checks.
    const complexity =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);
    const wellKnown = !["password", "123456", "qwerty"].includes(
      password.toLowerCase(),
    );
    const guessability = password.length > 12;
    const bruteForce = password.length >= 14;

    setStrengthCriteria({
      complexity,
      wellKnown,
      guessability,
      bruteForce,
    });
  };

  const StrengthCard = ({
    title,
    passed,
  }: {
    title: string;
    passed: boolean;
  }) => (
    <Card className={passed ? "bg-green-100" : "bg-red-100"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {passed ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <XCircle className="h-4 w-4 text-red-600" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{passed ? "Passed" : "Failed"}</div>
      </CardContent>
    </Card>
  );

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
            <div className="flex space-x-4">
              <PasswordInput
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={checkPasswordStrength}>Check</Button>
            </div>
          </CardContent>
        </Card>

        {strengthCriteria && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StrengthCard
              title="Complexity Check"
              passed={strengthCriteria.complexity}
            />
            <StrengthCard
              title="Well-Known Password Check"
              passed={strengthCriteria.wellKnown}
            />
            <StrengthCard
              title="Guessability Rating"
              passed={strengthCriteria.guessability}
            />
            <StrengthCard
              title="Brute Force Time Estimate"
              passed={strengthCriteria.bruteForce}
            />
          </div>
        )}
      </div>
    </>
  );
}
