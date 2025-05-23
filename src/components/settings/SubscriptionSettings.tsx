import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { Loader2, Sparkles, Stars, Atom, Zap, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function SubscriptionSettings() {
  const { subscription, isLoading, startCheckout, openCustomerPortal } = useSubscription();

  const getPlanBadgeColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'pro':
        return 'bg-gradient-to-r from-indigo-500 to-purple-600 border-none text-white';
      case 'enterprise':
        return 'bg-gradient-to-r from-aximo-primary to-purple-600 border-none text-white';
      case 'unlimited':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-aximo-darker border-aximo-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-aximo-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
        <CardHeader className="border-b border-aximo-border">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2 rounded-lg">
              <Stars className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-aximo-text">Quantum Ascension Matrix</CardTitle>
              <CardDescription className="text-aximo-text-secondary">Calibrate your dimensional access privileges</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-aximo-primary to-purple-600 rounded-full opacity-75 blur-sm animate-pulse"></div>
            <div className="relative bg-aximo-darker rounded-full p-2">
              <Loader2 className="h-8 w-8 text-aximo-primary animate-spin" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const planFeatures = {
    free: [
      "Basic Quantum Operations",
      "Limited Dimensional Access",
      "Standard Support Vector"
    ],
    pro: [
      "Advanced Quantum Operations",
      "Extended Dimensional Access",
      "Priority Support Vector",
      "Reality Manipulation Interface"
    ],
    enterprise: [
      "Unlimited Quantum Operations",
      "Full Dimensional Access",
      "Dedicated Support Technicians",
      "Advanced Entanglement Controls",
      "Reality Anchoring Protocols"
    ]
  };

  const currentPlan = subscription?.subscription_tier?.toLowerCase() || 'free';
  const features = currentPlan === 'free' ? planFeatures.free : 
                   currentPlan === 'pro' ? planFeatures.pro : 
                   planFeatures.enterprise;

  return (
    <Card className="bg-aximo-darker border-aximo-border overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-aximo-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <CardHeader className="border-b border-aximo-border">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2 rounded-lg">
            <Stars className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-aximo-text">Quantum Ascension Matrix</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Calibrate your dimensional access privileges</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-aximo-text flex items-center gap-2">
                <Atom className="h-5 w-5 text-aximo-primary" />
                Current Reality Plane
              </h3>
              {subscription?.subscribed && (
                <Badge className={`${getPlanBadgeColor(subscription.subscription_tier)}`}>
                  {subscription.subscription_tier === 'pro' ? 'Quantum Pro' : 
                   subscription.subscription_tier === 'enterprise' ? 'Dimensional Master' : 'Basic'}
                </Badge>
              )}
            </div>
            <p className="text-sm text-aximo-text-secondary">
              {subscription?.subscribed ? (
                <>
                  Your consciousness is currently operating on the {subscription.subscription_tier === 'pro' ? 'Quantum Pro' : 
                   subscription.subscription_tier === 'enterprise' ? 'Dimensional Master' : 'Basic'} plane.
                  {subscription.subscription_end && (
                    <> Dimensional shift scheduled for {new Date(subscription.subscription_end).toLocaleDateString()}.</>
                  )}
                </>
              ) : (
                "Your consciousness is currently operating on the free dimensional plane with limited access."
              )}
            </p>
          </div>

          <div className="bg-aximo-dark rounded-lg border border-aximo-border p-4">
            <h4 className="text-sm font-medium text-aximo-text mb-3">Dimensional Capabilities</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center text-sm text-aximo-text-secondary"
                >
                  <Zap className="h-4 w-4 mr-2 text-aximo-primary" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            {subscription?.subscribed ? (
              <Button 
                onClick={() => openCustomerPortal.mutate()} 
                className="bg-gradient-to-r from-blue-500 to-aximo-primary hover:from-blue-600 hover:to-aximo-primary/90 text-white"
              >
                {openCustomerPortal.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Reconfigure Dimensional Access
              </Button>
            ) : (
              <Button 
                onClick={() => startCheckout.mutate()} 
                className="bg-gradient-to-r from-purple-500 to-aximo-primary hover:from-purple-600 hover:to-aximo-primary/90 text-white"
              >
                {startCheckout.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Ascend to Higher Dimensions
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
