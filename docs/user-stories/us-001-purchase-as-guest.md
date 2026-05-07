## description: User story for guest user purchase checkout flow

# US-001: Purchase as Guest User

**As a** guest shopper  
**I want to** complete a purchase without creating an account  
**So that** I can buy products quickly without registration overhead

### Preconditions
- The store is accessible at the base URL
- At least one product is available in a category (e.g. Desktops)

### Acceptance Criteria

1. Guest can browse product categories from the top navigation
2. Guest can add a product to the cart from the product list page
3. Cart displays the correct product name, SKU, unit price, quantity, and line total
4. The "Checkout" button is disabled until the Terms of Service checkbox is accepted
5. On checkout initiation, a guest/login gate page is shown with a "Checkout as Guest" option
6. The billing form requires: First name, Last name, Email, Country, State, City, Address 1, Zip, Phone
7. Submitting the billing form with missing required fields shows inline validation errors
8. Guest can select a shipping method (Ground, Next Day Air, 2nd Day Air)
9. Guest can select a payment method (Credit Card, Check / Money Order)
10. The confirm order step shows a summary with billing address, shipping address, shipping method, payment method, product line items, and order total
11. After confirming, the order confirmation page shows "Your order has been successfully processed!" and an order number
12. A link to order details is shown on the confirmation page

### Notes
- Shipping cost may be $0.00 depending on store configuration — tests should not assert a fixed shipping amount
- The "Ship to the same address" checkbox is pre-ticked; a separate shipping address form only appears when unchecked
- Gift wrapping and discount codes are available in the cart but not required for the happy path
