package life.unspecified.kittens.support;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

public class KittensHome extends KittensPage {

	public KittensHome(RemoteWebDriver driver) {
		super(driver);
	}

	public boolean isValidState() {
    	return getTitle().getText().equals(WELCOME_MSG) && hasPlayButton();
    }

	public void assertIsValidState() {
		WebElement title = getTitle();
		assertNotNull("Title element is present", title);
		assertEquals("Title shows welcome message", WELCOME_MSG, title.getText());
		assertNotNull("Play button is present", getPlayButton());
	}

	public void assertPlayButtonVisible() {
		assertNotNull("Play button is on page", getPlayButton());
		assertTrue("Play button is visible", getPlayButton().isDisplayed());
		assertEquals("Play button says play", "Play", getPlayButton().getText());
	}

	public void assertContinueButtonVisible() {
		assertNotNull("Continue button is on page", getPlayButton());
		assertTrue("Continue button is visible", getPlayButton().isDisplayed());
		assertEquals("Continue button says continue", "Continue", getPlayButton().getText());
	}

	public void assertInstructionsLinkVisible() {
		assertNotNull("Title link is on page", getTitleLink());
		assertTrue("Title link is visible", getTitleLink().isDisplayed());
		assertEquals("Title link says instructions", "Instructions", getTitleLink().getText());
	}

	public WebElement getPlayButton() {
		return getElementById("play");
	}

	public boolean hasPlayButton() {
		return getPlayButton() != null;
	}

	public boolean isGameInProgress() {
		return getPlayButton().getText().equals("Continue");
	}

	public KittensInstructions clickInstructions() {
		getTitleLink().click();
		return asKittensInstructions();
	}

	public KittensGame clickPlayButton() {
		getPlayButton().click();
		return asKittensGame();
	}

	public KittensGame clickContinueButton() {
		return clickPlayButton();
	}

}