
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check } from "lucide-react";

interface EyeAnalysisResultsProps {
  analysisResult: {
    condition: string;
    symptoms: string[];
    recommendations: string[];
  };
}

const EyeAnalysisResults = ({ analysisResult }: EyeAnalysisResultsProps) => {
  return (
    <Card className="animate-slide-in-bottom">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Eye Analysis Results</h3>
                <p className="text-sm text-muted-foreground">
                  Based on our AI analysis
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-1">Condition</div>
            <div className="text-xl font-semibold">{analysisResult.condition}</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Common Symptoms</div>
            <ul className="space-y-1.5">
              {analysisResult.symptoms.map((symptom: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-mint-100 dark:bg-mint-900 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-mint-500"></div>
                  </div>
                  <span className="text-sm">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Recommendations</div>
            <ul className="space-y-1.5">
              {analysisResult.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                  </div>
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              This analysis is for informational purposes only and should not replace professional medical advice. Please consult an ophthalmologist for proper diagnosis and treatment.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EyeAnalysisResults;
