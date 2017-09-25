package life.unspecified.kittens.support;

import cucumber.api.java.en.*;

import org.openqa.selenium.*;
import org.openqa.selenium.remote.*;
import org.openqa.selenium.support.ui.*;

import java.io.*;
import java.net.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

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
		return getKittensInstructions();
	}

	public KittensGame clickPlayButton() {
		getPlayButton().click();
		return getKittensGame();
	}

	public KittensGame clickContinueButton() {
		return clickPlayButton();
	}

}