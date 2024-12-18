import { Icons } from "@/components/ui/icons";
import { StrengthFormResult } from "../password-strength-checker";
import { StrengthCard } from "../strength-card";


export function ComplexityCheckCard({
  result,
}: {
  result: StrengthFormResult;
}) {
  return (
    <>
      <StrengthCard icon="SlidersHorizontal" title="Complexity Check">
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
                className={`${passed ? "text-emerald-600" : "text-muted-foreground"}`}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
      </StrengthCard>
    </>
  );
}
