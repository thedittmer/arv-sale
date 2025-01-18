<script lang="ts">
    import { Card } from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import {
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselPrevious,
        CarouselNext,
    } from "$lib/components/ui/carousel";
    import { Badge } from "$lib/components/ui/badge";
    import { Moon, Sun } from "lucide-svelte";
    import ContactForm from "$lib/components/ContactForm.svelte";

    const baseUrl = "https://www.arv.sale";
    const title = "2002 Safari Zanzibar Class A Diesel Motor Home For Sale - $22,000 - Neosho, MO";
    const description = "For sale: 2002 Safari Zanzibar Class A Diesel Motor Home. 38' length, CAT Diesel 7.2-L L-6 330hp engine, 78,848 miles, two slide-outs, self-contained. Located in Neosho, MO. Excellent condition with Allison Automatic transmission. Delivery available.";
    
    // Import all images from the static/imgs directory
    const images = [
        "/imgs/class-a-rv-1.jpg",
        "/imgs/class-a-rv-2.jpg",
        "/imgs/class-a-rv-3.jpg",
        "/imgs/class-a-rv-4.jpg",
        "/imgs/class-a-rv-5.jpg",
        "/imgs/class-a-rv-6.jpg",
        "/imgs/class-a-rv-7.jpg",
        "/imgs/class-a-rv-8.jpg",
        "/imgs/class-a-rv-9.jpg",
        "/imgs/class-a-rv-10.jpg",
        "/imgs/class-a-rv-11.jpg",
        "/imgs/class-a-rv-12.jpg",
        "/imgs/class-a-rv-13.jpg",
        "/imgs/class-a-rv-14.jpg",
        "/imgs/class-a-rv-15.jpg",
        "/imgs/class-a-rv-16.jpg",
        "/imgs/class-a-rv-17.jpg",
        "/imgs/class-a-rv-18.jpg",
        "/imgs/class-a-rv-19.jpg",
        "/imgs/class-a-rv-20.jpg",
    ];

    const specifications = [
        { label: "Year", value: "2002" },
        { label: "Make/Model", value: "Safari Zanzibar" },
        { label: "Price", value: "$22,000" },
        { label: "Type", value: "Motor Home (Class A)" },
        { label: "Length", value: "38'" },
        { label: "Fuel Type", value: "Diesel" },
        { label: "Engine", value: "CAT Diesel 7.2-L L-6 330hp" },
        { label: "Cylinders", value: "6 cylinders" },
        { label: "Drive", value: "RWD" },
        { label: "Self-Contained", value: "Yes" },
        { label: "Slides", value: "2" },
        { label: "Gross Weight", value: "33,000 pounds" },
        { label: "Odometer", value: "78,848 miles" },
        { label: "Paint Color", value: "Brown" },
        { label: "Title Status", value: "Lien" },
        { label: "Transmission", value: "Allison Automatic" },
        { label: "VIN", value: "1RFA5446823017313" },
        { label: "Condition", value: "Good" },
    ];

    const issues = [
        "Some exterior cosmetic issues (see photos)",
        "Bathroom leak present",
        "One attic fan does not open",
    ];

    // Add delivery info
    const additionalFeatures = [
        "Delivery available",
        "Two slide-outs",
        "Self-contained",
        "Large Bathroom",
        "Diesel",
        "Allison Automatic",
        "CAT Diesel 7.2-L L-6 330hp"
    ];

    function toggleTheme() {
        const html = document.documentElement;
        const isDark = html.classList.contains("dark");

        if (isDark) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }
</script>

