## description: User story for registered user purchase checkout flow

# US-002: Purchase as Registered User

**As a** registered shopper  
**I want to** complete a purchase using my account  
**So that** my order is tracked in my history and I can reuse saved addresses

### Preconditions
- A registered user account exists with valid credentials
- The user is logged in (or login happens as part of the flow)
- At least one product is available in a category

### Acceptance Criteria

1. Registered user can browse and add products to cart (same as guest)
2. Cart displays the correct product name, SKU, unit price, quantity, and line total
3. The "Checkout" button is disabled until the Terms of Service checkbox is accepted
4. On checkout initiation, the user proceeds directly to the billing step (no guest/login gate)
5. The billing form is pre-populated with the user's saved address if one exists
6. Registered user can select a shipping method
7. Registered user can select a payment method
8. The confirm order step shows the full order summary (billing, shipping, products, totals)
9. After confirming, the order confirmation page shows "Your order has been successfully processed!" and an order number
10. The completed order appears in the user's order history at `/order/history`

### Notes
- Pre-login state (saved browser storage) can be used in tests to skip the login UI step
- If no saved address exists, the billing form behaves identically to the guest flow
