package life.unspecified.kittens;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import life.unspecified.kittens.support.KittensGame;
import life.unspecified.kittens.support.KittensGameModal;
import life.unspecified.kittens.support.KittensHome;
import life.unspecified.kittens.support.KittensInstructions;
import life.unspecified.kittens.support.KittensPage;

public class NavigationStepDefinitions {

	private RemoteWebDriver driver = StepSetupHooks.getDriver();
	private KittensPage kittensPage = new KittensHome(driver);

	// @Given("^I am on the home page$")
	@Then("^I am on the home page$")
	public void i_am_on_the_home_page() throws Throwable {
		((KittensHome) kittensPage).assertIsValidState();
	}

	@Given("^no game is started$")
	public void no_game_is_started() throws Throwable {
		assertFalse("A game is not in progress", ((KittensHome) kittensPage).isGameInProgress());
	}

	@When("^I click play$")
	public void i_click_play() throws Throwable {
		kittensPage = ((KittensHome) kittensPage).clickPlayButton();
	}

	@Given("^I load crazy kittens$")
	public void i_load_crazy_kittens() throws Throwable {
		kittensPage = kittensPage.reset();
	}

	@Then("^I see a play button$")
	public void i_see_a_play_button() throws Throwable {
		((KittensHome) kittensPage).assertPlayButtonVisible();
	}

	@When("^I click instructions$")
	public void i_click_instructions() throws Throwable {
		kittensPage = ((KittensHome) kittensPage).clickInstructions();
	}

	@Then("^I am on the instructions page$")
	public void i_am_on_the_instructions_page() throws Throwable {
		((KittensInstructions) kittensPage).assertIsValidState();
	}

	@When("^I click home$")
	public void i_click_home() throws Throwable {
		if (kittensPage instanceof KittensGame) {
			kittensPage = ((KittensGame) kittensPage).clickHome();
		} else if (kittensPage instanceof KittensInstructions) {
			kittensPage = ((KittensInstructions) kittensPage).clickHome();
		} else {
			throw new IllegalStateException("Not on a page with a home button");
		}
	}

	@Then("^I am on the game page$")
	public void i_am_on_the_game_page() throws Throwable {
		((KittensGame) kittensPage).assertIsValidState();
	}

	@Then("^I see a continue button$")
	public void i_see_a_continue_button() throws Throwable {
		((KittensHome) kittensPage).assertContinueButtonVisible();
	}

	@When("^I click continue$")
	public void i_click_continue() throws Throwable {
		kittensPage = ((KittensHome) kittensPage).clickPlayButton();
	}

	@Given("^a game is being played$")
	public void a_game_is_being_played() throws Throwable {
		kittensPage = kittensPage.reset();
		kittensPage = ((KittensHome) kittensPage).clickPlayButton();
	}

	@When("^it is the User's Turn$")
	public void it_is_the_User_s_Turn() throws Throwable {
		kittensPage.asKittensGame().assertIsMyTurn();
	}

	@Then("^the page title displays Turn: Player$")
	public void the_page_title_displays_Turn_User() throws Throwable {
		assertEquals("Title shows it is the player's turn", "Crazy Kittens - Turn: Player",
				kittensPage.getPageTitle().getText());
	}

	@Then("^the content area displays Turn: Player$")
	public void the_content_area_displays_Turn_User() throws Throwable {
		assertEquals("The game display indicates it is the player's turn", "Turn: Player",
				kittensPage.asKittensGame().getGameTurn().getText());
	}

	@When("^it is the Computer's Turn$")
	public void it_is_the_Computer_s_Turn() throws Throwable {
		kittensPage.asKittensGame().assertIsComputerTurn();
	}

	@Then("^the page title displays Turn: Computer$")
	public void the_page_title_displays_Turn_Computer() throws Throwable {
		assertEquals("Title shows it is the computer's turn", "Crazy Kittens - Turn: Computer",
				kittensPage.getPageTitle().getText());
	}

	@Then("^the content area displays Turn: Computer$")
	public void the_content_area_displays_Turn_Computer() throws Throwable {
		assertEquals("The game display indicates it is the computer's turn", "Turn: Computer",
				kittensPage.asKittensGame().getGameTurn().getText());
	}

	@When("^the user finishes their turn$")
	public void the_user_finishes_their_turn() throws Throwable {
		KittensGameModal gameModal = kittensPage.asKittensGame().clickPlayerCard(0);
		gameModal.waitUntilDisplayed();
		gameModal.assertIsValidState();
		gameModal.getDoButton().click();
		gameModal.waitUntilHidden();
		gameModal = kittensPage.asKittensGame().clickPlayerCard(1);
		gameModal.waitUntilDisplayed();
		gameModal.getDoButton().click();
		gameModal.waitUntilHidden();
		kittensPage.asKittensGame().clickComputerCard(0);
		kittensPage.asKittensGame().clickDrawCard();
	}