<svelte:head>
    <!-- Basic SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={baseUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${baseUrl}${images[0]}`} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={baseUrl} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={`${baseUrl}${images[0]}`} />

    <!-- Additional SEO -->
    <meta name="keywords" content="RV for sale, Safari Zanzibar, Class A RV, Diesel Motor Home, Neosho MO, Used RV, 2002 RV, CAT Diesel, Self-contained RV, RV with slides" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="RV Owner" />
    <meta name="geo.region" content="US-MO" />
    <meta name="geo.placename" content="Neosho" />
    <link rel="canonical" href={baseUrl} />

    <!-- Schema.org markup for Google -->
    <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            "name": "2002 Safari Zanzibar Class A Diesel Motor Home",
            "description": description,
            "vehicleIdentificationNumber": "1RFA5446823017313",
            "modelDate": "2002",
            "mileageFromOdometer": {
                "@type": "QuantitativeValue",
                "value": 78848,
                "unitCode": "SMI"
            },
            "vehicleEngine": {
                "@type": "EngineSpecification",
                "engineType": "CAT Diesel 7.2-L L-6",
                "enginePower": {
                    "@type": "QuantitativeValue",
                    "value": 330,
                    "unitCode": "BHP"
                }
            },
            "offers": {
                "@type": "Offer",
                "price": "24000",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
            },
            "image": images.map(img => `${baseUrl}${img}`),
            "brand": {
                "@type": "Brand",
                "name": "Safari"
            },
            "model": "Zanzibar",
            "color": "Brown",
            "vehicleTransmission": "Automatic",
            "fuelType": "Diesel"
        })}
    </script>
</svelte:head>

<!-- Add theme toggle button -->
<Button
    variant="ghost"
    size="icon"
    class="fixed top-4 right-4 z-50"
    onclick={toggleTheme}
>
    <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
</Button>

<div class="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
    <!-- Mobile-optimized title -->
    <h1 class="text-2xl sm:text-4xl font-bold mb-3 sm:mb-6">
        For Sale: 2002 Safari Zanzibar Class A Diesel Motor Home - $22,000
    </h1>
    <p class="text-lg sm:text-xl mb-3 sm:mb-4">Located in Neosho, MO</p>

    <!-- Photo Gallery with mobile-optimized height -->
    <Card class="mb-4 sm:mb-8">
        <Carousel opts={{ loop: true }}>
            <CarouselContent>
                {#each images as image, i}
                    <CarouselItem>
                        <img
                            src={image}
                            alt="RV photo {i + 1}"
                            class="w-full h-[300px] sm:h-[640px] object-cover rounded-lg"
                            loading={i === 0 ? "eager" : "lazy"}
                        />
                    </CarouselItem>
                {/each}
            </CarouselContent>
            <CarouselPrevious class="hidden sm:flex" />
            <CarouselNext class="hidden sm:flex" />
        </Carousel>
    </Card>

    <!-- Main Description -->
    <Card class="p-4 sm:p-6 mb-4 sm:mb-8">
        <p class="text-base sm:text-lg mb-4 sm:mb-6">
            This Class A motor home is ready for your next adventure! The
            powerful CAT diesel engine starts up and runs smoothly, providing
            plenty of power for a comfortable drive. The Allison automatic
            transmission ensures a smooth ride, and the brakes are in great
            condition.
        </p>

        <!-- Specifications Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {#each specifications as spec}
                <div class="flex justify-between border-b py-1.5 sm:py-2">
                    <span class="font-semibold text-sm sm:text-base">{spec.label}:</span>
                    <span class="text-sm sm:text-base">{spec.value}</span>
                </div>
            {/each}
        </div>

        <!-- Features -->
        <div class="mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Features:</h2>
            <div class="flex gap-1.5 sm:gap-2 flex-wrap">
                {#each additionalFeatures as feature}
                    <Badge variant="secondary" class="text-sm">{feature}</Badge>
                {/each}
            </div>
        </div>

        <!-- Known Issues -->
        <div class="mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Condition Notes:</h2>
            <ul class="list-disc list-inside space-y-1.5 sm:space-y-2">
                {#each issues as issue}
                    <li class="text-sm sm:text-base text-muted-foreground">{issue}</li>
                {/each}
            </ul>
        </div>

        <!-- Location and Viewing -->
        <div class="bg-muted p-3 sm:p-4 rounded-lg">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Schedule a Viewing</h2>
            <ContactForm />
        </div>
    </Card>

    <!-- Location Section with Map Link -->
    <Card class="p-4 sm:p-6 mb-4 sm:mb-8">
        <div class="mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Location</h2>
            <p class="mb-2 text-sm sm:text-base">12687 Gateway Dr, Neosho, MO</p>
            <div class="flex gap-2">
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=12687+Gateway+Dr+Neosho+MO" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-primary hover:underline text-sm sm:text-base"
                >
                    View on Google Maps
                </a>
            </div>
        </div>
    </Card>

    <!-- Features Section -->
    <div class="mb-4 sm:mb-6">
        <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Features & Services:</h2>
        <div class="flex gap-1.5 sm:gap-2 flex-wrap">
            {#each additionalFeatures as feature}
                <Badge variant="secondary" class="text-sm">{feature}</Badge>
            {/each}
        </div>
    </div>
</div>
