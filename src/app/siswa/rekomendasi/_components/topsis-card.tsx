"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Role, TopsisWeight } from "@/types/data/common";
import { RecommendationResult } from "@/types/data/recommendation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import RecommendationCard from "./recommendation-card";

interface TopsisCardProps {
    data: RecommendationResult[];
    topsis_ahp: RecommendationResult[];
}

  
export const TopsisCard: React.FC<TopsisCardProps> = ({data, topsis_ahp}) => {
    const [tab, setTab] = useState<TopsisWeight>("entropy");
    const [buttonLoading, setButtonLoading] = useState(false);
  
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
              <RecommendationCard
                    variant="TOPSIS"
                    data={data}
                />
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
                <RecommendationCard
                    variant="TOPSIS"
                    data={topsis_ahp}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };
  