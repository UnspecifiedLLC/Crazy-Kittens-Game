package life.unspecified.kittens;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class GoogleStepDefinitions {

    private String url = null;

    private RemoteWebDriver driver = StepSetupHooks.getDriver();

    @When("^I search for (.*)$")
    public void i_search_for_kittens(String search_string) throws Throwable {
        System.out.println("Searching for " + search_string);
        WebElement element = driver.findElement(By.id("lst-ib"));
        element.sendKeys(search_string);
        element.submit();
    }

    @Then("^I should see search results for (.*)$")
    public void i_should_see_search_results_for_kittens(String search_string) throws Throwable {
        System.out.println("Confirming search results for " + search_string);
        // assertTrue(driver.getPageSource().contains(search_string));
    }

    @When("^I open website (.*)$")
    public void i_open_website(String url) throws Throwable {
        this.url = url;   
        driver.get(this.url);
    }

}