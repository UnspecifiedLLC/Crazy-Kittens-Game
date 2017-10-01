package life.unspecified.kittens.support;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.By;

public abstract class KittensPage {

//	public static String KITTENS_URL = "http://localhost:8080";
//	public static String KITTENS_URL = "http://jvm_selenium-chrome_1:8080";
	public static String KITTENS_URL = "http://kittens:8080";
    public static String WELCOME_MSG = "Welcome to Crazy Kittens";

    private RemoteWebDriver driver;
    private KittensHome kittensHome;
    private KittensInstructions kittensInstructions;
    private KittensGame kittensGame;

    protected KittensPage(RemoteWebDriver driver) {
        this.driver = driver;
    }

    public KittensHome reset() {
        getDriver().navigate().to(KITTENS_URL);
        return asKittensHome();
    }   

    public WebElement getElementById(String id) { 
         return getDriver().findElementById(id);
    }

    public WebElement getPageTitle() {
       return getDriver().findElement(By.cssSelector("head > title"));
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

    public KittensHome asKittensHome() {
        if (this.kittensHome == null) 
            this.kittensHome = new KittensHome(getDriver());
        return this.kittensHome;
    }

    public KittensInstructions asKittensInstructions() {
        if (this.kittensInstructions == null) 
            this.kittensInstructions = new KittensInstructions(getDriver());
        return this.kittensInstructions;
    }

    public KittensGame asKittensGame() {
        if (this.kittensGame == null) 
            this.kittensGame = new KittensGame(getDriver());
        return this.kittensGame;
    }

}