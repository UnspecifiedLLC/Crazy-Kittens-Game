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

public class KittensPage {

    private RemoteWebDriver driver;
    
    public KittensPage(RemoteWebDriver driver) {
        this.driver = driver;
    }

    public void reset() {
        this.driver.navigate().refresh();
    }

    public WebElement getTitle() {
        return this.driver.findElementById("title");
    }

    public WebElement getTitleLink() {
        return this.driver.findElementById("title-link");
    }

    public boolean isInstructions() {
        assertThat(getTitle().getText(), is(equalTo("Welcome To Crazy Kittens")));
        assertThat(getTitleLink().getText(), is(equalTo("Home")));
    }

    public boolean isHome() {
        assertThat(getTitle().getText(), is(equalTo("Welcome To Crazy Kittens")));
        assertThat(getTitleLink().getText(), is(equalTo("Instructions")));
    }          

    public boolean isGameStarted() {
        assertThat(getTitle().getText(), is(equalTo("Crazy Kittens")));
        assertThat(getTitleLink().getText(), is(equalTo("Home")));
    }

}