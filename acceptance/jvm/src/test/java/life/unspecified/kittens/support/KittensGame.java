package life.unspecified.kittens.support;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

public class KittensGame extends KittensPage {

    private static final String PLAYING_MSG = "Crazy Kittens";

	KittensGame(RemoteWebDriver driver) {
        super(driver);
    }

    public boolean isValidState() {
        WebElement title = getTitle();
        return title != null && title.getText().equals(PLAYING_MSG) && getMainGameSection() != null;
    }

    public void assertIsValidState() {
        WebElement title = getTitle();
        assertNotNull("Title element is present", title);
        assertEquals("Title shows welcome message", PLAYING_MSG, title.getText());
        assertNotNull("Main Game Section is present", getMainGameSection());
    }

    public WebElement getMainGameSection() {
        return getDriver().findElementByXPath("/html/body/main");
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
        return asKittensHome();
    }    

}