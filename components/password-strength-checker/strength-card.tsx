import { PropsWithChildren } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import * as Icons from "lucide-react";

export const StrengthCard = ({
  title,
  children,
  icon,
}: PropsWithChildren<{
  title: string;
  icon: keyof typeof Icons;
}>) => {
  const Icon = Icons[icon] as unknown as (
    props: Icons.LucideProps,
  ) => React.JSX.Element;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="inline-flex items-center text-lg font-bold">
          <Icon className="size-4 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
