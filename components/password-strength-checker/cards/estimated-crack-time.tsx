import { StrengthFormResult } from "../password-strength-checker";
import { StrengthCard } from "../strength-card";

export function EstimatedCrackTime({ result }: { result: StrengthFormResult }) {
  return (
    <>
      <StrengthCard icon="Clock" title="Estimated Crack Time">
        <div>
          <span className="font-medium">Offline <span className="text-sm text-muted-foreground">(Slow Hash)</span>: </span>
          {result.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
        </div>
        <div>
          <span className="font-medium">Online <span className="text-sm text-muted-foreground">(Throttled)</span>: </span>
          {result.crackTimesDisplay.onlineThrottling100PerHour}
        </div>
      </StrengthCard>
    </>
  );
}
