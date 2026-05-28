const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({page}) => 
{
 const eventTitle = `Test Event ${Date.now()}`;
 await page.goto("https://eventhub.rahulshettyacademy.com/login");   
 await page.getByPlaceholder("you@email.com").fill("nishbarman4u@gmail.com");
 await page.getByPlaceholder("••••••").fill("Nishu@135");
 await page.locator(".login-submit-btn").click();
 await expect (page.getByText("Browse Events →")).toBeVisible();
await page.getByText("Admin").click();
await page.locator("div.absolute a[href*='events']").click();
await page.locator("[id='event-title-input']").fill(eventTitle);
await page.getByPlaceholder("Describe the event…").fill("test Description");
await page.locator("[id='category']").selectOption("Concert");
await page.locator("[id='city']").fill("Bangalore");
await page.locator("[id='venue']").fill("Ranka Colony");
await page.locator('[id="event-date-&-time"]').fill('2027-06-15T10:30');
//console.log(type);
await page.locator("[id='price-($)']").fill("100");
await page.locator("[id='total-seats']").fill("500");
await page.locator("[type='submit']").click();
 await expect (page.getByText("Event created!")).toBeVisible();
 await page.locator("[id='nav-events']").click();
 await page.locator("[id='event-card']").first().waitFor();
const events= await page.locator("[id='event-card']");
await expect(events.first()).toBeVisible();
const matchedCard = events.filter({ hasText: eventTitle });
await expect(matchedCard).toBeVisible({ timeout: 5000 });
const seatsText = await matchedCard.locator('text=seats').innerText();
const seatsBeforeBooking = parseInt(seatsText.match(/\d+/)[0]);
console.log(seatsBeforeBooking);
await matchedCard.locator("[data-testid='book-now-btn']").click();
await expect(page.getByRole('heading', { name: eventTitle })).toBeVisible();
await page.locator("[name='customerName']").fill("Nishant");
await page.locator("[type='email']").fill("nishbarman4u@gmail.com");
await page.locator("[name='phone']").fill("+917062372272");
await page.locator("[type='submit']").click();
await expect (page.locator(".text-xl")).toHaveText("Booking Confirmed! 🎉");
const bookingRefLocator = page.locator('.booking-ref').first();
await expect(bookingRefLocator).toBeVisible();
const bookingRef = (await bookingRefLocator.innerText()).trim();
console.log(bookingRef);
await page.getByRole("link",{name: 'View My Bookings'}).click();
await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
const bookings= await page.locator("[id='booking-card']");
await expect(bookings.first()).toBeVisible();
//const matchedbookingId = bookings.filter({ hasText: bookingRef });
const matchedbookingId = bookings.filter({has: page.locator('.booking-ref', 
    { hasText: bookingRef })});
await expect(matchedbookingId).toBeVisible({ timeout: 5000 });
await expect(matchedbookingId).toContainText(eventTitle);
 await page.locator("[id='nav-events']").click();
 await page.locator("[id='event-card']").first().waitFor();
const matchedCard1 = events.filter({ hasText: eventTitle });
await expect(matchedCard1).toBeVisible({ timeout: 5000 });
const seatsText1 = await matchedCard1.locator('text=seats').innerText();
const seatsAfterBooking = parseInt(seatsText1.match(/\d+/)[0]);
console.log(seatsAfterBooking);
expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);



});