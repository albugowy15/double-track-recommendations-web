import Typography from "@/components/typography";
import React from "react";

interface StatisticCardProps {
  title: string;
  desc: string;
  data: string | number | React.ReactNode;
  icon: React.ReactNode;
}

function StatisticCard(props: StatisticCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-md border p-3">
      <div className="rounded-md border bg-secondary p-3">{props.icon}</div>
      <div>
        <Typography variant="body1">{props.title}</Typography>
        <Typography variant="h3">{props.data}</Typography>
        <Typography variant="label1" className="text-xs font-normal">
          {props.desc}
        </Typography>
      </div>
    </div>
  );
}

export { StatisticCard };
