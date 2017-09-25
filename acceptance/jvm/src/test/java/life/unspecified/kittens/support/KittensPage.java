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

public abstract class KittensPage {

    public static String WELCOME_MSG = "Welcome to Crazy Kittens";

    private RemoteWebDriver driver;
    private KittensHome kittensHome;
    private KittensInstructions kittensInstructions;
    private KittensGame kittensGame;

    protected KittensPage(RemoteWebDriver driver) {
        this.driver = driver;
    }

    public KittensHome reset() {
        getDriver().navigate().refresh();
        return getKittensHome();
    }   

    public WebElement getElementById(String id) { 
         return getDriver().findElementById(id);
    }

    public WebElement getTitle() {
        return getDriver().findElementById("title");
    }

    public WebElement getTitleLink() {
        return getDriver().findElementById("title-link");
    }

    public WebElement getOriginalGameLink() {
        return getDriver().findElementByXPath("body/footer/div[@class='original']/a");
    }

    public void clickOriginalGameLink() {
        getOriginalGameLink().click();
        throw new RuntimeException("Edge of testing scope. Look into appropriate behavior for non-app pages");
    }

    public abstract boolean isValidState();
    public abstract void assertIsValidState();

    protected RemoteWebDriver getDriver() {
        return driver;
    }

    protected KittensHome getKittensHome() {
        if (this.kittensHome == null) 
            this.kittensHome = new KittensHome(getDriver());
        return this.kittensHome;
    }

    protected KittensInstructions getKittensInstructions() {
        if (this.kittensInstructions == null) 
            this.kittensInstructions = new KittensInstructions(getDriver());
        return this.kittensInstructions;
    }

    protected KittensGame getKittensGame() {
        if (this.kittensGame == null) 
            this.kittensGame = new KittensGame(getDriver());
        return this.kittensGame;
    }

}