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

public class KittensInstructions extends KittensPage {
    
    KittensInstructions(RemoteWebDriver driver) {
        super(driver);
    }

    public WebElement getSetupSection() { 
        return getElementById("setup");
    }

    public boolean isValidState() {
        WebElement title = getTitle();
        return title != null && title.getText().equals(WELCOME_MSG) && getSetupSection() != null;
    }

    public void assertIsValidState() {
        WebElement title = getTitle();
        assertNotNull("Title element is present", title);
        assertEquals("Title shows welcome message", WELCOME_MSG, title.getText());
        assertNotNull("Setup Section is present", getSetupSection());
    }

    public KittensHome clickHome() {
        getTitleLink().click();
        return getKittensHome();
    }       

}