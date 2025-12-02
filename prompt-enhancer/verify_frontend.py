from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # Wait for the app to load (checking for title or key element)
        print("Waiting for load...")
        page.wait_for_selector("text=Prompt Enhancer")

        # Verify default provider (Mock)
        print("Checking default provider...")
        page.wait_for_selector("text=Using: MOCK")

        # Type into the prompt area
        print("Typing prompt...")
        page.fill("textarea", "A robot eating pizza")

        # Click Enhance
        print("Clicking enhance...")
        page.click("button:has-text('Enhance Prompt')")

        # Wait for result
        print("Waiting for result...")
        page.wait_for_selector("text=[MOCK ENHANCED]")

        # Hover over a cheat sheet item (e.g., "Wide Shot (WS)")
        print("Hovering cheat sheet...")
        page.hover("text=Wide Shot (WS)")

        # Wait for tooltip to appear
        page.wait_for_timeout(1000) # Give it a moment to render

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="/home/jules/verification/verification.png")

        browser.close()
        print("Done!")

if __name__ == "__main__":
    verify_app()
