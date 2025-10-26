'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Alert } from '@/src/components/ui/alert';
import { Separator } from '@/src/components/ui/separator';
import { Skeleton } from '@/src/components/ui/skeleton';

/**
 * Component Demo Page
 * Temporary page to showcase all shadcn/ui components
 * This will be removed before production
 */
export default function ComponentsDemoPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-4 md:p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Component Library Demo</h1>
        <p className="text-muted-foreground">
          Showcasing all shadcn/ui components installed for Sumba Sunset
        </p>
      </div>

      <Separator />

      {/* Button Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Different button styles and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>

            <Separator />

            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="mobile">Mobile (44px)</Button>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
              <Button size="icon">🔍</Button>
              <Button size="icon-lg">📱</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Components Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Components</h2>
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
            <CardDescription>
              Form inputs with mobile-optimized font sizes (16px minimum to
              prevent iOS zoom)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input
                id="disabled"
                disabled
                placeholder="This input is disabled"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Card Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>
                A basic card with header and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the card content area. Cards are great for grouping
                related information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>This card includes a footer</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Some content goes here...</p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Alert Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alerts</h2>
        <div className="space-y-4">
          <Alert className="flex gap-2">
            <div className="font-medium">Heads up!</div>
            <div className="text-sm">
              This is a default alert. You can use it to show information to
              users.
            </div>
          </Alert>

          <Alert variant="destructive" className="flex gap-2">
            <div className="font-medium">Error!</div>
            <div className="text-sm">
              This is a destructive alert for errors or warnings.
            </div>
          </Alert>
        </div>
      </section>

      {/* Loading States Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading States</h2>
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loaders</CardTitle>
            <CardDescription>Used to show loading placeholders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-[125px] w-full" />
          </CardContent>
        </Card>
      </section>

      {/* Mobile Responsiveness Note */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile-First Design</CardTitle>
          <CardDescription>
            All components are optimized for mobile devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc space-y-1 pl-4 text-sm">
            <li>Touch targets are minimum 44x44px for accessibility</li>
            <li>Input font sizes are 16px on mobile to prevent iOS zoom</li>
            <li>Components are responsive and work on all screen sizes</li>
            <li>
              Use the &quot;mobile&quot; size variant for optimal touch UX
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <Alert className="flex">
        <div className="text-sm">
          <p>
            <strong>Note:</strong> This demo page is for development only and
            will be removed before production deployment.
          </p>
        </div>
      </Alert>
    </div>
  );
}