	@Then("^I have (\\d+) cards$")
	public void i_have_cards(int arg1) throws Throwable {
		WebElement userTable = kittensPage.asKittensGame().getUserTable();
		assertEquals(String.format("I have %d cards", arg1), arg1,
				kittensPage.asKittensGame().getCardElements(userTable).size());
	}

	@Then("^the computer has (\\d+) cards$")
	public void the_computer_has_cards(int arg1) throws Throwable {
		WebElement cardTable = kittensPage.asKittensGame().getComputerTable();
		assertEquals(String.format("Computer has %d cards", arg1), arg1,
				kittensPage.asKittensGame().getCardElements(cardTable).size());
	}

	@When("^I select my first card$")
	public void i_select_my_first_card() throws Throwable {
		kittensPage = kittensPage.asKittensGame().clickPlayerCard(0);
	}

	@Then("^I see a card dialog$")
	public void i_see_a_card_dialog() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilDisplayed();
		kittensPage.asKittensGameModal().assertIsValidState();
	}

	@Then("^the dialog includes play instructions$")
	public void the_dialog_includes_play_instructions() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilDisplayed();
		String cardInstructions = kittensPage.asKittensGameModal().getCardInstructions();
		assertTrue("Expected card instructions", cardInstructions.length() > 0);
	}

	@Then("^the dialog includes a do action button$")
	public void the_dialog_includes_a_do_action_button() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilDisplayed();
		WebElement doButton = kittensPage.asKittensGameModal().getDoButton();
		assertTrue("Do button is clickable", doButton.isDisplayed());
	}

	@Then("^the dialog includes a cancel button$")
	public void the_dialog_includes_a_cancel_button() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilDisplayed();
		WebElement button = kittensPage.asKittensGameModal().getCancelButton();
		assertTrue("Cancel button is clickable", button.isDisplayed());
	}

	@When("^I click the cancel button$")
	public void i_click_the_cancel_button() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilDisplayed();
		kittensPage.asKittensGameModal().getCancelButton().click();
	}

	@Then("^the dialog is closed$")
	public void the_dialog_is_closed() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilHidden();
		assertFalse("Dialog should be closed", kittensPage.asKittensGameModal().getModal().isDisplayed());
	}

	@Then("^I can select any card$")
	public void i_can_select_any_card() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilHidden();
		KittensGame kittensGame = kittensPage.asKittensGame();
		WebElement userTable = kittensGame.getUserTable();
		List<WebElement> cardElements = kittensGame.getCardElements(userTable);
		assertEquals("Game step should be to select a card", "Select a card to play!", kittensGame.getGameStep().getText());
	}

	@Given("^I click the do button$")
	public void i_click_the_do_button() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilDisplayed();
		kittensPage.asKittensGameModal().getDoButton().click();
	}

	@When("^I click cancel move$")
	public void i_click_cancel_move() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilHidden();
		kittensPage.asKittensGame().clickCancelMove();
	}

	private String selectedUserCardName = null;

	@When("^I select my second card$")
	public void i_select_my_second_card() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilHidden();
		KittensGame kittensGame = kittensPage.asKittensGame();
		WebElement cardElement = kittensGame.getCardElements(kittensGame.getUserTable()).get(1);
		selectedUserCardName = kittensGame.getCardName(cardElement);
		kittensPage = kittensPage.asKittensGame().clickPlayerCard(1);
	}

	@When("^I select the opponents first card to steal$")
	public void i_select_the_opponents_first_card_to_steal() throws Throwable {
		kittensPage.asKittensGameModal().waitUntilHidden();
		kittensPage = kittensPage.asKittensGame().clickComputerCard(0);
	}

	@Then("^my second card is in the discard pile$")
	public void my_second_card_is_in_the_discard_pile() throws Throwable {
		KittensGame kittensGame = kittensPage.asKittensGame();
		WebElement discardPileCard = kittensGame.getDiscardPileCard();
		assertEquals("Selected card should be on discard pile", selectedUserCardName,
				kittensGame.getCardName(discardPileCard));
	}

	@Then("^I am prompted to draw a card$")
	public void i_am_prompted_to_draw_a_card() throws Throwable {
		KittensGame kittensGame = kittensPage.asKittensGame();
		assertEquals("Game step should be to draw a card", "Draw a card from the Draw Pile", kittensGame.getGameStep().getText());
	}

	@When("^I draw a card$")
	public void i_draw_a_card() throws Throwable {
		kittensPage.asKittensGame().clickDrawCard();
	}

}