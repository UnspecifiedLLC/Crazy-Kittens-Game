package life.unspecified.kittens.support;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

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
        return asKittensHome();
    }       

}