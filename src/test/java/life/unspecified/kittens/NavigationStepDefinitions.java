package life.unspecified.kittens;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertEquals;

import org.openqa.selenium.remote.RemoteWebDriver;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import life.unspecified.kittens.support.KittensGame;
import life.unspecified.kittens.support.KittensHome;
import life.unspecified.kittens.support.KittensInstructions;
import life.unspecified.kittens.support.KittensPage;

public class NavigationStepDefinitions {

    private RemoteWebDriver driver = StepSetupHooks.getDriver();
    private KittensPage kittensPage = new KittensHome(driver);

    //@Given("^I am on the home page$") 
    @Then("^I am on the home page$")
    public void i_am_on_the_home_page() throws Throwable {
        ((KittensHome)kittensPage).assertIsValidState();
    }

    @Given("^no game is started$")
    public void no_game_is_started() throws Throwable {
        assertFalse("A game is not in progress", ((KittensHome)kittensPage).isGameInProgress());
    }

    @When("^I click play$")
    public void i_click_play() throws Throwable {
        kittensPage = ((KittensHome)kittensPage).clickPlayButton();
    }

    @Given("^I load crazy kittens$")
    public void i_load_crazy_kittens() throws Throwable {
        kittensPage = kittensPage.reset();
    }

    @Then("^I see a play button$")
    public void i_see_a_play_button() throws Throwable {
        ((KittensHome)kittensPage).assertPlayButtonVisible();
    }

    @When("^I click instructions$")
    public void i_click_instructions() throws Throwable {
        kittensPage = ((KittensHome)kittensPage).clickInstructions();
    }

    @Then("^I am on the instructions page$")
    public void i_am_on_the_instructions_page() throws Throwable {
        ((KittensInstructions)kittensPage).assertIsValidState();
    }

    @When("^I click home$")
    public void i_click_home() throws Throwable {
        if (kittensPage instanceof KittensGame) {
            kittensPage = ((KittensGame)kittensPage).clickHome();
        } else if (kittensPage instanceof KittensInstructions) {
            kittensPage = ((KittensInstructions)kittensPage).clickHome();
        } else {
            throw new IllegalStateException("Not on a page with a home button");
        }
    }

    @Then("^I am on the game page$")
    public void i_am_on_the_game_page() throws Throwable {
        ((KittensGame)kittensPage).assertIsValidState();
    }

    @Then("^I see a continue button$")
    public void i_see_a_continue_button() throws Throwable {
        ((KittensHome)kittensPage).assertContinueButtonVisible();
    }

    @When("^I click continue$")
    public void i_click_continue() throws Throwable {
        kittensPage = ((KittensHome)kittensPage).clickPlayButton();
    }

    @Given("^a game is being played$")
     public void a_game_is_being_played() throws Throwable {
        kittensPage = kittensPage.reset();
        kittensPage = ((KittensHome)kittensPage).clickPlayButton();
     }
     
     @When("^it is the User's Turn$")
     public void it_is_the_User_s_Turn() throws Throwable {
        kittensPage.asKittensGame().assertIsMyTurn();
     }
     
     @Then("^the page title displays Turn: Player$")
     public void the_page_title_displays_Turn_User() throws Throwable {
        assertEquals("Title shows it is the player's turn", "Crazy Kittens - Turn: Player", kittensPage.getPageTitle().getText());
     }
     
     @Then("^the content area also displays Turn: Player$")
     public void the_content_area_also_displays_Turn_User() throws Throwable {
        assertEquals("The game display indicates it is the player's turn", "Turn: Player", kittensPage.asKittensGame().getGameTurn().getText());
     }
     
     @When("^it is the Computer's Turn$")
     public void it_is_the_Computer_s_Turn() throws Throwable {
        kittensPage.asKittensGame().assertIsComputerTurn();
     }
     
     @Then("^the page title displays Turn: Computer$")
     public void the_page_title_displays_Turn_Computer() throws Throwable {     
        assertEquals("Title shows it is the computer's turn", "Crazy Kittens - Turn: Computer", kittensPage.getPageTitle().getText());
    }
     
     @Then("^the content area also displays Turn: Computer$")
     public void the_content_area_also_displays_Turn_Computer() throws Throwable {
        assertEquals("The game display indicates it is the computer's turn", "Turn: Computer", kittensPage.asKittensGame().getGameTurn().getText());
     }


    @When("^the user finishes their turn$")
    public void the_user_finishes_their turn() throws Throwable {
        throw new RuntimeException("This needs implemented");
        kittensPage.asKittensGame().assertIsComputerTurn();
    }

}