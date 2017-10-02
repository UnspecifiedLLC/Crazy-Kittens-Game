package life.unspecified.kittens.support;

import static org.junit.Assert.assertTrue;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class KittensGameModal extends KittensPage {

	KittensGameModal(RemoteWebDriver driver) {
		super(driver);
	}

	public boolean isValidState() {
		WebElement title = getTitle();
		boolean isGamePage = (title != null
				&& title.getText().equals(life.unspecified.kittens.support.KittensGame.PLAYING_MSG));
		return isGamePage && getModal().isDisplayed();
	}

	public void assertIsValidState() {
		assertTrue("GameModal is visible", getModal().isDisplayed());
	}

	public WebElement getModal() {
		return getDriver().findElement(By.cssSelector("#modal"));
	}

	public WebElement getTitle() {
		return getDriver().findElement(By.cssSelector("#modal > div > div > div.modal-header > h4"));
	}

	public WebElement getCardImage() {
		return getDriver().findElement(By.cssSelector("#modal-card"));
	}

	public String getCardName() {
		String fileName = getCardImage().getAttribute("src");
		Pattern p = Pattern.compile("images/(?<cardname>.*)\\.png");
		Matcher m = p.matcher(fileName);
		m.find();
		return m.group(0);
	}

	public WebElement getModalInstructions() {
		return getDriver().findElement(By.cssSelector("#modal-instructions"));
	}

	public String getCardInstuctions() {
		return getModalInstructions().getText();
	}

	public WebElement getDoButton() {
		return getDriver().findElement(By.cssSelector("#modal-submit"));
	}

	public WebElement getCancelButton() {
		return getDriver().findElement(By.cssSelector("#modal-cancel"));
	}

	public KittensGame close() {
		getDriver().findElement(By.cssSelector("#modal > div > div > div.modal-header > button")).click();
		return asKittensGame();
	}

	public void waitUntilDisplayed() {
		WebDriverWait wait = new WebDriverWait(getDriver(), 3000);
		wait.until((ExpectedConditions.visibilityOf(getModal())));
	}

	public void waitUntilHidden() {
		WebDriverWait wait = new WebDriverWait(getDriver(), 3000);
		wait.until((ExpectedConditions.invisibilityOf(getModal())));
	}

}
