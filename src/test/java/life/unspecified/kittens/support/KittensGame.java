package life.unspecified.kittens.support;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.By;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class KittensGame extends KittensPage {

	protected static final String PLAYING_MSG = "Crazy Kittens";

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

	public KittensHome clickHome() {
		getTitleLink().click();
		return asKittensHome();
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
		return getGameTurn().getText().equals("Turn: User");
	}

	public void assertIsMyTurn() {
		assertEquals("It is the player's turn", "Turn: User", getGameTurn().getText());
	}

	public boolean isComputerTurn() {
		return getGameTurn().getText().equals("Turn: Computer");
	}

	public void assertIsComputerTurn() {
		assertEquals("It is the computer's turn", "Turn: Computer", getGameTurn().getText());
	}

	public WebElement getUserTable() {
		return getDriver().findElement(By.cssSelector("#user-table"));
	}

	public WebElement getComputerTable() {
		return getDriver().findElement(By.cssSelector("#computer-table"));
	}

	public List<WebElement> getCardElements(WebElement cardTable) {
		return cardTable.findElements(By.xpath(".//img"));
	}

	public String getCardName(WebElement cardElement) {
		String fileName = cardElement.getAttribute("src");
		Pattern p = Pattern.compile("images/(?<cardname>.*)\\.png");
		Matcher m = p.matcher(fileName);
		m.find();
		return m.group(0);
	}

	public KittensGameModal clickPlayerCard(int cardIndex) {
		getCardElements(getUserTable()).get(cardIndex).click();
		return asKittensGameModal();
	}

	public KittensGameModal clickComputerCard(int cardIndex) {
		getCardElements(getComputerTable()).get(cardIndex).click();
		return new KittensGameModal(getDriver());
	}

	public WebElement getDrawPileElement() {
		return getDriver().findElement(By.cssSelector("#draw-pile"));
	}

	public WebElement getDiscardPileElement() {
		return getDriver().findElement(By.cssSelector("#discard-pile"));
	}

	public void clickDrawCard() {
		getDrawPileElement().click();
	}

	public void clickCancelMove() {
		getCancelMoveButton().click();
	}

	public WebElement getCancelMoveButton() {
		return getDriver().findElement(By.cssSelector("#tradeDiv > button"));
	}

	public WebElement getDiscardPileCard() {
		return getDriver().findElement(By.cssSelector("#discard-pile"));
	}

}