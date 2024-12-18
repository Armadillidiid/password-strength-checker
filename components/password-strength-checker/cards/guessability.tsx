import { StrengthFormResult } from "../password-strength-checker";
import { StrengthCard } from "../strength-card";

export function GuessabilityCard({ result }: { result: StrengthFormResult }) {
  return (
    <>
      <StrengthCard icon="Calculator" title="Guessability">
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
    </>
  );
}
