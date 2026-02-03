import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Truck, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { checkoutSchema, CheckoutFormData } from "@/lib/validations";

type CheckoutStep = "information" | "shipping" | "payment";

const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { id: "information", label: "Information", icon: Package },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
];

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 149,
  },
];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  const freeShippingThreshold = 999;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  const finalShipping = qualifiesForFreeShipping && shippingMethod === "standard" ? 0 : shippingCost;
  const total = subtotal + finalShipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof CheckoutFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const result = checkoutSchema.safeParse(formData);
    
    if (!result.success) {
      const errors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof CheckoutFormData;
        if (!errors[field]) {
          errors[field] = error.message;
        }
      });
      setFormErrors(errors);
      return false;
    }
    
    setFormErrors({});
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === "information") {
      if (!validateForm()) {
        toast({
          title: "Please fix the errors",
          description: "Some fields have invalid or missing information.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      setCurrentStep("payment");
    }
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "Thank you for your order. You'll receive a confirmation email shortly.",
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-24 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some beautiful crystal lamps to your cart before checking out.
          </p>
          <Button asChild>
            <Link to="/collections">Continue Shopping</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container px-4 py-4 sm:py-8 pb-mobile-nav">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 sm:mb-8">
          <BreadcrumbList className="text-xs sm:text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted =
              steps.findIndex((s) => s.id === currentStep) > index;
            
            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  ) : (
                    <step.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mx-1 sm:mx-2" />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Section */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === "information" && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      maxLength={255}
                      className={formErrors.email ? "border-destructive" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-destructive">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        maxLength={50}
                        className={formErrors.firstName ? "border-destructive" : ""}
                      />
                      {formErrors.firstName && (
                        <p className="text-sm text-destructive">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        maxLength={50}
                        className={formErrors.lastName ? "border-destructive" : ""}
                      />
                      {formErrors.lastName && (
                        <p className="text-sm text-destructive">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={15}
                      className={formErrors.phone ? "border-destructive" : ""}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-destructive">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <h3 className="font-semibold text-foreground">Shipping Address</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      maxLength={200}
                      className={formErrors.address ? "border-destructive" : ""}
                    />
                    {formErrors.address && (
                      <p className="text-sm text-destructive">{formErrors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        maxLength={100}
                        className={formErrors.city ? "border-destructive" : ""}
                      />
                      {formErrors.city && (
                        <p className="text-sm text-destructive">{formErrors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        maxLength={100}
                        className={formErrors.state ? "border-destructive" : ""}
                      />
                      {formErrors.state && (
                        <p className="text-sm text-destructive">{formErrors.state}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength={6}
                      className={formErrors.pincode ? "border-destructive" : ""}
                    />
                    {formErrors.pincode && (
                      <p className="text-sm text-destructive">{formErrors.pincode}</p>
                    )}
                  </div>
                </div>
                
                <Button onClick={handleNextStep} size="lg" className="w-full btn-premium">
                  Continue to Shipping
                </Button>
              </div>
            )}
            
            {currentStep === "shipping" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Shipping Method
                </h2>
                
                <RadioGroup
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                  className="space-y-3"
                >
                  {shippingMethods.map((method) => {
                    const isFree = qualifiesForFreeShipping && method.id === "standard";
                    return (
                      <div
                        key={method.id}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                          shippingMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div>
                            <Label htmlFor={method.id} className="cursor-pointer">
                              {method.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {isFree ? (
                            <span className="text-green-600">FREE</span>
                          ) : method.price === 0 ? (
                            "FREE"
                          ) : (
                            formatPrice(method.price)
                          )}
                        </span>
                      </div>
                    );
                  })}
                </RadioGroup>
                
                {!qualifiesForFreeShipping && (
                  <p className="text-sm text-muted-foreground bg-cream/50 p-3 rounded-lg">
                    Add {formatPrice(freeShippingThreshold - subtotal)} more to qualify 
                    for free standard shipping!
                  </p>
                )}
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("information")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1 btn-premium">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}
            
            {currentStep === "payment" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Payment
                </h2>
                
                <div className="bg-cream/50 rounded-xl p-6 text-center">
                  <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    This is a demo checkout. No actual payment will be processed.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    In a real store, payment options would appear here.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("shipping")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} className="flex-1 btn-premium">
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Order Summary */}
          <div className="lg:pl-8 lg:border-l border-border">
            <div className="sticky top-24">
              <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground text-center p-1">
                        {item.product.name.slice(0, 15)}...
                      </span>
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {item.product.name}
                      </p>
                      {item.giftMessage && (
                        <p className="text-xs text-muted-foreground">
                          Gift message included
                        </p>
                      )}
                    </div>
                    <p className="font-medium text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {finalShipping === 0 ? "FREE" : formatPrice(finalShipping)}
                  </span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
