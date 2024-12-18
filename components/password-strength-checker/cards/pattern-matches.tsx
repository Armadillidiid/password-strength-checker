import { Icons } from "@/components/ui/icons";
import { StrengthFormResult } from "../password-strength-checker";
import { StrengthCard } from "../strength-card";


export function PatternMatches({result}: { result: StrengthFormResult }) {
return (
<>
  <StrengthCard
    icon="Brain"
    title="Pattern Matches"
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
</>
)
}


