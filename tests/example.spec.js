// @ts-check
import { test, expect } from '@playwright/test';

//test('E2E: Login, Add Product to Cart, and Place Order', async ({ page }) => {
  // 1. Navigate to the login page
  //await page.goto('https://rahulshettyacademy.com/client');
  // ... rest of your code ...
test('E2E: Login, Add Product to Cart, and Place Order', async ({ page }) => {
  // 1. Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/client');
  await expect(page).toHaveURL(/.*auth\/login/);

  // 2. Login with credentials
  await page.locator('input#userEmail').fill('nishbarman4u6@gmail.com');
  await page.locator('input#userPassword').fill('Nishu@135');
  await page.locator('input#login').click();
  
  // Wait for dashboard to load
  await page.waitForURL(/.*dashboard\/dash/);
  await expect(page).toHaveURL(/.*dashboard\/dash/);

  // 3. Find and click "View" button for ZARA COAT 3
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.card'));
    for (const card of cards) {
      const title = card.querySelector('b')?.innerText.trim();
      if (title === 'ZARA COAT 3') {
        const btn = card.querySelector('button');
        if (btn) btn.click();
      }
    }
  });
  
  // Wait for product detail page to load
  await page.waitForURL(/.*product-details/);

  // 4. Add product to cart
  await page.locator('button:has-text("Add to Cart")').click();
  await page.waitForTimeout(1000);

  // 5. Navigate to cart
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(
      el => el.getAttribute('routerlink') === '/dashboard/cart'
    );
    if (btn) btn.click();
  });
  
  await page.waitForURL(/.*dashboard\/cart/);

  // 6. Verify product is in cart
  const cartContent = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('h3, span, div')).filter(
      el => el.innerText && el.innerText.includes('ZARA COAT 3')
    );
    return items.length > 0;
  });
  
  expect(cartContent).toBe(true);
  console.log('✓ Product verified in cart');

  // 7. Click "Buy Now" to proceed to checkout
  await page.locator('button:has-text("Buy Now")').click();
  await page.waitForURL(/.*dashboard\/order/);

  // 8. Fill payment details
  await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input.input.txt')).filter(
      i => i.className.includes('input txt') && i.value === ''
    );
    if (inputs[0]) inputs[0].value = '12';
    if (inputs[1]) inputs[1].value = '2025';
    if (inputs[2]) inputs[2].value = '123';
    
    inputs.forEach(input => {
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const rows = document.querySelectorAll('.payment__cc .form__cc .row');
    if (rows[2]) {
      const nameInput = rows[2].querySelector('input[type=text]');
      if (nameInput) {
        nameInput.value = 'Nishu Barman';
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        nameInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

  // 9. Set country and place order
  const orderID = await page.evaluate(() => {
    const el = document.querySelector('app-order');
    const comp = el?.__ngContext__?.[30];
    
    if (!comp) return null;
    
    comp.country = 'India';
    comp.confirmOrder();
    
    return new Promise(resolve => {
      setTimeout(() => {
        const url = location.href;
        const idx = url.indexOf('prop=');
        if (idx !== -1) {
          const encoded = url.slice(idx + 5);
          const decoded = decodeURIComponent(encoded);
          const parsed = JSON.parse(decoded);
          resolve(parsed[0]);
        } else {
          resolve(null);
        }
      }, 2000);
    });
  });

  // 10. Verify order placed
  await page.waitForURL(/.*dashboard\/thanks/);
  expect(orderID).toBeTruthy();
  console.log(`✓ Order placed successfully!`);
  console.log(`✓ Order ID: ${orderID}`);
  await expect(page).toHaveURL(/.*dashboard\/thanks/);
});