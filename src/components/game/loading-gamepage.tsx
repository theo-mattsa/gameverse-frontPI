import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function LoadingGamePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="w-48 h-64 rounded-lg mx-auto md:mx-0">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <Skeleton className="h-8 w-40 mt-4 mb-2 mx-auto md:mx-0" />
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mt-2 mb-6 w-52 max-w-full mx-auto md:mx-0">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="space-y-2 text-sm text-center md:text-left mb-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex flex-wrap gap-1 mt-1 justify-center md:justify-start">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          </div>
          <div className="mt-4">
            <Skeleton className="h-4 w-20 mb-1" />
            <div className="flex flex-wrap gap-1 mt-1 justify-center md:justify-start">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-18 rounded-full" />
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <Card className="mt-8">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-9 w-32" />
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="h-6 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-3 w-3" />
                          <Skeleton className="h-3 w-4" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
