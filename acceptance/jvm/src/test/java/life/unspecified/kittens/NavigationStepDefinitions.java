package life.unspecified.kittens;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import cucumber.api.PendingException;

import org.openqa.selenium.*;
import org.openqa.selenium.remote.*;
import org.openqa.selenium.support.ui.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.NoSuchElementException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;
 
import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

public class StepDefinitions {

    private String url = null;
    private static RemoteWebDriver driver = null;

    private static void setup() throws MalformedURLException {
        if (driver == null) {
            try {
                DesiredCapabilities capability = DesiredCapabilities.chrome();
                URL driverLocation = new URL("http://jvm_selenium-chrome_1:4444/wd/hub");
                System.out.println(capability.toString());
                System.out.println(driverLocation.toString());
                
                driver = new RemoteWebDriver(driverLocation, capability);
                driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
                driver.manage().timeouts().pageLoadTimeout(30, TimeUnit.SECONDS);
                driver.manage().window().setSize(new Dimension(1920, 1080));
            } catch (Exception ex) {
                teardown();
            }
        }
    }


    private static void teardown() {
        if (driver != null) {
            try {
                driver.quit();            
            } finally {
                driver = null;
            }
        }
    }

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
        teardown();
    }

    @When("^I open website (.*)$")
    public void i_open_website(String url) throws Throwable {
        setup();
        this.url = url;   
        driver.get(this.url);
    }

}