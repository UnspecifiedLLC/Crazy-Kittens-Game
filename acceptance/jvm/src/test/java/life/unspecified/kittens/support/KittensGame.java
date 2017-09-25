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

public class KittensGame extends KittensPage {

    KittensGame(RemoteWebDriver driver) {
        super(driver);
    }

    public boolean isValidState() {
        WebElement title = getTitle();
        return title != null && title.getText().equals(WELCOME_MSG) && getMainGameSection() != null;
    }

    public void assertIsValidState() {
        WebElement title = getTitle();
        assertNotNull("Title element is present", title);
        assertEquals("Title shows welcome message", WELCOME_MSG, title.getText());
        assertNotNull("Main Game Section is present", getMainGameSection());
    }

    public WebElement getMainGameSection() {
        return getDriver().findElementByXPath("body/main[@class='main-game']");
    }

    public WebElement getGameTurn() {
        return getElementById("game-turn");
    }

    public WebElement getGameStep() {
        return getElementById("game-step");
    }    

    public WebElement getGameNote() {
        return getElementById("game-note");
    }

    public boolean isMyTurn() {
        return getGameTurn().getText().equals("You");
    }

    public void assertIsMyTurn() {

    }

    public KittensHome clickHome() {
        getTitleLink().click();
        return getKittensHome();
    }    

}