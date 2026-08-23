# Product Requirements

## Customer

- Browse central catalogue
- Enter delivery address/postcode
- See serviceability
- See live delivery availability
- Build basket
- Checkout securely
- Track order
- Receive notifications
- View receipts

## Franchisee

- View live orders
- Accept/pick/ready/dispatch
- View stock
- Receive stock
- Reorder approved products
- Record actual work sessions
- View sales and basket metrics
- View contribution and costs
- View earned hours
- View actual vs earned-hour efficiency
- Set planning benchmark
- Complete training
- Complete launch tasks
- Manage approved local products

## Franchisor

- Review applications
- Approve territories
- Manage franchise agreements
- Verify payments
- Provision franchises
- Manage core catalogue
- Manage pricing rules
- Manage service areas
- View network performance
- View franchise-level financial metrics
- Manage training
- Manage brand content
- Audit orders, refunds and stock movements

## AI coach

The AI coach should explain verified business data, not invent it.

Examples:

- "Your average basket is down 8% this week."
- "You generated 14.2 earned hours from 11.0 actual work hours."
- "Delivery cost is the largest variable-cost increase this week."
- "Increasing basket value appears more promising than adding labour hours based on current data."

AI recommendations must show the underlying figures and assumptions.

## Accessibility and flexibility

The product should not assume full-time availability. Owners may operate with limited hours and the system should measure actual work rather than opening hours.

## Devices

The same API/backend should support:

- web/PWA
- Android
- iPhone
- Windows

## Security

- Role-based access control
- Tenant isolation
- Server-side order routing
- Server-side payment verification
- Audit logs
- Secure secret management
- No payment card data stored by the application unless explicitly required and compliant
