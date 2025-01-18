<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Label } from "$lib/components/ui/label";
    import { Alert, AlertDescription } from "$lib/components/ui/alert";
    import { CheckCircle2, XCircle } from "lucide-svelte";

    let loading = false;
    let success = false;
    let error = "";
    let formData = {
        name: "",
        email: "",
        phone: "",
        preferredTime: "",
        message: "",
        honeypot: ""
    };

    const artificialDelay = () => new Promise(resolve => setTimeout(resolve, 750));

    async function handleSubmit() {
        loading = true;
        error = "";
        success = false;

        try {
            await artificialDelay();
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                success = true;
                formData = {
                    name: "",
                    email: "",
                    phone: "",
                    preferredTime: "",
                    message: "",
                    honeypot: ""
                };
            } else if (response.status === 429) {
                error = 'Too many requests. Please try again later.';
            } else {
                error = result.message || 'Failed to send message';
            }
        } catch (e) {
            error = 'Failed to send message';
        } finally {
            loading = false;
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div class="hidden" aria-hidden="true">
        <input
            type="text"
            name="honeypot"
            id="honeypot"
            bind:value={formData.honeypot}
            tabindex="-1"
            autocomplete="off"
        />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input
                id="name"
                type="text"
                bind:value={formData.name}
                required
                placeholder="Your name"
            />
        </div>
        <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
                id="email"
                type="email"
                bind:value={formData.email}
                required
                placeholder="your@email.com"
            />
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-2">
            <Label for="phone">Phone</Label>
            <Input
                id="phone"
                type="tel"
                bind:value={formData.phone}
                required
                placeholder="Your phone number"
            />
        </div>
        <div class="space-y-2">
            <Label for="preferredTime">Preferred Viewing Time</Label>
            <Input
                id="preferredTime"
                type="text"
                bind:value={formData.preferredTime}
                placeholder="e.g., Weekdays after 4 PM"
            />
        </div>
    </div>

    <div class="space-y-2">
        <Label for="message">Message</Label>
        <Textarea
            id="message"
            bind:value={formData.message}
            required
            placeholder="Any questions or specific requests?"
            rows={4}
        />
    </div>

    {#if success}
        <Alert variant="default" class="bg-green-50 border-green-200">
            <CheckCircle2 class="h-4 w-4 text-green-600" />
            <AlertDescription class="text-green-600">
                Message sent successfully! We'll get back to you soon.
            </AlertDescription>
        </Alert>
    {/if}

    {#if error}
        <Alert variant="destructive">
            <XCircle class="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    {/if}

    <Button type="submit" class="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Schedule Viewing'}
    </Button>
</form>

<style>
    .hidden {
        display: none;
    }
</style> 