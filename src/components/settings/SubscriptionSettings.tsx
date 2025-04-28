
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { Loader2 } from "lucide-react";

export function SubscriptionSettings() {
  const { subscription, isLoading, startCheckout, openCustomerPortal } = useSubscription();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your subscription</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Current Plan</h3>
            <p className="text-sm text-muted-foreground">
              {subscription?.subscribed ? (
                <>
                  You are currently on the {subscription.subscription_tier} plan.
                  {subscription.subscription_end && (
                    <> Your subscription will renew on {new Date(subscription.subscription_end).toLocaleDateString()}.</>
                  )}
                </>
              ) : (
                "You are currently not subscribed to any plan."
              )}
            </p>
          </div>

          {subscription?.subscribed ? (
            <Button onClick={() => openCustomerPortal.mutate()}>
              {openCustomerPortal.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Manage Subscription
            </Button>
          ) : (
            <Button onClick={() => startCheckout.mutate()}>
              {startCheckout.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Subscribe Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
