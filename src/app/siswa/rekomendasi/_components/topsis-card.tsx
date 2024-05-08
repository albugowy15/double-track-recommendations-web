"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type TopsisWeight } from "@/types/data/common";
import { type RecommendationResult } from "@/types/data/recommendation";
import RecommendationCard from "./recommendation-card";

interface TopsisCardProps {
  data: RecommendationResult[];
  topsis_ahp: RecommendationResult[];
}

export const TopsisCard: React.FC<TopsisCardProps> = ({ data, topsis_ahp }) => {
  const [tab, setTab] = React.useState<TopsisWeight>("entropy");
  return (
    <>
      <Tabs defaultValue={tab} className="mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entropy" onClick={() => setTab("entropy")}>
            Entropy
          </TabsTrigger>
          <TabsTrigger value="ahp" onClick={() => setTab("ahp")}>
            AHP
          </TabsTrigger>
        </TabsList>
        <TabsContent value="entropy">
          <Card>
            <CardHeader>
              <CardTitle>Entropy Weight</CardTitle>
              <CardDescription>
                Perhitungan TOPSIS menggunakan pembobotan metode entropy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationCard variant="TOPSIS" data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ahp">
          <Card>
            <CardHeader>
              <CardTitle>AHP Weight</CardTitle>
              <CardDescription>
                Perhitungan TOPSIS menggunakan pembobotan metode AHP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationCard variant="TOPSIS" data={topsis_ahp} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
