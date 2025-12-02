from playwright.sync_api import sync_playwright

def verify_click_to_add():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to app...")
        page.goto("http://localhost:3000")

        # Wait for the app to load
        page.wait_for_selector("text=Prompt Enhancer")

        # Type an initial prompt
        initial_text = "A robot eating pizza"
        page.fill("textarea", initial_text)

        # Expand "Shot Sizes" category if needed (it defaults to open, but let's be sure)
        # Clicking the category header usually toggles it.
        # But we know "Shot Sizes" is open by default.

        # Click on "Wide Shot (WS)"
        print("Clicking 'Wide Shot (WS)' to add it...")
        # We need to click the button that contains this text
        page.click("button:has-text('Wide Shot (WS)')")

        # Check text area value
        final_text = page.input_value("textarea")
        print(f"Final textarea value: '{final_text}'")

        # Assertions
        expected_suffix = ", Wide Shot (WS)"
        if initial_text + expected_suffix in final_text:
             print("SUCCESS: Shot was appended correctly.")
        else:
             print("FAILURE: Shot was not appended correctly.")
             raise Exception("Click-to-Add failed")

        # Take verification screenshot
        print("Taking screenshot...")
        page.screenshot(path="/home/jules/verification/click_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_click_to_add()
