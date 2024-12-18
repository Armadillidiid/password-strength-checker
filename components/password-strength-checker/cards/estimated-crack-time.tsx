import { StrengthFormResult } from "../password-strength-checker";
import { StrengthCard } from "../strength-card";

export function EstimatedCrackTime({ result }: { result: StrengthFormResult }) {
  return (
    <>
      <StrengthCard icon="Clock" title="Estimated Crack Time">
        <div>
          <span className="font-medium">Offline (Slow Hash): </span>
          {result.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
        </div>
        <div>
          <span className="font-medium">Online (Throttled): </span>
          {result.crackTimesDisplay.onlineThrottling100PerHour}
        </div>
      </StrengthCard>
    </>
  );
}
