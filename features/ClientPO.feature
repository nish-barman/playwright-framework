Feature: Ecommerce Validation
Scenario: Placing the order
Given a login to Ecommerce application with "username" and "password"
When add "ZARA COAT 3" to cart
Then verify "ZARA COAT 3" is displayed in cart
When enter the valid details and place the order
Then verify order is present in order history
