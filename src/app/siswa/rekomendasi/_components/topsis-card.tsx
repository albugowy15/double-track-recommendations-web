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
  topsis_combinative: RecommendationResult[];
}

export const TopsisCard: React.FC<TopsisCardProps> = ({
  data,
  topsis_ahp,
  topsis_combinative,
}) => {
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
          <TabsTrigger value="ahp" onClick={() => setTab("combinatives")}>
            Combinative
          </TabsTrigger>
        </TabsList>
        <TabsContent value="entropy">
          <Card>
            <CardHeader>
              <CardTitle>Pembobotan Entropy</CardTitle>
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
              <CardTitle>Pembobotan AHP</CardTitle>
              <CardDescription>
                Perhitungan TOPSIS menggunakan pembobotan metode AHP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationCard variant="TOPSIS" data={topsis_ahp} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="combinatives">
          <Card>
            <CardHeader>
              <CardTitle>Pembobotan Combinatives</CardTitle>
              <CardDescription>
                Perhitungan TOPSIS menggunakan pembobotan metode Combinatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationCard variant="TOPSIS" data={topsis_combinative} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
